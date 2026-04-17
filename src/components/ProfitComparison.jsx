import { useState } from 'react'
import { TrendingUp, Users, ArrowRight } from 'lucide-react'

export default function ProfitComparison({ crop = 'Wheat', qty = 50, unit = 'quintals' }) {
  const [selectedCrop] = useState(crop)

  // Mock profit calculation
  const marketPrice = 2850
  const middlemanPrice = 2600

  const directRevenue = marketPrice * qty
  const directTransport = 3500
  const directStorage = 2250
  const directPlatformFee = Math.round(directRevenue * 0.01)
  const directProfit = directRevenue - directTransport - directStorage - directPlatformFee

  const middlemanRevenue = middlemanPrice * qty
  const middlemanCommission = Math.round(middlemanRevenue * 0.05)
  const middlemanProfit = middlemanRevenue - middlemanCommission

  const directBetter = directProfit > middlemanProfit
  const savings = Math.abs(directProfit - middlemanProfit)

  return (
    <div className="profit-comparison glass-card" id="profit-comparison">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
        <div>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>
            Profit Comparison — {selectedCrop}
          </h3>
          <p style={{ color: 'var(--surface-400)', fontSize: '0.85rem' }}>
            {qty} {unit} • Real-time calculation
          </p>
        </div>
        <div className={`badge ${directBetter ? 'badge-success' : 'badge-warning'}`}>
          {directBetter ? '🎯 Direct Sale Wins!' : '⚡ Middleman Route Faster'}
        </div>
      </div>

      <div className="profit-options">
        {/* Direct to Wholesaler/Retailer */}
        <div className={`profit-option ${directBetter ? 'recommended' : ''}`}>
          <h4>
            <TrendingUp size={18} style={{ color: 'var(--emerald-400)' }} />
            Direct to Wholesaler
          </h4>
          <div className="profit-breakdown">
            <div className="profit-row">
              <span className="label">Sale Price (₹{marketPrice}/qt × {qty})</span>
              <span className="value">₹{directRevenue.toLocaleString('en-IN')}</span>
            </div>
            <div className="profit-row">
              <span className="label">Transport Cost</span>
              <span className="value" style={{ color: 'var(--danger)' }}>-₹{directTransport.toLocaleString('en-IN')}</span>
            </div>
            <div className="profit-row">
              <span className="label">Cold Storage (est. 5 days)</span>
              <span className="value" style={{ color: 'var(--danger)' }}>-₹{directStorage.toLocaleString('en-IN')}</span>
            </div>
            <div className="profit-row">
              <span className="label">Platform Fee (1%)</span>
              <span className="value" style={{ color: 'var(--danger)' }}>-₹{directPlatformFee.toLocaleString('en-IN')}</span>
            </div>
            <div className="profit-row total">
              <span className="label">Net Profit</span>
              <span className="value">₹{directProfit.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>

        {/* Through Middleman */}
        <div className={`profit-option ${!directBetter ? 'recommended' : ''}`}>
          <h4>
            <Users size={18} style={{ color: 'var(--amber-400)' }} />
            Through Middleman
          </h4>
          <div className="profit-breakdown">
            <div className="profit-row">
              <span className="label">Sale Price (₹{middlemanPrice}/qt × {qty})</span>
              <span className="value">₹{middlemanRevenue.toLocaleString('en-IN')}</span>
            </div>
            <div className="profit-row">
              <span className="label">Transport Cost</span>
              <span className="value" style={{ color: 'var(--surface-400)' }}>₹0 (handled)</span>
            </div>
            <div className="profit-row">
              <span className="label">Storage Cost</span>
              <span className="value" style={{ color: 'var(--surface-400)' }}>₹0 (handled)</span>
            </div>
            <div className="profit-row">
              <span className="label">Middleman Commission (5%)</span>
              <span className="value" style={{ color: 'var(--danger)' }}>-₹{middlemanCommission.toLocaleString('en-IN')}</span>
            </div>
            <div className="profit-row total">
              <span className="label">Net Profit</span>
              <span className="value">₹{middlemanProfit.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>
      </div>

      <div style={{
        marginTop: 'var(--space-lg)',
        padding: '1rem 1.25rem',
        background: directBetter ? 'rgba(16, 185, 129, 0.08)' : 'rgba(245, 158, 11, 0.08)',
        borderRadius: 'var(--radius-lg)',
        border: `1px solid ${directBetter ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.15)'}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '0.5rem'
      }}>
        <div>
          <p style={{ fontWeight: 700, color: directBetter ? 'var(--emerald-400)' : 'var(--amber-400)', fontSize: '0.95rem' }}>
            {directBetter ? '✅ Direct sale saves you' : '⚡ Middleman saves time'}: <strong>₹{savings.toLocaleString('en-IN')}</strong> more profit
          </p>
          <p style={{ fontSize: '0.8rem', color: 'var(--surface-400)', marginTop: '0.25rem' }}>
            Based on today's Indore Mandi prices and nearest transport/storage rates
          </p>
        </div>
        <button className="btn btn-primary btn-sm">
          Proceed <ArrowRight size={16} />
        </button>
      </div>
    </div>
  )
}
