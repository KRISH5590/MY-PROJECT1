"""
KisanDirect AI Chatbot — Powered by Google Gemini API
A farmer-friendly chatbot that answers questions about agriculture,
mandi prices, crop advice, weather, schemes, and platform features.
Supports Hindi + English responses.
"""

import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from google import genai

load_dotenv()

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173", "http://localhost:3000", "http://localhost:4173"])

# ---- Initialize Gemini ----
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")

client = None
if GEMINI_API_KEY and GEMINI_API_KEY != "YOUR_GEMINI_API_KEY_HERE":
    client = genai.Client(api_key=GEMINI_API_KEY)
    print("[OK] Google Gemini API connected")
else:
    print("[WARN] No Gemini API key found - chatbot will use fallback responses")
    print("   Get your free key at: https://aistudio.google.com/apikey")
    print("   Then paste it in chatbot/.env")

# ---- System Prompt (Agricultural Expert) ----
SYSTEM_PROMPT = """You are "Kisan Mitra" (किसान मित्र) — the AI assistant for KisanDirect, 
India's farmer-first agricultural marketplace platform.

Your expertise covers:
- Current mandi/market prices for crops across India
- Farming best practices, crop rotation, soil health
- Government schemes (PM-KISAN, PMFBY, Kisan Credit Card, etc.)
- Weather impact on farming
- Cold storage and post-harvest management
- Transport and logistics for farm produce
- Quality testing and certification
- Organic farming techniques
- Pest and disease management
- KisanDirect platform features (profit comparison, cold storage booking, transport, quality certificates)

Rules:
1. ALWAYS be helpful, patient, and use simple language farmers can understand
2. If the user writes in Hindi, respond in Hindi. If in English, respond in English. If mixed, use Hinglish.
3. Keep responses concise (under 150 words unless explaining something complex)
4. Include specific numbers, prices, or data when relevant
5. If you don't know something, say so honestly and suggest where to find the info
6. Always prioritize the farmer's benefit and profit
7. For KisanDirect platform questions, guide them to the right page (Sell Crops, Cold Storage, Transport, Quality, Dashboard)
8. Use emojis sparingly to make responses friendly 🌾
9. For price-related queries, mention that prices change daily and they should check the Price Intelligence page for live data
10. When recommending, always explain WHY — farmers appreciate reasoning"""

# ---- Conversation History (in-memory per session for hackathon) ----
conversations = {}


def get_gemini_response(user_message, session_id="default"):
    """Get response from Google Gemini API with conversation history"""
    
    if not client:
        return get_fallback_response(user_message)
    
    # Maintain conversation history
    if session_id not in conversations:
        conversations[session_id] = []
    
    conversations[session_id].append({
        "role": "user",
        "parts": [{"text": user_message}]
    })
    
    # Keep only last 20 messages to avoid token limits
    if len(conversations[session_id]) > 20:
        conversations[session_id] = conversations[session_id][-20:]
    
    try:
        response = client.models.generate_content(
            model="gemini-2.0-flash",
            contents=[
                {"role": "user", "parts": [{"text": SYSTEM_PROMPT}]},
                {"role": "model", "parts": [{"text": "Namaste! 🙏 Main Kisan Mitra hoon — KisanDirect ka AI assistant. Main aapki farming, mandi prices, government schemes, ya platform se judi kisi bhi sawal mein madad kar sakta hoon. Bataiye, kya jaanna chahte hain?"}]},
                *conversations[session_id]
            ]
        )
        
        bot_reply = response.text
        
        # Save bot response to history
        conversations[session_id].append({
            "role": "model",
            "parts": [{"text": bot_reply}]
        })
        
        return bot_reply
        
    except Exception as e:
        print(f"[ERROR] Gemini API error: {e}")
        return get_fallback_response(user_message)


