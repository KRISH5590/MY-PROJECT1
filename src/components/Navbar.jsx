import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Bell, Globe } from 'lucide-react'

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/marketplace', label: 'Marketplace' },
  { path: '/sell', label: 'Sell Crops' },
  { path: '/prices', label: 'Prices' },
  { path: '/cold-storage', label: 'Storage' },
  { path: '/transport', label: 'Transport' },
  { path: '/quality', label: 'Quality' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location])

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} id="main-navbar">
        <div className="container">
          <Link to="/" className="nav-logo">
            <div className="logo-icon">K</div>
            Kisan<span className="accent">Direct</span>
          </Link>

          <div className="nav-links">
            {navItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className={location.pathname === item.path ? 'active' : ''}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="nav-actions">
            <button className="btn btn-icon btn-secondary" title="Notifications" aria-label="Notifications">
              <Bell size={18} />
            </button>
            <button className="btn btn-icon btn-secondary" title="Language" aria-label="Change Language">
              <Globe size={18} />
            </button>
            <Link to="/dashboard" className="btn btn-primary btn-sm">
              Dashboard
            </Link>
            <button
              className="mobile-menu-btn"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      <div className={`mobile-menu ${mobileOpen ? 'open' : ''}`}>
        <button
          style={{ position: 'absolute', top: '1rem', right: '1rem', color: '#94a3b8' }}
          onClick={() => setMobileOpen(false)}
          aria-label="Close menu"
        >
          <X size={28} />
        </button>
        {navItems.map(item => (
          <Link
            key={item.path}
            to={item.path}
            className={location.pathname === item.path ? 'active' : ''}
          >
            {item.label}
          </Link>
        ))}
        <div style={{ marginTop: '1rem' }}>
          <Link to="/dashboard" className="btn btn-primary" style={{ width: '100%' }}>
            Farmer Dashboard
          </Link>
        </div>
      </div>
    </>
  )
}
