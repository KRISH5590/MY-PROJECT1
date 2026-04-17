import { useState } from 'react'
import { MapPin, Star, Shield, Clock, Navigation, Truck as TruckIcon } from 'lucide-react'
import { transportPartners } from '../data/mockData'

export default function Transport() {
  const [from, setFrom] = useState('Indore, MP')
  const [to, setTo] = useState('')
  const [distance, setDistance] = useState(0)
  const [calculated, setCalculated] = useState(false)

  const handleCalc = (e) => {
    e.preventDefault()
    // Mock distance calculation
    const mockDistances = {
      'bhopal': 195, 'delhi': 820, 'mumbai': 590, 'ujjain': 55,
      'dewas': 38, 'ratlam': 135, 'ahmedabad': 400, 'jaipur': 600
    }
    const key = to.toLowerCase().split(',')[0].trim()
    const d = mockDistances[key] || Math.floor(Math.random() * 500 + 50)
    setDistance(d)
    setCalculated(true)
  }

  return (
    <main>
      <section className="page-header">
        <div className="container">
          <h1>🚛 <span className="text-gradient">Transport</span></h1>
          <p>Compare transport options from multiple partners. Get the best rates, live tracking, and route optimization for your produce.</p>
        </div>
      </section>

      <section className="section" id="transport-section">
        <div className="container">
          {/* Route Calculator */}
          <div className="glass-card" style={{ padding: 'var(--space-xl)', marginBottom: 'var(--space-2xl)' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: 'var(--space-lg)' }}>📍 Calculate Route & Compare Prices</h3>
            <form onSubmit={handleCalc} style={{ display: 'flex', gap: 'var(--space-md)', flexWrap: 'wrap', alignItems: 'flex-end' }}>
              <div className="input-group" style={{ flex: 1, minWidth: '200px' }}>
                <label htmlFor="from-input">From</label>
                <div style={{ position: 'relative' }}>
                  <input id="from-input" type="text" className="input-field" value={from} onChange={e => setFrom(e.target.value)} placeholder="Your location" />
                  <MapPin size={16} style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--surface-400)' }} />
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', color: 'var(--surface-400)', paddingBottom: '0.5rem' }}>
                <Navigation size={20} />
              </div>
              <div className="input-group" style={{ flex: 1, minWidth: '200px' }}>
                <label htmlFor="to-input">To (Market / Buyer Location)</label>
                <div style={{ position: 'relative' }}>
                  <input id="to-input" type="text" className="input-field" value={to} onChange={e => setTo(e.target.value)} placeholder="e.g. Bhopal, Delhi, Mumbai" />
                  <MapPin size={16} style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--surface-400)' }} />
                </div>
              </div>
              <button type="submit" className="btn btn-primary" style={{ height: '45px' }}>
                Calculate
              </button>
            </form>
            {calculated && (
              <div style={{ marginTop: 'var(--space-lg)', padding: '1rem', background: 'rgba(16,185,129,0.06)', borderRadius: 'var(--radius-lg)', border: '1px solid rgba(16,185,129,0.1)', display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--surface-400)' }}>Estimated Distance</span>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.5rem', color: 'var(--emerald-400)' }}>{distance} km</div>
                </div>
                <div style={{ width: '1px', height: '2.5rem', background: 'rgba(255,255,255,0.1)' }} />
                <div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--surface-400)' }}>Route</span>
                  <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{from} → {to}</div>
                </div>
                <div style={{ width: '1px', height: '2.5rem', background: 'rgba(255,255,255,0.1)' }} />
                <div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--surface-400)' }}>AI Suggestion</span>
                  <div style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--amber-400)' }}>
                    {distance > 200 ? '⚡ Rivigo recommended for long distance' : '🚛 Porter best for short routes'}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Transport Partners */}
          <h3 style={{ marginBottom: 'var(--space-lg)' }}>Available Transport Partners</h3>
          <div className="grid grid-2">
            {transportPartners.map(tp => {
              const estCost = calculated ? Math.max(tp.minPrice, tp.pricePerKm * distance) : tp.minPrice
              return (
                <div className="service-card glass-card" key={tp.id} id={`transport-${tp.id}`}>
                  <div className="service-header">
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem' }}>
                        <span style={{ fontSize: '1.75rem' }}>{tp.logo}</span>
                        <div>
                          <h4>{tp.name}</h4>
                          <span style={{ fontSize: '0.8rem', color: 'var(--surface-400)' }}>{tp.type}</span>
                        </div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <Star size={14} fill="var(--amber-400)" style={{ color: 'var(--amber-400)' }} />
                      <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{tp.rating}</span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--surface-400)' }}>({tp.reviews})</span>
                    </div>
                  </div>

                  <div className="service-meta">
                    <div className="meta-item"><Clock size={13} /> ETA: {tp.eta}</div>
                    {tp.tracking && <div className="meta-item"><Navigation size={13} /> Live Tracking</div>}
                    {tp.insurance && <div className="meta-item"><Shield size={13} /> Insured</div>}
                  </div>

                  <div style={{ marginBottom: '0.75rem' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--surface-500)', marginBottom: '0.35rem' }}>Vehicles Available</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                      {tp.vehicles.map(v => <span className="tag" key={v}><TruckIcon size={10} /> {v}</span>)}
                    </div>
                  </div>

                  <div className="service-footer">
                    <div className="service-price">
                      <span className="price-value">₹{calculated ? estCost.toLocaleString('en-IN') : tp.pricePerKm}</span>
                      <span className="price-unit">{calculated ? ' estimated' : '/km'}</span>
                    </div>
                    <button className="btn btn-primary btn-sm">Book Now</button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </main>
  )
}
