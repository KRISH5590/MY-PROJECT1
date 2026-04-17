import { useState } from 'react'
import { ArrowRight, Mic, MapPin, Loader2 } from 'lucide-react'
import ProfitComparison from '../components/ProfitComparison'
import { cropCategories } from '../data/mockData'
import { profit as profitAPI } from '../api/client'

const allCrops = cropCategories.flatMap(c => c.crops)

export default function SellCrops() {
  const [crop, setCrop] = useState('Wheat')
  const [variety, setVariety] = useState('Sharbati')
  const [qty, setQty] = useState(50)
  const [location, setLocation] = useState('Indore, MP')
  const [showResult, setShowResult] = useState(false)
  const [liveResult, setLiveResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [isLive, setIsLive] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setShowResult(true)
    setLiveResult(null)
    try {
      const res = await profitAPI.compare(crop, qty, location)
      if (res.ok) {
        setLiveResult(res.data)
        setIsLive(true)
      }
    } catch (err) {
      console.log('Using frontend calculation (backend offline)')
      setIsLive(false)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main>
      <section className="page-header">
        <div className="container">
          <h1>🌾 <span className="text-gradient">Sell Your Crops</span></h1>
          <p>Enter your crop details and instantly see where you'll earn the most — direct wholesale or through a middleman. We calculate everything.</p>
        </div>
      </section>

      <section className="section" id="sell-form-section">
        <div className="container">
          <div className="sell-form-container">
            {/* Form */}
            <div className="sell-form glass-card">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-xl)' }}>
                <h3 style={{ fontSize: '1.1rem' }}>📝 Crop Details</h3>
                <button className="btn btn-secondary btn-sm" title="Use voice input">
                  <Mic size={16} /> Voice Input
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="form-grid">
                  <div className="input-group">
                    <label htmlFor="crop-select">Crop</label>
                    <select id="crop-select" className="input-field" value={crop} onChange={e => setCrop(e.target.value)}>
                      {allCrops.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>

                  <div className="input-group">
                    <label htmlFor="variety-input">Variety</label>
                    <input id="variety-input" type="text" className="input-field" value={variety} onChange={e => setVariety(e.target.value)} placeholder="e.g. Sharbati, Basmati" />
                  </div>

                  <div className="input-group">
                    <label htmlFor="qty-input">Quantity (quintals)</label>
                    <input id="qty-input" type="number" className="input-field" value={qty} onChange={e => setQty(Number(e.target.value))} min="1" />
                  </div>

                  <div className="input-group">
                    <label htmlFor="location-input">Your Location</label>
                    <div style={{ position: 'relative' }}>
                      <input id="location-input" type="text" className="input-field" value={location} onChange={e => setLocation(e.target.value)} placeholder="City, State" style={{ paddingRight: '2.5rem' }} />
                      <MapPin size={16} style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--surface-400)' }} />
                    </div>
                  </div>
                </div>

                <div className="input-group" style={{ marginTop: 'var(--space-md)' }}>
                  <label htmlFor="quality-select">Quality Grade (if certified)</label>
                  <select id="quality-select" className="input-field">
                    <option value="">Not Certified</option>
                    <option value="A+">A+ (Lab Tested)</option>
                    <option value="A">A (Lab Tested)</option>
                    <option value="B+">B+</option>
                    <option value="B">B</option>
                  </select>
                </div>

                <div className="input-group" style={{ marginTop: 'var(--space-md)' }}>
                  <label htmlFor="notes-input">Additional Notes</label>
                  <textarea id="notes-input" className="input-field" rows={3} placeholder="Any special requirements, preferred buyers, etc." style={{ resize: 'vertical' }} />
                </div>

                <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: 'var(--space-xl)' }}>
                  Compare & Find Best Price <ArrowRight size={20} />
                </button>
              </form>
            </div>

            {/* Result / Info */}
            <div>
              {showResult && loading ? (
                <div className="glass-card" style={{ padding: 'var(--space-3xl)', textAlign: 'center' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-md)' }}>
                    <Loader2 size={40} style={{ color: 'var(--emerald-400)', animation: 'spin 1s linear infinite' }} />
                    <p style={{ color: 'var(--surface-300)' }}>Calculating real-time profit from live mandi data...</p>
                  </div>
                </div>
              ) : showResult && liveResult ? (
                <div className="glass-card" style={{ padding: 'var(--space-xl)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-lg)' }}>
                    <h3 style={{ fontSize: '1.1rem' }}>📊 Profit Comparison</h3>
                    <span className="badge badge-success">🟢 LIVE from Backend</span>
                  </div>

                  {/* Recommendation Banner */}
                  <div style={{
                    padding: '1rem', marginBottom: 'var(--space-lg)',
                    background: liveResult.recommendation.winner === 'direct' ? 'rgba(16,185,129,0.1)' : 'rgba(245,158,11,0.1)',
                    borderRadius: 'var(--radius-lg)',
                    border: `1px solid ${liveResult.recommendation.winner === 'direct' ? 'rgba(16,185,129,0.2)' : 'rgba(245,158,11,0.2)'}`
                  }}>
                    <div style={{ fontWeight: 700, fontSize: '1.1rem', color: liveResult.recommendation.winner === 'direct' ? 'var(--success)' : 'var(--amber-400)', marginBottom: '0.25rem' }}>
                      ✅ {liveResult.recommendation.winner === 'direct' ? 'Direct Sale Wins!' : 'Middleman Route Suggested'}
                    </div>
                    <p style={{ fontSize: '0.9rem', color: 'var(--surface-300)' }}>{liveResult.recommendation.reason}</p>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.5rem', color: 'var(--emerald-400)', marginTop: '0.5rem' }}>
                      Save ₹{liveResult.recommendation.savings.toLocaleString('en-IN')} ({liveResult.recommendation.savingsPercent}%)
                    </div>
                  </div>

                  {/* Side by Side Comparison */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-md)' }}>
                    {/* Direct Sale */}
                    <div style={{ padding: 'var(--space-lg)', background: 'rgba(16,185,129,0.05)', borderRadius: 'var(--radius-lg)', border: liveResult.recommendation.winner === 'direct' ? '2px solid var(--emerald-400)' : '1px solid rgba(255,255,255,0.06)' }}>
                      <h4 style={{ color: 'var(--emerald-400)', marginBottom: 'var(--space-md)', fontSize: '0.95rem' }}>
                        🏪 {liveResult.directSale.label}
                      </h4>
                      {[
                        ['Market Price', `₹${liveResult.directSale.marketPrice.toLocaleString('en-IN')}/qt`],
                        ['Revenue', `₹${liveResult.directSale.revenue.toLocaleString('en-IN')}`],
                        ['Transport', `- ₹${liveResult.directSale.transportCost.toLocaleString('en-IN')}`],
                        ['Storage (5 days)', `- ₹${liveResult.directSale.storageCost.toLocaleString('en-IN')}`],
                        ['Platform Fee (1%)', `- ₹${liveResult.directSale.platformFee.toLocaleString('en-IN')}`],
                      ].map(([k, v]) => (
                        <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.3rem 0', fontSize: '0.85rem', color: 'var(--surface-300)' }}>
                          <span>{k}</span><span style={{ fontWeight: 600 }}>{v}</span>
                        </div>
                      ))}
                      <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', marginTop: '0.5rem', paddingTop: '0.5rem', display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ fontWeight: 700 }}>Net Profit</span>
                        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.2rem', color: 'var(--emerald-400)' }}>
                          ₹{liveResult.directSale.netProfit.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--surface-500)', marginTop: '0.5rem' }}>
                        via {liveResult.directSale.transportPartner} • {liveResult.directSale.distance}
                      </div>
                    </div>

                    {/* Middleman */}
                    <div style={{ padding: 'var(--space-lg)', background: 'rgba(255,255,255,0.02)', borderRadius: 'var(--radius-lg)', border: liveResult.recommendation.winner === 'middleman' ? '2px solid var(--amber-400)' : '1px solid rgba(255,255,255,0.06)' }}>
                      <h4 style={{ color: 'var(--amber-400)', marginBottom: 'var(--space-md)', fontSize: '0.95rem' }}>
                        🤝 {liveResult.middleman.label}
                      </h4>
                      {[
                        ['Price Offered', `₹${liveResult.middleman.pricePerQt.toLocaleString('en-IN')}/qt`],
                        ['Revenue', `₹${liveResult.middleman.revenue.toLocaleString('en-IN')}`],
                        ['Transport', `₹0 (included)`],
                        ['Storage', `₹0 (included)`],
                        [`Commission (${liveResult.middleman.commissionPercent}%)`, `- ₹${liveResult.middleman.commission.toLocaleString('en-IN')}`],
                      ].map(([k, v]) => (
                        <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.3rem 0', fontSize: '0.85rem', color: 'var(--surface-300)' }}>
                          <span>{k}</span><span style={{ fontWeight: 600 }}>{v}</span>
                        </div>
                      ))}
                      <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', marginTop: '0.5rem', paddingTop: '0.5rem', display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ fontWeight: 700 }}>Net Profit</span>
                        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.2rem', color: 'var(--surface-200)' }}>
                          ₹{liveResult.middleman.netProfit.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--surface-500)', marginTop: '0.5rem' }}>
                        No transport/storage needed
                      </div>
                    </div>
                  </div>

                  <div style={{ marginTop: 'var(--space-md)', fontSize: '0.75rem', color: 'var(--surface-500)', textAlign: 'center' }}>
                    Based on: {liveResult.basedOn.mandiMarket} • {liveResult.basedOn.priceDate} • {liveResult.basedOn.source}
                  </div>
                </div>
              ) : showResult ? (
                <ProfitComparison crop={crop} qty={qty} unit="quintals" />
              ) : (
                <div className="glass-card" style={{ padding: 'var(--space-xl)' }}>
                  <h3 style={{ fontSize: '1.1rem', marginBottom: 'var(--space-lg)' }}>💡 How It Works</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
                    {[
                      { num: '1', title: 'Enter Details', desc: 'Fill in your crop type, quantity, and location.' },
                      { num: '2', title: 'AI Calculates', desc: 'We check real-time mandi prices, transport costs, and storage rates.' },
                      { num: '3', title: 'See Both Options', desc: 'Compare selling through middleman vs directly to wholesaler.' },
                      { num: '4', title: 'Choose & Sell', desc: 'Pick the best option. We handle storage and transport booking.' },
                    ].map(step => (
                      <div key={step.num} style={{ display: 'flex', gap: 'var(--space-md)', alignItems: 'flex-start' }}>
                        <div style={{
                          width: '2rem', height: '2rem', borderRadius: '50%', background: 'var(--gradient-primary)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.85rem', color: 'white', flexShrink: 0
                        }}>
                          {step.num}
                        </div>
                        <div>
                          <div style={{ fontWeight: 600, fontSize: '0.95rem', marginBottom: '0.2rem' }}>{step.title}</div>
                          <div style={{ fontSize: '0.85rem', color: 'var(--surface-400)' }}>{step.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="divider" />

                  <div style={{ padding: '1rem', background: 'rgba(16, 185, 129, 0.06)', borderRadius: 'var(--radius-lg)', border: '1px solid rgba(16, 185, 129, 0.1)' }}>
                    <p style={{ fontSize: '0.85rem', color: 'var(--emerald-400)', fontWeight: 600, marginBottom: '0.25rem' }}>
                      🎯 Pro Tip
                    </p>
                    <p style={{ fontSize: '0.8rem', color: 'var(--surface-400)' }}>
                      Certified farmers with lab-tested produce get 8-15% higher prices from direct buyers. 
                      <a href="/quality" style={{ color: 'var(--emerald-400)', marginLeft: '0.25rem' }}>Get Certified →</a>
                    </p>
                  </div>
                </div>
              )}

              {showResult && (
                <div className="glass-card" style={{ padding: 'var(--space-xl)', marginTop: 'var(--space-lg)' }}>
                  <h4 style={{ marginBottom: 'var(--space-md)' }}>🚚 Next Steps</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                    <a href="/cold-storage" className="btn btn-secondary" style={{ justifyContent: 'flex-start' }}>
                      🏪 Book Cold Storage
                    </a>
                    <a href="/transport" className="btn btn-secondary" style={{ justifyContent: 'flex-start' }}>
                      🚛 Book Transport
                    </a>
                    <a href="/quality" className="btn btn-secondary" style={{ justifyContent: 'flex-start' }}>
                      ✅ Get Quality Certificate
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
