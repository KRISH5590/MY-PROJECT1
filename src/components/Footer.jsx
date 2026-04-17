import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer" id="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="nav-logo" style={{ marginBottom: '0.5rem' }}>
              <div className="logo-icon">K</div>
              Kisan<span className="accent">Direct</span>
            </Link>
            <p>
              India's first farmer-first agricultural marketplace. Empowering farmers
              to maximize profits through real-time price intelligence, cold storage
              partnerships, and transport aggregation.
            </p>
          </div>

          <div className="footer-col">
            <h4>Platform</h4>
            <Link to="/marketplace">Marketplace</Link>
            <Link to="/sell">Sell Your Crops</Link>
            <Link to="/prices">Price Intelligence</Link>
            <Link to="/quality">Quality Assurance</Link>
          </div>

          <div className="footer-col">
            <h4>Services</h4>
            <Link to="/cold-storage">Cold Storage</Link>
            <Link to="/transport">Transport</Link>
            <Link to="/dashboard">Farmer Dashboard</Link>
            <a href="#">Lab Testing</a>
          </div>

          <div className="footer-col">
            <h4>Support</h4>
            <a href="#">Help Center</a>
            <a href="#">24×7 Helpline</a>
            <a href="#">Tutorials</a>
            <a href="#">Contact Us</a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 KisanDirect. All rights reserved. | Farmer First, Always.</p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
