import { useState } from 'react'
import { Search, Filter, MapPin, ShieldCheck, Star, ArrowUpRight } from 'lucide-react'
import { marketplaceListings, cropCategories } from '../data/mockData'

export default function Marketplace() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [sortBy, setSortBy] = useState('recent')

  const filtered = marketplaceListings
    .filter(l => {
      if (search && !l.crop.toLowerCase().includes(search.toLowerCase()) && !l.variety.toLowerCase().includes(search.toLowerCase())) return false
      if (category !== 'All') {
        const cat = cropCategories.find(c => c.name === category)
        if (cat && !cat.crops.includes(l.crop)) return false
      }
      return true
    })
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price
      if (sortBy === 'price-high') return b.price - a.price
      return 0
    })

  return (
    <main>
      <section className="page-header">
        <div className="container">
          <h1>🛒 <span className="text-gradient">Marketplace</span></h1>
          <p>Browse verified crop listings from quality-certified farmers across India. Negotiate directly and get the best deals.</p>
        </div>
      </section>

      <section className="section" id="marketplace-listings">
        <div className="container">
          {/* Category Pills */}
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: 'var(--space-xl)', overflowX: 'auto', paddingBottom: '0.5rem' }}>
            <button
              className={`btn btn-sm ${category === 'All' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setCategory('All')}
            >
              All Crops
            </button>
            {cropCategories.map(c => (
              <button
                key={c.name}
                className={`btn btn-sm ${category === c.name ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setCategory(c.name)}
              >
                {c.emoji} {c.name}
              </button>
            ))}
          </div>

          {/* Filter Bar */}
          <div className="filter-bar">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1 }}>
              <Search size={18} style={{ color: 'var(--surface-400)', flexShrink: 0 }} />
              <input
                type="text"
                className="input-field"
                placeholder="Search crops, variety, location..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{ border: 'none', background: 'transparent' }}
              />
            </div>
            <select className="input-field" value={sortBy} onChange={e => setSortBy(e.target.value)} style={{ minWidth: '150px' }}>
              <option value="recent">Most Recent</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>

          {/* Results Count */}
          <p style={{ color: 'var(--surface-400)', fontSize: '0.85rem', marginBottom: 'var(--space-lg)' }}>
            Showing <strong style={{ color: 'var(--surface-200)' }}>{filtered.length}</strong> listings
          </p>

          {/* Listing Grid */}
          <div className="grid grid-3">
            {filtered.map(listing => (
              <div className="listing-card glass-card" key={listing.id} id={`listing-${listing.id}`}>
                <div className="listing-crop">
                  <div className="crop-icon">{listing.emoji}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <h4 style={{ fontSize: '1.05rem' }}>{listing.crop}</h4>
                      {listing.certified && (
                        <span className="badge badge-emerald" style={{ padding: '0.15rem 0.5rem' }}>
                          <ShieldCheck size={10} /> Certified
                        </span>
                      )}
                    </div>
                    <p style={{ fontSize: '0.8rem', color: 'var(--surface-400)' }}>{listing.variety}</p>
                  </div>
                  <div className="badge badge-success">Grade {listing.quality}</div>
                </div>

                <div className="listing-details">
                  <div className="detail-item">
                    <div className="detail-label">Quantity</div>
                    <div className="detail-value">{listing.qty}</div>
                  </div>
                  <div className="detail-item">
                    <div className="detail-label">Price</div>
                    <div className="detail-value" style={{ color: 'var(--emerald-400)' }}>₹{listing.price.toLocaleString('en-IN')}/qt</div>
                  </div>
                  <div className="detail-item">
                    <div className="detail-label">Location</div>
                    <div className="detail-value" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <MapPin size={12} /> {listing.location}
                    </div>
                  </div>
                  <div className="detail-item">
                    <div className="detail-label">Seller</div>
                    <div className="detail-value">{listing.seller}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--surface-500)' }}>Posted {listing.postedDate}</span>
                  <button className="btn btn-primary btn-sm">
                    Contact <ArrowUpRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="empty-state">
              <div className="empty-icon">🔍</div>
              <h3>No listings found</h3>
              <p>Try adjusting your filters or search terms</p>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
