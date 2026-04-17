import { Link } from 'react-router-dom'
import { ArrowRight, TrendingUp, Warehouse, Truck, ShieldCheck, BarChart3, Mic, Star } from 'lucide-react'
import PriceTicker from '../components/PriceTicker'
import { mandiPrices } from '../data/mockData'

const features = [
  {
    icon: <TrendingUp size={24} />,
    color: 'emerald',
    title: 'Real-Time Profit Engine',
    desc: 'Compare direct wholesale vs middleman selling — see exact profit breakdowns with transport and storage costs factored in. Know the best option before you sell.'
  },
  {
    icon: <Warehouse size={24} />,
    color: 'blue',
    title: 'Cold Storage Network',
    desc: 'Browse and compare prices from private, government, and cooperative cold storage facilities near you. Book storage instantly and preserve your produce quality.'
  },
  {
    icon: <Truck size={24} />,
    color: 'amber',
    title: 'Transport Aggregation',
    desc: 'Get the best transport rates from Porter, Loadshare, Vahak, and more. Route optimization, live tracking, and competitive pricing — all in one place.'
  },
  {
    icon: <ShieldCheck size={24} />,
    color: 'emerald',
    title: 'Quality Assurance & Trust',
    desc: 'Lab-tested quality certificates, IoT soil sensors for large farms, and AI-powered quality scoring. Earn the "Certified Farmer" badge for premium pricing.'
  },
  {
    icon: <BarChart3 size={24} />,
    color: 'blue',
    title: 'AI Price Intelligence',
    desc: 'Real-time mandi prices from across India, 7/30-day trends, seasonal prediction, and fair price alerts via SMS — so you never sell below market value.'
  },
  {
    icon: <Mic size={24} />,
    color: 'amber',
    title: 'Voice-First & Multilingual',
    desc: 'Voice commands in Hindi, Marathi, Tamil, and more. Built-in voice chat assistant, video tutorials, and 24×7 helpline — technology for every farmer.'
  },
]

const steps = [
  { num: 1, title: 'List Your Crop', desc: 'Enter your crop details, quantity, and location in seconds — or just tell our voice assistant.' },
  { num: 2, title: 'Compare Profits', desc: 'Our AI calculates the best option — direct wholesale, mandi, or middleman — with real costs included.' },
  { num: 3, title: 'Book Services', desc: 'Book cold storage and transport in one click from our verified partner network at best rates.' },
  { num: 4, title: 'Get Paid More', desc: 'Sell directly to buyers at market price. Quality-certified farmers get premium pricing and priority.' },
]

const testimonials = [
  { name: 'Ramesh Patel', role: 'Wheat Farmer, Dewas MP', initials: 'RP', text: '"KisanDirect showed me I was losing ₹250 per quintal through my middleman. After switching to direct selling, I earned ₹1.2 lakhs more in just one season. The transport booking was seamless."' },
  { name: 'Sunita Devi', role: 'Soybean Farmer, Ujjain MP', initials: 'SD', text: '"The voice assistant in Hindi made it so easy. I compared 4 cold storage options and saved ₹15/quintal. Now my produce stays fresh until prices are right."' },
  { name: 'Gurpreet Singh', role: 'Rice Farmer, Karnal HR', initials: 'GS', text: '"The quality certification got me connected to DMart directly. My Basmati rice now sells at premium rates. The price alerts are incredibly useful."' },
]

