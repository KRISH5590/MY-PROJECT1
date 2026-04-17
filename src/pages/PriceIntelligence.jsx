import { useState, useEffect } from 'react'
import { Search, TrendingUp, TrendingDown, Bell, MapPin, ArrowUpRight } from 'lucide-react'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, Filler } from 'chart.js'
import { Line, Bar } from 'react-chartjs-2'
import { mandiPrices as mockMandiPrices, priceTrends7d, priceTrends30d } from '../data/mockData'
import { prices as pricesAPI } from '../api/client'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, Filler)

export default function PriceIntelligence() {
  const [search, setSearch] = useState('')
  const [stateFilter, setStateFilter] = useState('All')
  const [selectedCrop, setSelectedCrop] = useState('wheat')
  const [trendPeriod, setTrendPeriod] = useState('7d')
  const [mandiPrices, setMandiPrices] = useState(mockMandiPrices)
  const [livePredictions, setLivePredictions] = useState(null)
  const [isLive, setIsLive] = useState(false)

  // Fetch live data from backend on mount
  useEffect(() => {
    async function fetchLiveData() {
      try {
        const [pricesRes, predRes] = await Promise.all([
          pricesAPI.getMandi(),
          pricesAPI.getPredictions()
        ])
        if (pricesRes.ok && pricesRes.data.length > 0) {
          setMandiPrices(pricesRes.data)
          setIsLive(true)
        }
        if (predRes.ok) setLivePredictions(predRes.data)
      } catch (e) {
        console.log('Using mock data (backend offline)')
      }
    }
    fetchLiveData()
  }, [])

  const states = ['All', ...new Set(mandiPrices.map(p => p.state))]
  const filtered = mandiPrices.filter(p => {
    if (search && !p.crop.toLowerCase().includes(search.toLowerCase()) && !p.market.toLowerCase().includes(search.toLowerCase())) return false
    if (stateFilter !== 'All' && p.state !== stateFilter) return false
    return true
  })

  const trendData = trendPeriod === '7d' ? priceTrends7d : priceTrends30d

  const chartData = {
    labels: trendData.labels,
    datasets: [
      {
        label: `${selectedCrop.charAt(0).toUpperCase() + selectedCrop.slice(1)} (₹/qt)`,
        data: trendData[selectedCrop] || trendData.wheat,
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.08)',
        tension: 0.4,
        fill: true,
        pointRadius: trendPeriod === '7d' ? 5 : 2,
        pointBackgroundColor: '#10b981',
        borderWidth: 2,
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { labels: { color: '#94a3b8', font: { family: 'Inter', size: 12 }, usePointStyle: true } },
      tooltip: {
        backgroundColor: '#1e293b', titleColor: '#f8fafc', bodyColor: '#cbd5e1',
        borderColor: 'rgba(255,255,255,0.1)', borderWidth: 1, padding: 12, cornerRadius: 8,
        callbacks: { label: ctx => `₹${ctx.parsed.y.toLocaleString('en-IN')} / quintal` }
      }
    },
    scales: {
      x: { ticks: { color: '#64748b', font: { size: 10 }, maxRotation: 45 }, grid: { color: 'rgba(255,255,255,0.03)' } },
      y: { ticks: { color: '#64748b', font: { size: 11 }, callback: v => `₹${v}` }, grid: { color: 'rgba(255,255,255,0.03)' } },
    },
  }

  // Use live predictions from API, fallback to mock
  const mockPredictions = [
    { crop: '🌾 Wheat', current: 2850, predicted: 2920, confidence: 'High', trend: 'up' },
    { crop: '🫘 Soybean', current: 4620, predicted: 4500, confidence: 'Medium', trend: 'down' },
    { crop: '🍚 Rice', current: 3950, predicted: 4100, confidence: 'High', trend: 'up' },
    { crop: '🟤 Gram', current: 5300, predicted: 5450, confidence: 'Medium', trend: 'up' },
  ]
  const predictions = livePredictions || mockPredictions

  return (
    <main>
      <section className="page-header">
        <div className="container">
          <h1>📊 <span className="text-gradient">Price Intelligence</span></h1>
          <p>Real-time mandi prices from 320+ markets across India. AI-powered trend analysis, demand prediction, and fair price alerts.</p>
        </div>
      </section>

      <section className="section" id="price-intelligence">
        <div className="container">
          {/* AI Predictions */}
          <div className="glass-card" style={{ padding: 'var(--space-xl)', marginBottom: 'var(--space-2xl)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-lg)', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div>
                <h3 style={{ fontSize: '1.1rem' }}>🤖 AI Price Predictions — Next 7 Days</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--surface-400)', marginTop: '0.25rem' }}>Based on APMC data, seasonal patterns, weather, and demand cycles</p>
              </div>
              <button className="btn btn-secondary btn-sm">
                <Bell size={14} /> Set Fair Price Alerts
              </button>
            </div>
            <div className="grid grid-4">
              {predictions.map((p, i) => (
                <div key={i} style={{ padding: 'var(--space-md)', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-lg)' }}>
                  <div style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{p.crop}</div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '0.25rem' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--surface-500)' }}>Now: ₹{p.current.toLocaleString('en-IN')}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--surface-500)' }}>→</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.35rem', color: p.trend === 'up' ? 'var(--success)' : 'var(--danger)' }}>
                      ₹{p.predicted.toLocaleString('en-IN')}
                    </span>
                    {p.trend === 'up' ? <TrendingUp size={18} style={{ color: 'var(--success)' }} /> : <TrendingDown size={18} style={{ color: 'var(--danger)' }} />}
                  </div>
                  <div style={{ marginTop: '0.35rem' }}>
                    <span className={`badge ${p.confidence === 'High' ? 'badge-success' : 'badge-warning'}`}>
                      {p.confidence} confidence
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Price Trends Chart */}
          <div className="glass-card" style={{ padding: 'var(--space-xl)', marginBottom: 'var(--space-2xl)' }}>
            <div className="chart-header">
              <h3 style={{ fontSize: '1.1rem' }}>📈 Price Trends</h3>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <select className="input-field" style={{ minWidth: '120px', padding: '0.5rem 0.75rem', fontSize: '0.85rem' }} value={selectedCrop} onChange={e => setSelectedCrop(e.target.value)}>
                  <option value="wheat">Wheat</option>
                  <option value="soybean">Soybean</option>
                  {trendPeriod === '7d' && <option value="rice">Rice</option>}
                  {trendPeriod === '7d' && <option value="gram">Gram</option>}
                </select>
                <div className="tab-nav" style={{ marginBottom: 0 }}>
                  {['7d', '30d'].map(t => (
                    <button key={t} className={trendPeriod === t ? 'active' : ''} onClick={() => { setTrendPeriod(t); if (t === '30d' && !['wheat','soybean'].includes(selectedCrop)) setSelectedCrop('wheat') }}>
                      {t === '7d' ? '7 Days' : '30 Days'}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div style={{ height: '320px', position: 'relative' }}>
              <Line data={chartData} options={chartOptions} />
            </div>
          </div>

          {/* Live Mandi Prices Table */}
          <div className="glass-card" style={{ padding: 'var(--space-xl)', overflow: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-lg)', flexWrap: 'wrap', gap: '0.5rem' }}>
              <h3 style={{ fontSize: '1.1rem' }}>🏪 Live Mandi Prices Across India</h3>
              <span className={`badge ${isLive ? 'badge-success' : 'badge-warning'}`}>{isLive ? '🟢 LIVE — Backend Connected' : '🟡 DEMO — Using Mock Data'}</span>
            </div>

            {/* Filters */}
            <div style={{ display: 'flex', gap: 'var(--space-md)', marginBottom: 'var(--space-lg)', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1, minWidth: '200px', padding: '0.5rem 0.75rem', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <Search size={16} style={{ color: 'var(--surface-400)' }} />
                <input type="text" placeholder="Search crop or market..." value={search} onChange={e => setSearch(e.target.value)}
                  style={{ background: 'none', border: 'none', color: 'var(--surface-100)', outline: 'none', width: '100%', fontSize: '0.9rem' }} />
              </div>
              <select className="input-field" value={stateFilter} onChange={e => setStateFilter(e.target.value)} style={{ minWidth: '140px', padding: '0.5rem 0.75rem', fontSize: '0.85rem' }}>
                {states.map(s => <option key={s} value={s}>{s === 'All' ? 'All States' : s}</option>)}
              </select>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Crop</th>
                    <th>Variety</th>
                    <th>Market</th>
                    <th>State</th>
                    <th>Price (₹/qt)</th>
                    <th>Change</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(p => {
                    const change = ((p.price - p.prevPrice) / p.prevPrice * 100).toFixed(1)
                    const isUp = p.price >= p.prevPrice
                    return (
                      <tr key={p.id}>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span style={{ fontSize: '1.25rem' }}>{p.emoji}</span>
                            <span style={{ fontWeight: 600 }}>{p.crop}</span>
                          </div>
                        </td>
                        <td>{p.variety}</td>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            <MapPin size={12} style={{ color: 'var(--surface-500)' }} /> {p.market}
                          </div>
                        </td>
                        <td><span className="tag">{p.state}</span></td>
                        <td style={{ fontWeight: 700, fontFamily: 'var(--font-display)', fontSize: '1.05rem' }}>
                          ₹{p.price.toLocaleString('en-IN')}
                        </td>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontWeight: 600, color: isUp ? 'var(--success)' : 'var(--danger)' }}>
                            {isUp ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                            {isUp ? '+' : ''}{change}%
                          </div>
                        </td>
                        <td>
                          <button className="btn btn-secondary btn-sm" style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem' }}>
                            <Bell size={12} /> Alert
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            {filtered.length === 0 && (
              <div className="empty-state" style={{ padding: '2rem' }}>
                <div className="empty-icon">🔍</div>
                <p>No prices found matching your search</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
