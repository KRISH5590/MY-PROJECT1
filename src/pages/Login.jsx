import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Phone, Lock, Eye, EyeOff, ArrowRight, User, Building2, Sprout } from 'lucide-react'

export default function Login() {
  const [isRegister, setIsRegister] = useState(false)
  const [role, setRole] = useState('farmer')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ phone: '', password: '', name: '', farmName: '', location: '', businessName: '' })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const endpoint = isRegister
        ? `http://localhost:3001/api/v1/auth/${role}/register`
        : `http://localhost:3001/api/v1/auth/${role}/login`

      const body = isRegister
        ? role === 'farmer'
          ? { phone: form.phone, password: form.password, name: form.name, farmName: form.farmName, location: form.location, state: 'MP' }
          : { phone: form.phone, password: form.password, name: form.name, businessName: form.businessName, type: 'wholesaler', location: form.location, state: 'MP' }
        : { phone: form.phone, password: form.password }

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })

      const data = await res.json()

      if (data.ok) {
        localStorage.setItem('kd_token', data.token)
        localStorage.setItem('kd_user', JSON.stringify(data.user))
        navigate(role === 'farmer' ? '/dashboard' : '/marketplace')
      } else {
        setError(data.msg_hi || data.msg || 'Login failed')
      }
    } catch (err) {
      setError('Server से connection नहीं हो पा रहा। Demo: phone +919876543210 / password farmer123')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', background: 'linear-gradient(135deg, #030712 0%, #0a0f1a 40%, #064e3b 100%)' }}>
      {/* Background glow */}
      <div style={{ position: 'fixed', top: '20%', right: '10%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(16,185,129,0.08), transparent 60%)', borderRadius: '50%', pointerEvents: 'none' }} />
      <div style={{ position: 'fixed', bottom: '10%', left: '5%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(245,158,11,0.05), transparent 60%)', borderRadius: '50%', pointerEvents: 'none' }} />

      <div style={{ width: '100%', maxWidth: '440px', position: 'relative', zIndex: 2 }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
            <div style={{
              width: '3rem', height: '3rem', borderRadius: '0.75rem',
              background: 'linear-gradient(135deg, #10b981, #059669)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.3rem', fontWeight: 900, color: 'white',
              boxShadow: '0 4px 20px rgba(16,185,129,0.3)',
            }}>K</div>
            <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.75rem', fontWeight: 800, color: '#f8fafc' }}>
              Kisan<span style={{ color: '#34d399' }}>Direct</span>
            </span>
          </div>
          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
            {isRegister ? 'नया खाता बनाएं | Create Account' : 'अपने खाते में लॉगिन करें | Login'}
          </p>
        </div>

        {/* Card */}
        <div style={{
          background: 'linear-gradient(145deg, rgba(30,41,59,0.8), rgba(17,24,39,0.9))',
          border: '1px solid rgba(255,255,255,0.06)', borderRadius: '1.25rem',
          backdropFilter: 'blur(20px)', padding: '2rem',
          boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
        }}>
          {/* Role Switcher */}
          <div style={{
            display: 'flex', gap: '0.5rem', marginBottom: '1.5rem',
            background: 'rgba(255,255,255,0.03)', borderRadius: '0.75rem', padding: '0.25rem',
            border: '1px solid rgba(255,255,255,0.06)',
          }}>
            {[
              { key: 'farmer', label: '🌾 किसान', icon: Sprout },
              { key: 'buyer', label: '🏪 खरीदार', icon: Building2 },
            ].map(r => (
              <button key={r.key} onClick={() => setRole(r.key)}
                style={{
                  flex: 1, padding: '0.6rem', borderRadius: '0.6rem', border: 'none',
                  background: role === r.key ? 'linear-gradient(135deg, #10b981, #059669)' : 'transparent',
                  color: role === r.key ? 'white' : '#94a3b8',
                  fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer',
                  transition: 'all 0.2s', fontFamily: "'Inter', sans-serif",
                }}>
                {r.label}
              </button>
            ))}
          </div>

          {/* Error */}
          {error && (
            <div style={{
              padding: '0.75rem 1rem', marginBottom: '1rem',
              background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)',
              borderRadius: '0.6rem', color: '#ef4444', fontSize: '0.85rem',
            }}>
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Name (register only) */}
            {isRegister && (
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 500, display: 'block', marginBottom: '0.3rem' }}>
                  नाम / Name
                </label>
                <div style={{ position: 'relative' }}>
                  <User size={16} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#475569' }} />
                  <input name="name" value={form.name} onChange={handleChange} placeholder="अपना नाम लिखें"
                    required style={{
                      width: '100%', padding: '0.7rem 0.75rem 0.7rem 2.5rem',
                      background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: '0.6rem', color: '#e2e8f0', fontSize: '0.9rem', outline: 'none',
                      fontFamily: "'Inter', sans-serif",
                    }} />
                </div>
              </div>
            )}

            {/* Farm/Business Name (register) */}
            {isRegister && (
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 500, display: 'block', marginBottom: '0.3rem' }}>
                  {role === 'farmer' ? 'खेत/फार्म का नाम' : 'व्यापार का नाम'}
                </label>
                <input name={role === 'farmer' ? 'farmName' : 'businessName'}
                  value={role === 'farmer' ? form.farmName : form.businessName}
                  onChange={handleChange}
                  placeholder={role === 'farmer' ? 'जैसे: पटेल ऑर्गेनिक फार्म' : 'जैसे: अग्रवाल ट्रेडर्स'}
                  style={{
                    width: '100%', padding: '0.7rem 0.75rem',
                    background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '0.6rem', color: '#e2e8f0', fontSize: '0.9rem', outline: 'none',
                    fontFamily: "'Inter', sans-serif",
                  }} />
              </div>
            )}

            {/* Location (register) */}
            {isRegister && (
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 500, display: 'block', marginBottom: '0.3rem' }}>
                  स्थान / Location
                </label>
                <input name="location" value={form.location} onChange={handleChange} placeholder="जैसे: इंदौर, मध्य प्रदेश"
                  style={{
                    width: '100%', padding: '0.7rem 0.75rem',
                    background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '0.6rem', color: '#e2e8f0', fontSize: '0.9rem', outline: 'none',
                    fontFamily: "'Inter', sans-serif",
                  }} />
              </div>
            )}

            {/* Phone */}
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 500, display: 'block', marginBottom: '0.3rem' }}>
                फ़ोन नंबर / Phone
              </label>
              <div style={{ position: 'relative' }}>
                <Phone size={16} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#475569' }} />
                <input name="phone" type="tel" value={form.phone} onChange={handleChange}
                  placeholder="+919876543210" required
                  style={{
                    width: '100%', padding: '0.7rem 0.75rem 0.7rem 2.5rem',
                    background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '0.6rem', color: '#e2e8f0', fontSize: '0.9rem', outline: 'none',
                    fontFamily: "'Inter', sans-serif",
                  }} />
              </div>
            </div>

            {/* Password */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 500, display: 'block', marginBottom: '0.3rem' }}>
                पासवर्ड / Password
              </label>
              <div style={{ position: 'relative' }}>
                <Lock size={16} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#475569' }} />
                <input name="password" type={showPassword ? 'text' : 'password'} value={form.password} onChange={handleChange}
                  placeholder="••••••••" required minLength={6}
                  style={{
                    width: '100%', padding: '0.7rem 2.5rem 0.7rem 2.5rem',
                    background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '0.6rem', color: '#e2e8f0', fontSize: '0.9rem', outline: 'none',
                    fontFamily: "'Inter', sans-serif",
                  }} />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)',
                    background: 'none', border: 'none', cursor: 'pointer', color: '#475569', display: 'flex',
                  }}>
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button type="submit" disabled={loading}
              style={{
                width: '100%', padding: '0.8rem', border: 'none', borderRadius: '0.75rem',
                background: loading ? 'rgba(16,185,129,0.3)' : 'linear-gradient(135deg, #10b981, #059669)',
                color: 'white', fontWeight: 700, fontSize: '1rem', cursor: loading ? 'wait' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                boxShadow: '0 4px 14px rgba(16,185,129,0.3)',
                fontFamily: "'Inter', sans-serif", transition: 'all 0.2s',
              }}>
              {loading ? '⏳ प्रतीक्षा करें...' : isRegister ? 'खाता बनाएं' : 'लॉगिन करें'}
              {!loading && <ArrowRight size={18} />}
            </button>
          </form>

          {/* Toggle login/register */}
          <div style={{ textAlign: 'center', marginTop: '1.25rem' }}>
            <span style={{ color: '#64748b', fontSize: '0.85rem' }}>
              {isRegister ? 'पहले से खाता है?' : 'नया खाता बनाना है?'}{' '}
            </span>
            <button onClick={() => { setIsRegister(!isRegister); setError('') }}
              style={{ background: 'none', border: 'none', color: '#34d399', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}>
              {isRegister ? 'लॉगिन करें' : 'रजिस्टर करें'}
            </button>
          </div>

          {/* Demo credentials */}
          <div style={{
            marginTop: '1.25rem', padding: '0.75rem', borderRadius: '0.6rem',
            background: 'rgba(59,130,246,0.06)', border: '1px solid rgba(59,130,246,0.1)',
            fontSize: '0.75rem', color: '#64748b', textAlign: 'center',
          }}>
            <strong style={{ color: '#3b82f6' }}>Demo Login:</strong><br />
            Farmer: +919876543210 / farmer123<br />
            Buyer: +919800000001 / buyer123
          </div>
        </div>
      </div>
    </main>
  )
}
