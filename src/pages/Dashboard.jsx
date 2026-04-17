import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { BarChart3, Warehouse, Truck, ShieldCheck, TrendingUp, Package, DollarSign, Award, Bell, Settings, Home, ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js'
import { Line } from 'react-chartjs-2'
import ProfitComparison from '../components/ProfitComparison'
import { farmerProfile, priceTrends7d, notifications } from '../data/mockData'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler)

const sidebarItems = [
  { path: '/dashboard', icon: <Home size={18} />, label: 'Overview' },
  { path: '/sell', icon: <Package size={18} />, label: 'Sell Crops' },
  { path: '/prices', icon: <BarChart3 size={18} />, label: 'Price Intel' },
  { path: '/cold-storage', icon: <Warehouse size={18} />, label: 'Cold Storage' },
  { path: '/transport', icon: <Truck size={18} />, label: 'Transport' },
  { path: '/quality', icon: <ShieldCheck size={18} />, label: 'Quality' },
]

export default function Dashboard() {
  const location = useLocation()
  const [activeTab, setActiveTab] = useState('7d')

  const stats = [
    { label: 'Total Sales', value: farmerProfile.totalSales, icon: <DollarSign size={20} />, color: 'var(--emerald-500)', change: '+12.5%', positive: true },
    { label: 'Orders Completed', value: farmerProfile.ordersCompleted, icon: <Package size={20} />, color: 'var(--info)', change: '+8', positive: true },
    { label: 'Quality Score', value: `${farmerProfile.qualityScore}/100`, icon: <Award size={20} />, color: 'var(--amber-500)', change: '+3', positive: true },
    { label: 'Crops Listed', value: farmerProfile.cropsListed, icon: <TrendingUp size={20} />, color: 'var(--emerald-400)', change: '+2', positive: true },
  ]

  const chartData = {
    labels: priceTrends7d.labels,
    datasets: [
      {
        label: 'Wheat (₹/qt)',
        data: priceTrends7d.wheat,
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4,
        fill: true,
        pointRadius: 4,
        pointBackgroundColor: '#10b981',
      },
      {
        label: 'Soybean (₹/qt)',
        data: priceTrends7d.soybean,
        borderColor: '#f59e0b',
        backgroundColor: 'rgba(245, 158, 11, 0.05)',
        tension: 0.4,
        fill: true,
        pointRadius: 4,
        pointBackgroundColor: '#f59e0b',
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: { color: '#94a3b8', font: { family: 'Inter', size: 12 }, usePointStyle: true, padding: 20 }
      },
      tooltip: {
        backgroundColor: '#1e293b',
        titleColor: '#f8fafc',
        bodyColor: '#cbd5e1',
        borderColor: 'rgba(255,255,255,0.1)',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
      }
    },
    scales: {
      x: {
        ticks: { color: '#64748b', font: { size: 11 } },
        grid: { color: 'rgba(255,255,255,0.03)' },
      },
      y: {
        ticks: { color: '#64748b', font: { size: 11 }, callback: v => `₹${v}` },
        grid: { color: 'rgba(255,255,255,0.03)' },
      },
    },
  }

  return (
    <div className="dashboard-layout" id="dashboard-page">
      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <div style={{ width: '2.75rem', height: '2.75rem', borderRadius: '50%', background: 'var(--gradient-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: 'white', fontSize: '1.1rem' }}>
              RP
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{farmerProfile.name}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--surface-400)' }}>{farmerProfile.location}</div>
            </div>
          </div>
          {farmerProfile.certified && (
            <div className="badge badge-emerald" style={{ marginTop: '0.5rem' }}>
              <ShieldCheck size={12} /> Certified Farmer
            </div>
          )}
        </div>

        <nav className="sidebar-nav">
          {sidebarItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={location.pathname === item.path ? 'active' : ''}
            >
              {item.icon} {item.label}
            </Link>
          ))}
        </nav>

        <div className="divider" />
        <Link to="#" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', color: 'var(--surface-400)', fontSize: '0.9rem' }}>
          <Settings size={18} /> Settings
        </Link>
      </aside>

      {/* Main Content */}
      <div className="dashboard-main">
        <div className="dashboard-header">
          <div>
            <h1>Dashboard</h1>
            <p className="welcome-text">Welcome back, {farmerProfile.name}! Here's your farm business overview.</p>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button className="btn btn-secondary btn-sm" style={{ position: 'relative' }}>
              <Bell size={16} />
              <span style={{ position: 'absolute', top: '-4px', right: '-4px', width: '18px', height: '18px', background: 'var(--danger)', borderRadius: '50%', fontSize: '0.65rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
                {notifications.filter(n => !n.read).length}
              </span>
            </button>
            <Link to="/sell" className="btn btn-primary btn-sm">
              + Sell New Crop
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-4" style={{ marginBottom: 'var(--space-2xl)' }}>
          {stats.map((s, i) => (
            <div className="stat-card glass-card" key={i}>
              <div className="stat-icon" style={{ background: `${s.color}20`, color: s.color }}>
                {s.icon}
              </div>
              <div className="stat-value">{s.value}</div>
              <div className="stat-label">{s.label}</div>
              <div className={`stat-change ${s.positive ? 'positive' : 'negative'}`}>
                {s.positive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {s.change} this month
              </div>
            </div>
          ))}
        </div>

        {/* Price Trends Chart */}
        <div className="chart-container glass-card" style={{ marginBottom: 'var(--space-2xl)' }}>
          <div className="chart-header">
            <h3 style={{ fontSize: '1.1rem' }}>📈 Price Trends — Your Crops</h3>
            <div className="tab-nav" style={{ marginBottom: 0 }}>
              {['7d', '30d'].map(t => (
                <button key={t} className={activeTab === t ? 'active' : ''} onClick={() => setActiveTab(t)}>
                  {t === '7d' ? '7 Days' : '30 Days'}
                </button>
              ))}
            </div>
          </div>
          <div className="chart-wrapper">
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>

        {/* Profit Comparison */}
        <div style={{ marginBottom: 'var(--space-2xl)' }}>
          <ProfitComparison crop="Wheat" qty={50} unit="quintals" />
        </div>

        {/* Recent Orders */}
        <div className="glass-card" style={{ padding: 'var(--space-xl)', overflow: 'auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-lg)' }}>
            <h3 style={{ fontSize: '1.1rem' }}>📦 Recent Orders</h3>
            <Link to="/marketplace" className="btn btn-secondary btn-sm">View All</Link>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Crop</th>
                <th>Qty</th>
                <th>Buyer</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {farmerProfile.recentOrders.map(order => (
                <tr key={order.id}>
                  <td style={{ fontWeight: 600, color: 'var(--emerald-400)' }}>{order.id}</td>
                  <td>{order.crop}</td>
                  <td>{order.qty}</td>
                  <td>{order.buyer}</td>
                  <td style={{ fontWeight: 600 }}>{order.price}</td>
                  <td>
                    <span className={`badge ${order.status === 'Delivered' ? 'badge-success' : order.status === 'In Transit' ? 'badge-info' : 'badge-warning'}`}>
                      {order.status}
                    </span>
                  </td>
                  <td style={{ color: 'var(--surface-400)' }}>{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Notifications */}
        <div className="glass-card" style={{ padding: 'var(--space-xl)', marginTop: 'var(--space-2xl)' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: 'var(--space-lg)' }}>🔔 Notifications</h3>
          {notifications.map(n => (
            <div key={n.id} style={{
              display: 'flex', alignItems: 'flex-start', gap: '1rem', padding: '0.75rem 0',
              borderBottom: '1px solid rgba(255,255,255,0.04)',
              opacity: n.read ? 0.6 : 1
            }}>
              <div style={{
                width: '8px', height: '8px', borderRadius: '50%', marginTop: '6px', flexShrink: 0,
                background: n.read ? 'var(--surface-600)' : 'var(--emerald-500)'
              }} />
              <div>
                <p style={{ fontSize: '0.9rem', color: 'var(--surface-200)' }}>{n.message}</p>
                <p style={{ fontSize: '0.75rem', color: 'var(--surface-500)', marginTop: '0.25rem' }}>{n.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
