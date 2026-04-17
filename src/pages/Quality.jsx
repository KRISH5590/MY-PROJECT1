import { useState } from 'react'
import { ShieldCheck, FlaskConical, Cpu, Award, QrCode, FileCheck, ArrowRight, CheckCircle2 } from 'lucide-react'
import { qualityCertificates } from '../data/mockData'

const qualityTiers = [
  { grade: 'A+', label: 'Premium', color: 'var(--emerald-400)', desc: 'Top-quality produce, lab-tested & IoT-verified. Gets 15% higher prices.', benefits: ['Priority listing', 'Direct retail chain access', 'Premium pricing', 'Certified badge'] },
  { grade: 'A', label: 'Verified', color: 'var(--success)', desc: 'Lab-tested quality. Gets 8-12% higher prices from wholesale buyers.', benefits: ['Verified badge', 'Better buyer matching', 'Higher visibility'] },
  { grade: 'B+', label: 'Standard', color: 'var(--amber-400)', desc: 'Self-declared quality. Standard market pricing applies.', benefits: ['Standard listing', 'Market access'] },
  { grade: 'B', label: 'Basic', color: 'var(--surface-400)', desc: 'No quality verification. Standard mandi pricing.', benefits: ['Basic listing'] },
]

export default function Quality() {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <main>
      <section className="page-header">
        <div className="container">
          <h1>✅ <span className="text-gradient">Quality Assurance</span></h1>
          <p>Lab testing, IoT sensors, and AI-powered quality scoring. Get certified, earn the trusted farmer badge, and unlock premium pricing.</p>
        </div>
      </section>

      <section className="section" id="quality-section">
        <div className="container">
          {/* Tabs */}
          <div className="tab-nav">
            {[
              { key: 'overview', label: '📋 Overview' },
              { key: 'certificates', label: '📄 My Certificates' },
              { key: 'iot', label: '📡 IoT Sensors' },
              { key: 'lab', label: '🔬 Book Lab Test' },
            ].map(t => (
              <button key={t.key} className={activeTab === t.key ? 'active' : ''} onClick={() => setActiveTab(t.key)}>
                {t.label}
              </button>
            ))}
          </div>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <>
              {/* Quality Tiers */}
              <h3 style={{ marginBottom: 'var(--space-lg)' }}>Quality Grading System</h3>
              <div className="grid grid-4" style={{ marginBottom: 'var(--space-3xl)' }}>
                {qualityTiers.map(tier => (
                  <div className="glass-card" style={{ padding: 'var(--space-xl)', position: 'relative', overflow: 'hidden' }} key={tier.grade}>
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: tier.color }} />
                    <div style={{
                      width: '3rem', height: '3rem', borderRadius: '50%', background: `${tier.color}20`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.1rem', color: tier.color,
                      marginBottom: 'var(--space-md)'
                    }}>
                      {tier.grade}
                    </div>
                    <h4 style={{ marginBottom: '0.25rem' }}>{tier.label}</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--surface-400)', marginBottom: 'var(--space-md)' }}>{tier.desc}</p>
                    <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                      {tier.benefits.map(b => (
                        <li key={b} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--surface-300)' }}>
                          <CheckCircle2 size={13} style={{ color: tier.color, flexShrink: 0 }} /> {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* How Quality Works */}
              <div className="glass-card" style={{ padding: 'var(--space-xl)', marginBottom: 'var(--space-2xl)' }}>
                <h3 style={{ fontSize: '1.1rem', marginBottom: 'var(--space-xl)' }}>🔬 How Quality Assurance Works</h3>
                <div className="grid grid-3">
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ width: '4rem', height: '4rem', borderRadius: '50%', background: 'rgba(59,130,246,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto var(--space-md)' }}>
                      <FlaskConical size={24} style={{ color: 'var(--info)' }} />
                    </div>
                    <h4 style={{ fontSize: '1rem', marginBottom: '0.35rem' }}>Periodic Lab Testing</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--surface-400)' }}>
                      Mandatory testing for moisture, protein, foreign matter. Reports valid for 90 days. Cost borne by farmer — earns Certified tag.
                    </p>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ width: '4rem', height: '4rem', borderRadius: '50%', background: 'rgba(16,185,129,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto var(--space-md)' }}>
                      <Cpu size={24} style={{ color: 'var(--emerald-400)' }} />
                    </div>
                    <h4 style={{ fontSize: '1rem', marginBottom: '0.35rem' }}>IoT Soil Sensors</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--surface-400)' }}>
                      For large/bulk farmers — soil health, moisture, and temperature monitoring. Installed and maintained by partner startups.
                    </p>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ width: '4rem', height: '4rem', borderRadius: '50%', background: 'rgba(245,158,11,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto var(--space-md)' }}>
                      <Cpu size={24} style={{ color: 'var(--amber-400)' }} />
                    </div>
                    <h4 style={{ fontSize: '1rem', marginBottom: '0.35rem' }}>AI/ML Quality Scoring</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--surface-400)' }}>
                      Computer vision and ML models analyze produce images and lab data to generate a reliable quality score for buyers.
                    </p>
                  </div>
                </div>
              </div>

              {/* Batch QR Code feature */}
              <div className="glass-card" style={{ padding: 'var(--space-xl)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)', marginBottom: 'var(--space-lg)' }}>
                  <div style={{ width: '3rem', height: '3rem', borderRadius: 'var(--radius-md)', background: 'rgba(16,185,129,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <QrCode size={22} style={{ color: 'var(--emerald-400)' }} />
                  </div>
                  <div>
                    <h4>Batch-Level QR Verification</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--surface-400)' }}>Each lab-tested batch gets a unique QR code tied to its certificate</p>
                  </div>
                </div>
                <p style={{ fontSize: '0.9rem', color: 'var(--surface-300)', lineHeight: 1.7 }}>
                  Buyers can scan the QR code on any produce bag to verify the exact batch, lab test results, and farmer details. 
                  This prevents misrepresentation and builds trust. Farmers with fake batches get low ratings and may face legal action via our dispute resolution cell.
                </p>
              </div>
            </>
          )}

          {/* Certificates Tab */}
          {activeTab === 'certificates' && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-xl)' }}>
                <h3>My Quality Certificates</h3>
                <button className="btn btn-primary btn-sm">
                  <FlaskConical size={16} /> Book New Test
                </button>
              </div>

              {qualityCertificates.map(cert => (
                <div className="glass-card" style={{ padding: 'var(--space-xl)', marginBottom: 'var(--space-lg)' }} key={cert.id}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 'var(--space-md)', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                        <FileCheck size={18} style={{ color: 'var(--emerald-400)' }} />
                        <h4>{cert.crop}</h4>
                        <span className="badge badge-success">Grade {cert.grade}</span>
                      </div>
                      <p style={{ fontSize: '0.8rem', color: 'var(--surface-400)' }}>
                        Certificate: {cert.id} • Lab: {cert.lab}
                      </p>
                    </div>
                    <div className="quality-badge-large">
                      <Award size={18} /> Certified
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 'var(--space-md)', padding: 'var(--space-md)', background: 'rgba(255,255,255,0.02)', borderRadius: 'var(--radius-md)' }}>
                    {Object.entries(cert.parameters).map(([key, val]) => (
                      <div key={key}>
                        <div style={{ fontSize: '0.75rem', color: 'var(--surface-500)', textTransform: 'capitalize' }}>{key.replace(/([A-Z])/g, ' $1')}</div>
                        <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--surface-100)' }}>{val}</div>
                      </div>
                    ))}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'var(--space-md)', fontSize: '0.8rem', color: 'var(--surface-400)' }}>
                    <span>Tested: {cert.testDate}</span>
                    <span>Valid till: <strong style={{ color: 'var(--emerald-400)' }}>{cert.validTill}</strong></span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* IoT Tab */}
          {activeTab === 'iot' && (
            <div>
              <div className="glass-card" style={{ padding: 'var(--space-xl)' }}>
                <h3 style={{ marginBottom: 'var(--space-lg)' }}>📡 IoT Sensor Dashboard</h3>
                <div className="grid grid-3" style={{ marginBottom: 'var(--space-xl)' }}>
                  {[
                    { label: 'Soil Moisture', value: '42%', status: 'Optimal', color: 'var(--info)' },
                    { label: 'Soil pH', value: '6.8', status: 'Good', color: 'var(--emerald-400)' },
                    { label: 'Temperature', value: '28°C', status: 'Normal', color: 'var(--amber-400)' },
                  ].map(sensor => (
                    <div key={sensor.label} style={{ padding: 'var(--space-lg)', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-lg)', textAlign: 'center' }}>
                      <div style={{ fontSize: '0.8rem', color: 'var(--surface-400)', marginBottom: '0.25rem' }}>{sensor.label}</div>
                      <div style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 800, color: sensor.color }}>{sensor.value}</div>
                      <span className="badge badge-success" style={{ marginTop: '0.5rem' }}>{sensor.status}</span>
                    </div>
                  ))}
                </div>

                <div style={{ padding: '1rem', background: 'rgba(59,130,246,0.06)', borderRadius: 'var(--radius-lg)', border: '1px solid rgba(59,130,246,0.1)' }}>
                  <p style={{ fontSize: '0.85rem', color: 'var(--info)', fontWeight: 600, marginBottom: '0.25rem' }}>ℹ️ IoT sensors are available for large and bulk-selling farmers</p>
                  <p style={{ fontSize: '0.8rem', color: 'var(--surface-400)' }}>
                    Installation and maintenance handled by our partner startups. Sensors capture soil health, moisture, and temperature data to ensure consistent crop quality.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Book Lab Test Tab */}
          {activeTab === 'lab' && (
            <div className="glass-card" style={{ padding: 'var(--space-xl)', maxWidth: '640px' }}>
              <h3 style={{ marginBottom: 'var(--space-lg)' }}>🔬 Book Lab Test</h3>
              <form>
                <div className="form-grid">
                  <div className="input-group">
                    <label htmlFor="lab-crop">Crop</label>
                    <select id="lab-crop" className="input-field">
                      <option>Wheat</option><option>Soybean</option><option>Rice</option><option>Gram</option><option>Maize</option>
                    </select>
                  </div>
                  <div className="input-group">
                    <label htmlFor="lab-variety">Variety</label>
                    <input id="lab-variety" type="text" className="input-field" placeholder="e.g. Sharbati" />
                  </div>
                  <div className="input-group">
                    <label htmlFor="lab-qty">Sample Quantity (kg)</label>
                    <input id="lab-qty" type="number" className="input-field" defaultValue={2} min={1} />
                  </div>
                  <div className="input-group">
                    <label htmlFor="lab-location">Preferred Lab</label>
                    <select id="lab-location" className="input-field">
                      <option>MPSC Lab, Indore</option>
                      <option>Agri Quality Lab, Dewas</option>
                      <option>State Lab, Bhopal</option>
                    </select>
                  </div>
                </div>

                <div style={{ marginTop: 'var(--space-xl)', padding: '1rem', background: 'rgba(245,158,11,0.06)', borderRadius: 'var(--radius-lg)', border: '1px solid rgba(245,158,11,0.1)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.85rem', color: 'var(--surface-300)' }}>Lab Test Fee</span>
                    <span style={{ fontWeight: 700, color: 'var(--surface-100)' }}>₹500 - ₹1,200</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.85rem', color: 'var(--surface-300)' }}>Report Time</span>
                    <span style={{ fontWeight: 600, color: 'var(--surface-200)' }}>3-5 Business Days</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '0.85rem', color: 'var(--surface-300)' }}>Certificate Validity</span>
                    <span style={{ fontWeight: 600, color: 'var(--emerald-400)' }}>90 Days</span>
                  </div>
                </div>

                <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: 'var(--space-xl)' }}>
                  Book Lab Test <ArrowRight size={20} />
                </button>
              </form>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