export default function Landing() {
  const topPrices = mandiPrices.slice(0, 5)

  return (
    <main>
      {/* Hero */}
      <section className="hero" id="hero-section">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text animate-fade-in">
              <div className="hero-badge">
                🌾 India's #1 Farmer-First Platform
              </div>
              <h1>
                Sell Smarter.<br />
                <span className="text-gradient">Earn More.</span>
              </h1>
              <p>
                Real-time profit comparison, cold storage partnerships, and transport
                aggregation — all in one platform. Cut the middleman, maximize your earnings,
                and take control of your harvest.
              </p>
              <div className="hero-actions">
                <Link to="/sell" className="btn btn-primary btn-lg">
                  Start Selling <ArrowRight size={20} />
                </Link>
                <Link to="/prices" className="btn btn-secondary btn-lg">
                  View Live Prices
                </Link>
              </div>
              <div className="hero-stats">
                <div className="hero-stat">
                  <div className="hero-stat-value text-gradient">50K+</div>
                  <div className="hero-stat-label">Active Farmers</div>
                </div>
                <div className="hero-stat">
                  <div className="hero-stat-value text-gradient">₹180Cr</div>
                  <div className="hero-stat-label">Transactions</div>
                </div>
                <div className="hero-stat">
                  <div className="hero-stat-value text-gradient">320+</div>
                  <div className="hero-stat-label">Mandis Tracked</div>
                </div>
              </div>
            </div>

            <div className="hero-visual animate-fade-in animate-fade-in-delay-2">
              <div className="hero-card glass-card">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <h4 style={{ fontSize: '1rem' }}>📊 Live Mandi Prices</h4>
                  <span className="badge badge-success">LIVE</span>
                </div>
                {topPrices.map(item => {
                  const change = ((item.price - item.prevPrice) / item.prevPrice * 100).toFixed(1)
                  const isUp = item.price >= item.prevPrice
                  return (
                    <div className="price-item" key={item.id}>
                      <div className="crop-info">
                        <div className="crop-emoji">{item.emoji}</div>
                        <div>
                          <div className="crop-name">{item.crop}</div>
                          <div className="crop-location">{item.market}</div>
                        </div>
                      </div>
                      <div className="crop-price">
                        <div className="price-value">₹{item.price.toLocaleString('en-IN')}</div>
                        <div className={`price-change ${isUp ? 'up' : 'down'}`}>
                          {isUp ? '▲' : '▼'} {Math.abs(change)}%
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Price Ticker */}
      <PriceTicker />

      {/* Features */}
      <section className="section features-section" id="features-section">
        <div className="container">
          <div className="section-header">
            <h2>Everything a Farmer Needs,<br /><span className="text-gradient">In One Platform</span></h2>
            <p>From real-time pricing to quality certification — we've built every tool a modern farmer needs to sell smarter and earn more.</p>
          </div>
          <div className="grid grid-3">
            {features.map((f, i) => (
              <div className={`feature-card glass-card animate-fade-in animate-fade-in-delay-${(i % 4) + 1}`} key={i}>
                <div className={`feature-icon ${f.color}`}>{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section how-it-works" id="how-it-works">
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 3rem' }}>
            <h2>How <span className="text-gradient">KisanDirect</span> Works</h2>
            <p style={{ color: 'var(--surface-400)', fontSize: '1.05rem', marginTop: '1rem' }}>Four simple steps to maximize your farming profit</p>
          </div>
          <div className="steps-grid">
            {steps.map(s => (
              <div className="step-card glass-card" key={s.num}>
                <div className="step-number">{s.num}</div>
                <h4>{s.title}</h4>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section" id="testimonials-section">
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 3rem' }}>
            <h2>Trusted by <span className="text-gradient">Thousands</span> of Farmers</h2>
            <p style={{ color: 'var(--surface-400)', fontSize: '1.05rem', marginTop: '1rem' }}>Real stories from real farmers across India</p>
          </div>
          <div className="grid grid-3">
            {testimonials.map((t, i) => (
              <div className="testimonial-card glass-card" key={i}>
                <div className="stars" style={{ marginBottom: '1rem' }}>
                  {[1,2,3,4,5].map(s => <Star key={s} size={16} fill="var(--amber-400)" />)}
                </div>
                <p className="testimonial-text">{t.text}</p>
                <div className="testimonial-author">
                  <div className="author-avatar">{t.initials}</div>
                  <div>
                    <div className="author-name">{t.name}</div>
                    <div className="author-role">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section cta-section" id="cta-section">
        <div className="container">
          <div className="cta-box">
            <h2>Ready to <span className="text-gradient">Earn More</span>?</h2>
            <p>Join 50,000+ farmers who are selling smarter, storing better, and earning more with KisanDirect.</p>
            <div className="hero-actions">
              <Link to="/sell" className="btn btn-primary btn-lg">
                Start Selling Today <ArrowRight size={20} />
              </Link>
              <Link to="/marketplace" className="btn btn-secondary btn-lg">
                Browse Marketplace
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
