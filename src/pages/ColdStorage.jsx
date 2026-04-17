import { useState } from 'react'
import { MapPin, Star, ShieldCheck, Thermometer, Droplets, Clock } from 'lucide-react'
import { coldStorages } from '../data/mockData'

export default function ColdStorage() {
  const [typeFilter, setTypeFilter] = useState('all')
  const [sortBy, setSortBy] = useState('distance')

  const filtered = coldStorages
    .filter(s => typeFilter === 'all' || s.type === typeFilter)
    .sort((a, b) => {
      if (sortBy === 'price') return a.pricePerQt - b.pricePerQt
      if (sortBy === 'rating') return b.rating - a.rating
      return parseFloat(a.distance) - parseFloat(b.distance)
    })

  return (
    <main>
      <section className="page-header">
        <div className="container">
          <h1>🏪 <span className="text-gradient">Cold Storage</span></h1>
          <p>Browse and compare cold storage facilities from private, government, and cooperative partners. Book instantly at transparent rates.</p>
        </div>
      </section>

      <section className="section" id="cold-storage-listings">
        <div className="container">
          {/* Filters */}
          <div className="filter-bar">
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {['all', 'private', 'government', 'cooperative'].map(t => (
                <button
                  key={t}
                  className={`btn btn-sm ${typeFilter === t ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={() => setTypeFilter(t)}
                >
                  {t === 'all' ? '🏢 All' : t === 'private' ? '🏗️ Private' : t === 'government' ? '🏛️ Government' : '🤝 Cooperative'}
                </button>
              ))}
            </div>
            <select className="input-field" value={sortBy} onChange={e => setSortBy(e.target.value)} style={{ minWidth: '160px' }}>
              <option value="distance">Nearest First</option>
              <option value="price">Lowest Price</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>

          <p style={{ color: 'var(--surface-400)', fontSize: '0.85rem', marginBottom: 'var(--space-lg)' }}>
            Showing <strong style={{ color: 'var(--surface-200)' }}>{filtered.length}</strong> facilities near Indore, MP
          </p>

          {/* Listings */}
          <div className="grid grid-2">
            {filtered.map(storage => (
              <div className="service-card glass-card" key={storage.id} id={`storage-${storage.id}`}>
                <div className="service-header">
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                      <h4>{storage.name}</h4>
                      {storage.verified && <ShieldCheck size={16} style={{ color: 'var(--emerald-400)' }} />}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--surface-400)' }}>
                      <MapPin size={13} /> {storage.location} • {storage.distance}
                    </div>
                  </div>
                  <span className={`badge ${storage.type === 'government' ? 'badge-info' : storage.type === 'cooperative' ? 'badge-warning' : 'badge-emerald'}`}>
                    {storage.type}
                  </span>
                </div>

                <div className="service-meta">
                  <div className="meta-item">
                    <Thermometer size={13} /> Temp Controlled
                  </div>
                  <div className="meta-item">
                    <Droplets size={13} /> Humidity Control
                  </div>
                  <div className="meta-item">
                    <Clock size={13} /> 24/7 Access
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--surface-500)' }}>Total Capacity</div>
                    <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{storage.capacity}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--surface-500)' }}>Available</div>
                    <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--emerald-400)' }}>{storage.available}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--surface-500)' }}>Rating</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontWeight: 600, fontSize: '0.9rem' }}>
                      <Star size={13} fill="var(--amber-400)" style={{ color: 'var(--amber-400)' }} /> {storage.rating} ({storage.reviews})
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '0.5rem' }}>
                  {storage.features.map(f => (
                    <span className="tag" key={f}>{f}</span>
                  ))}
                </div>

                <div className="service-footer">
                  <div className="service-price">
                    <span className="price-value">₹{storage.pricePerQt}</span>
                    <span className="price-unit">/quintal/month</span>
                  </div>
                  <button className="btn btn-primary btn-sm">Book Now</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