def get_fallback_response(message):
    """Smart fallback when Gemini API is unavailable"""
    msg = message.lower()
    
    if any(w in msg for w in ["price", "rate", "bhav", "mandi", "कीमत", "भाव", "मंडी"]):
        return "🌾 आज के मंडी भाव:\n• गेहूं (Wheat): ₹2,850/क्विंटल (इंदौर मंडी)\n• सोयाबीन: ₹4,620/क्विंटल (देवास मंडी)\n• चना: ₹5,300/क्विंटल (उज्जैन मंडी)\n\nलाइव भाव के लिए Price Intelligence पेज देखें! 📊"
    
    elif any(w in msg for w in ["sell", "bech", "बेच", "profit", "लाभ", "munafa"]):
        return "💰 अपनी फसल बेचने के लिए:\n1. 'Sell Crops' पेज पर जाएं\n2. फसल, मात्रा, और location डालें\n3. AI तुरंत बताएगा — बिचौलिया vs सीधी बिक्री में कहाँ ज़्यादा profit?\n\nKisanDirect पर किसानों से कोई commission नहीं लिया जाता! 🎉"
    
    elif any(w in msg for w in ["storage", "cold", "store", "स्टोर", "भंडारण", "godown"]):
        return "🏪 कोल्ड स्टोरेज बुक करें:\n• मालवा कोल्ड स्टोरेज (इंदौर) — ₹45/क्विंटल/माह\n• MP State Warehousing (देवास) — ₹30/क्विंटल/माह\n• Central Warehousing (भोपाल) — ₹28/क्विंटल/माह\n\nCold Storage पेज पर तुलना करें और बुक करें! 📦"
    
    elif any(w in msg for w in ["transport", "truck", "ट्रक", "ट्रांसपोर्ट", "vehicle", "गाड़ी"]):
        return "🚛 ट्रांसपोर्ट पार्टनर्स:\n• Porter — ₹18/km (2-4 घंटे)\n• Vahak — ₹12/km (4-6 घंटे)\n• Rivigo — ₹22/km (1-3 घंटे, refrigerated)\n\nTransport पेज पर route calculate करें और बुक करें!"
    
    elif any(w in msg for w in ["scheme", "yojana", "योजना", "sarkari", "सरकारी", "pm kisan", "subsidy"]):
        return "🏛️ प्रमुख सरकारी योजनाएं:\n• PM-KISAN: ₹6,000/साल सीधे बैंक में\n• PMFBY: फसल बीमा योजना\n• Kisan Credit Card: कम ब्याज पर लोन\n• Soil Health Card: मिट्टी जांच\n• eNAM: ऑनलाइन मंडी\n\nअपने नज़दीकी कृषि केंद्र से संपर्क करें!"
    
    elif any(w in msg for w in ["quality", "lab", "test", "certificate", "प्रमाणपत्र", "गुणवत्ता"]):
        return "✅ Quality Certificate पाने के फायदे:\n• A+ ग्रेड = 15% ज़्यादा कीमत\n• सीधे retail chains को बेच सकते हैं\n• QR कोड से buyer verify कर सकता है\n\nQuality पेज पर Lab Test बुक करें! 🔬"
    
    elif any(w in msg for w in ["hello", "hi", "namaste", "नमस्ते", "hlo", "hey"]):
        return "नमस्ते! 🙏 मैं किसान मित्र हूं — KisanDirect का AI assistant।\n\nमैं आपकी इन विषयों में मदद कर सकता हूं:\n🌾 मंडी भाव\n💰 फसल बेचना\n🏪 कोल्ड स्टोरेज\n🚛 ट्रांसपोर्ट\n✅ गुणवत्ता प्रमाणपत्र\n🏛️ सरकारी योजनाएं\n\nक्या जानना चाहेंगे?"
    
    elif any(w in msg for w in ["weather", "मौसम", "barish", "बारिश", "rain"]):
        return "🌤️ मौसम की जानकारी:\nKisanDirect जल्द ही live weather data से जुड़ेगा।\n\nअभी IMD (India Meteorological Department) की website या Meghdoot app से अपने क्षेत्र का मौसम देखें।\n\nTip: बुवाई से पहले 7-दिन का forecast ज़रूर चेक करें!"
    
    elif any(w in msg for w in ["crop", "fasal", "फसल", "kya ugaye", "sow", "बोना"]):
        return "🌱 फसल सलाह (अप्रैल-मई):\n• खरीफ की तैयारी: सोयाबीन, मक्का, अरहर\n• सब्जी: भिंडी, लौकी, करेला\n• मिट्टी जांच करवाएं (Soil Health Card)\n\nQuality पेज पर Lab Test बुक करें। अच्छी गुणवत्ता = अच्छी कीमत! 💯"
    
    else:
        return "🤔 मैं आपकी बात समझ रहा हूं। कृपया इनमें से किसी विषय पर पूछें:\n\n🌾 मंडी भाव (Mandi Prices)\n💰 फसल बेचना (Sell Crops)\n🏪 कोल्ड स्टोरेज (Cold Storage)\n🚛 ट्रांसपोर्ट (Transport)\n✅ गुणवत्ता (Quality)\n🏛️ सरकारी योजनाएं (Govt Schemes)\n🌤️ मौसम (Weather)\n\nया अपना सवाल हिंदी/English में पूछें!"


# ---- API Routes ----

@app.route("/api/chat", methods=["POST"])
def chat():
    """Main chat endpoint — receives message, returns AI response"""
    data = request.get_json()
    
    if not data or "message" not in data:
        return jsonify({"ok": False, "error": "Message is required"}), 400
    
    user_message = data["message"].strip()
    session_id = data.get("session_id", "default")
    language = data.get("language", "hi")  # hi or en
    
    if not user_message:
        return jsonify({"ok": False, "error": "Empty message"}), 400
    
    # Get AI response
    reply = get_gemini_response(user_message, session_id)
    
    return jsonify({
        "ok": True,
        "reply": reply,
        "source": "gemini" if client else "fallback"
    })


@app.route("/api/chat/reset", methods=["POST"])
def reset_chat():
    """Reset conversation history for a session"""
    data = request.get_json() or {}
    session_id = data.get("session_id", "default")
    
    if session_id in conversations:
        del conversations[session_id]
    
    return jsonify({"ok": True, "msg": "Chat history cleared"})


@app.route("/api/chat/health", methods=["GET"])
def health():
    """Health check"""
    return jsonify({
        "ok": True,
        "status": "running",
        "gemini_connected": client is not None,
        "msg": "Kisan Mitra Chatbot is online 🌾"
    })


@app.route("/api/chat/suggestions", methods=["GET"])
def suggestions():
    """Quick suggestion chips for the chatbot UI"""
    return jsonify({
        "ok": True,
        "data": [
            {"text": "आज गेहूं का भाव?", "emoji": "🌾"},
            {"text": "फसल कैसे बेचूं?", "emoji": "💰"},
            {"text": "कोल्ड स्टोरेज बुक करो", "emoji": "🏪"},
            {"text": "सरकारी योजनाएं बताओ", "emoji": "🏛️"},
            {"text": "Quality certificate कैसे मिलेगा?", "emoji": "✅"},
            {"text": "ट्रांसपोर्ट बुक करो", "emoji": "🚛"},
        ]
    })


if __name__ == "__main__":
    port = int(os.getenv("PORT", 5000))
    print(f"\n[BOT] Kisan Mitra Chatbot running on http://localhost:{port}")
    print(f"[API] Gemini API: {'Connected' if client else 'Not configured (using fallback)'}")
    print(f"[CHAT] Chat endpoint: http://localhost:{port}/api/chat\n")
    app.run(host="0.0.0.0", port=port, debug=True)
