import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, RotateCcw, Sparkles, Bot, User } from 'lucide-react'

const CHATBOT_API = 'http://localhost:5000/api/chat'

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'नमस्ते! 🙏 मैं किसान मित्र हूं — आपका AI assistant।\n\nमंडी भाव, फसल बेचना, कोल्ड स्टोरेज, ट्रांसपोर्ट, या कोई भी सवाल पूछें!' }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [suggestions, setSuggestions] = useState([
    { text: 'आज गेहूं का भाव?', emoji: '🌾' },
    { text: 'फसल कैसे बेचूं?', emoji: '💰' },
    { text: 'कोल्ड स्टोरेज बुक करो', emoji: '🏪' },
    { text: 'सरकारी योजनाएं बताओ', emoji: '🏛️' },
  ])
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)
  const sessionId = useRef(`session_${Date.now()}`)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    if (isOpen && inputRef.current) inputRef.current.focus()
  }, [isOpen])

  const sendMessage = async (text) => {
    const msg = text || input.trim()
    if (!msg || loading) return

    setInput('')
    setMessages(prev => [...prev, { role: 'user', text: msg }])
    setLoading(true)

    try {
      const res = await fetch(CHATBOT_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msg, session_id: sessionId.current })
      })
      const data = await res.json()
      if (data.ok) {
        setMessages(prev => [...prev, { role: 'bot', text: data.reply, source: data.source }])
      } else {
        setMessages(prev => [...prev, { role: 'bot', text: '⚠️ कुछ गलत हो गया। कृपया पुनः प्रयास करें।' }])
      }
    } catch (err) {
      setMessages(prev => [...prev, { role: 'bot', text: '🔌 Chatbot server से connection नहीं हो पा रहा। कृपया जांचें कि Python server चालू है (python chatbot/app.py)' }])
    } finally {
      setLoading(false)
    }
  }

  const resetChat = async () => {
    try {
      await fetch('http://localhost:5000/api/chat/reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session_id: sessionId.current })
      })
    } catch {}
    setMessages([{ role: 'bot', text: 'नमस्ते! 🙏 नई बातचीत शुरू हुई। क्या जानना चाहेंगे?' }])
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <>
      {/* Floating Button */}
      <button
        className="chatbot-fab"
        onClick={() => setIsOpen(!isOpen)}
        title="किसान मित्र AI Chatbot"
        style={{
          position: 'fixed', bottom: '1.5rem', right: '1.5rem', zIndex: 9999,
          width: '3.75rem', height: '3.75rem', borderRadius: '50%',
          background: 'linear-gradient(135deg, #10b981, #059669)',
          color: 'white', border: 'none', cursor: 'pointer',
          boxShadow: '0 4px 20px rgba(16,185,129,0.4), 0 0 40px rgba(16,185,129,0.15)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
          transform: isOpen ? 'scale(0.9) rotate(90deg)' : 'scale(1)',
        }}
        onMouseEnter={e => e.target.style.transform = isOpen ? 'scale(0.95) rotate(90deg)' : 'scale(1.1)'}
        onMouseLeave={e => e.target.style.transform = isOpen ? 'scale(0.9) rotate(90deg)' : 'scale(1)'}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Pulse ring animation */}
      {!isOpen && (
        <div style={{
          position: 'fixed', bottom: '1.5rem', right: '1.5rem', zIndex: 9998,
          width: '3.75rem', height: '3.75rem', borderRadius: '50%',
          border: '2px solid rgba(16,185,129,0.4)',
          animation: 'chatbot-pulse 2s ease-out infinite', pointerEvents: 'none',
        }} />
      )}

      {/* Chat Window */}
      {isOpen && (
        <div style={{
          position: 'fixed', bottom: '5.5rem', right: '1.5rem', zIndex: 9999,
          width: '380px', maxWidth: 'calc(100vw - 2rem)', height: '520px', maxHeight: 'calc(100vh - 8rem)',
          borderRadius: '1.25rem', overflow: 'hidden',
          background: 'linear-gradient(145deg, #0f172a, #0a0f1a)',
          border: '1px solid rgba(16,185,129,0.2)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(16,185,129,0.1)',
          display: 'flex', flexDirection: 'column',
          animation: 'chatbot-slideUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}>
          {/* Header */}
          <div style={{
            padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            background: 'linear-gradient(135deg, rgba(16,185,129,0.15), rgba(5,150,105,0.08))',
            borderBottom: '1px solid rgba(16,185,129,0.15)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{
                width: '2.25rem', height: '2.25rem', borderRadius: '50%',
                background: 'linear-gradient(135deg, #10b981, #047857)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Sparkles size={16} color="white" />
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#f8fafc', fontFamily: "'Outfit', sans-serif" }}>
                  किसान मित्र
                </div>
                <div style={{ fontSize: '0.7rem', color: '#34d399', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
                  AI Powered by Google Gemini
                </div>
              </div>
            </div>
            <button onClick={resetChat} title="New chat"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '0.5rem', padding: '0.4rem', cursor: 'pointer', color: '#94a3b8', display: 'flex' }}>
              <RotateCcw size={16} />
            </button>
          </div>

          {/* Messages */}
          <div style={{
            flex: 1, overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem',
            scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.1) transparent',
          }}>
            {messages.map((msg, i) => (
              <div key={i} style={{
                display: 'flex', gap: '0.5rem',
                flexDirection: msg.role === 'user' ? 'row-reverse' : 'row',
                alignItems: 'flex-end',
              }}>
                {/* Avatar */}
                <div style={{
                  width: '1.75rem', height: '1.75rem', borderRadius: '50%', flexShrink: 0,
                  background: msg.role === 'user' ? 'linear-gradient(135deg, #3b82f6, #2563eb)' : 'linear-gradient(135deg, #10b981, #047857)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {msg.role === 'user' ? <User size={12} color="white" /> : <Bot size={12} color="white" />}
                </div>

                {/* Bubble */}
                <div style={{
                  maxWidth: '80%', padding: '0.65rem 0.9rem',
                  borderRadius: msg.role === 'user' ? '1rem 1rem 0.25rem 1rem' : '1rem 1rem 1rem 0.25rem',
                  background: msg.role === 'user'
                    ? 'linear-gradient(135deg, #3b82f6, #2563eb)'
                    : 'rgba(255,255,255,0.06)',
                  border: msg.role === 'user' ? 'none' : '1px solid rgba(255,255,255,0.06)',
                  color: msg.role === 'user' ? 'white' : '#e2e8f0',
                  fontSize: '0.85rem', lineHeight: 1.6, whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                }}>
                  {msg.text}
                  {msg.source === 'gemini' && (
                    <div style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.4)', marginTop: '0.3rem', textAlign: 'right' }}>
                      ✨ Gemini AI
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {loading && (
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-end' }}>
                <div style={{
                  width: '1.75rem', height: '1.75rem', borderRadius: '50%', flexShrink: 0,
                  background: 'linear-gradient(135deg, #10b981, #047857)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Bot size={12} color="white" />
                </div>
                <div style={{
                  padding: '0.75rem 1rem', borderRadius: '1rem 1rem 1rem 0.25rem',
                  background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.06)',
                  display: 'flex', gap: '0.3rem', alignItems: 'center',
                }}>
                  {[0, 1, 2].map(i => (
                    <span key={i} style={{
                      width: 6, height: 6, borderRadius: '50%', background: '#34d399',
                      animation: `chatbot-dot 1.4s ease-in-out ${i * 0.2}s infinite`,
                    }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions */}
          {messages.length <= 2 && (
            <div style={{
              padding: '0 1rem 0.5rem', display: 'flex', gap: '0.4rem', flexWrap: 'wrap',
            }}>
              {suggestions.map((s, i) => (
                <button key={i} onClick={() => sendMessage(s.text)}
                  style={{
                    padding: '0.35rem 0.7rem', borderRadius: '999px', cursor: 'pointer',
                    background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.15)',
                    color: '#34d399', fontSize: '0.75rem', fontWeight: 500,
                    transition: 'all 0.2s', fontFamily: "'Inter', sans-serif",
                  }}
                  onMouseEnter={e => { e.target.style.background = 'rgba(16,185,129,0.15)'; e.target.style.borderColor = 'rgba(16,185,129,0.3)' }}
                  onMouseLeave={e => { e.target.style.background = 'rgba(16,185,129,0.08)'; e.target.style.borderColor = 'rgba(16,185,129,0.15)' }}
                >
                  {s.emoji} {s.text}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div style={{
            padding: '0.75rem 1rem', borderTop: '1px solid rgba(255,255,255,0.06)',
            background: 'rgba(0,0,0,0.2)',
          }}>
            <div style={{
              display: 'flex', gap: '0.5rem', alignItems: 'center',
              background: 'rgba(255,255,255,0.04)', borderRadius: '0.75rem',
              border: '1px solid rgba(255,255,255,0.08)', padding: '0.15rem 0.15rem 0.15rem 0.9rem',
            }}>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="अपना सवाल पूछें..."
                disabled={loading}
                style={{
                  flex: 1, background: 'none', border: 'none', outline: 'none',
                  color: '#e2e8f0', fontSize: '0.9rem', fontFamily: "'Inter', sans-serif",
                }}
              />
              <button
                onClick={() => sendMessage()}
                disabled={loading || !input.trim()}
                style={{
                  width: '2.25rem', height: '2.25rem', borderRadius: '0.6rem',
                  background: input.trim() ? 'linear-gradient(135deg, #10b981, #059669)' : 'rgba(255,255,255,0.05)',
                  border: 'none', cursor: input.trim() ? 'pointer' : 'default',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: input.trim() ? 'white' : '#475569', transition: 'all 0.2s',
                }}
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Animations */}
      <style>{`
        @keyframes chatbot-pulse {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(1.8); opacity: 0; }
        }
        @keyframes chatbot-slideUp {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes chatbot-dot {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-4px); opacity: 1; }
        }
      `}</style>
    </>
  )
}
