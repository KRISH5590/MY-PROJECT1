// KisanDirect — Frontend API Client
// Connects React frontend to Express backend (http://localhost:3001)

const API_BASE = 'http://localhost:3001/api/v1'

// Token management
let authToken = localStorage.getItem('kd_token') || null

export function setToken(token) {
  authToken = token
  localStorage.setItem('kd_token', token)
}

export function clearToken() {
  authToken = null
  localStorage.removeItem('kd_token')
}

export function getToken() {
  return authToken
}

// Core fetch wrapper
async function apiFetch(endpoint, options = {}) {
  const headers = { 'Content-Type': 'application/json', ...options.headers }
  if (authToken) headers['Authorization'] = `Bearer ${authToken}`

  try {
    const res = await fetch(`${API_BASE}${endpoint}`, { ...options, headers })
    const data = await res.json()
    if (!res.ok) throw { ...data, status: res.status }
    return data
  } catch (err) {
    if (err.ok === false) throw err
    // Network error — return cached data hint
    console.warn('API call failed:', endpoint, err.message)
    throw { ok: false, msg: 'Network error', msg_hi: 'नेटवर्क त्रुटि', offline: true }
  }
}

// ============ AUTH ============
export const auth = {
  farmerLogin: (phone, password) =>
    apiFetch('/auth/farmer/login', { method: 'POST', body: JSON.stringify({ phone, password }) }),

  farmerRegister: (data) =>
    apiFetch('/auth/farmer/register', { method: 'POST', body: JSON.stringify(data) }),

  buyerLogin: (phone, password) =>
    apiFetch('/auth/buyer/login', { method: 'POST', body: JSON.stringify({ phone, password }) }),

  buyerRegister: (data) =>
    apiFetch('/auth/buyer/register', { method: 'POST', body: JSON.stringify(data) }),
}

// ============ FARMER ============
export const farmer = {
  getProfile: () => apiFetch('/farmer/profile'),
  getStats: () => apiFetch('/farmer/stats'),
  updateProfile: (data) => apiFetch('/farmer/profile', { method: 'PUT', body: JSON.stringify(data) }),
  getNotifications: () => apiFetch('/farmer/notifications'),
  markRead: (id) => apiFetch(`/farmer/notifications/${id}/read`, { method: 'PUT' }),
}

// ============ PRODUCE / MARKETPLACE ============
export const produce = {
  getListings: (params = {}) => {
    const qs = new URLSearchParams(params).toString()
    return apiFetch(`/produce/listings${qs ? '?' + qs : ''}`)
  },
  getCategories: () => apiFetch('/produce/categories'),
  getCrops: () => apiFetch('/produce/crops'),
  createListing: (data) => apiFetch('/produce/list', { method: 'POST', body: JSON.stringify(data) }),
  getListing: (id) => apiFetch(`/produce/${id}`),
}

// ============ PRICES ============
export const prices = {
  getMandi: (params = {}) => {
    const qs = new URLSearchParams(params).toString()
    return apiFetch(`/prices/mandi${qs ? '?' + qs : ''}`)
  },
  getStates: () => apiFetch('/prices/states'),
  getTrends: (crop, period = '7d') => apiFetch(`/prices/trends/${crop}?period=${period}`),
  getPredictions: () => apiFetch('/prices/predictions'),
  getTicker: () => apiFetch('/prices/ticker'),
}

// ============ PROFIT COMPARISON ============
export const profit = {
  compare: (crop, quantity, location, targetMarket) =>
    apiFetch('/profit/compare', {
      method: 'POST',
      body: JSON.stringify({ crop, quantity, location, targetMarket })
    }),
  getStrategy: (crop, quantity, location) =>
    apiFetch('/profit/strategy', {
      method: 'POST',
      body: JSON.stringify({ crop, quantity, location })
    }),
}

// ============ COLD STORAGE ============
export const storage = {
  getList: (params = {}) => {
    const qs = new URLSearchParams(params).toString()
    return apiFetch(`/storage/list${qs ? '?' + qs : ''}`)
  },
  book: (data) => apiFetch('/storage/book', { method: 'POST', body: JSON.stringify(data) }),
  getBookings: () => apiFetch('/storage/bookings'),
}

// ============ TRANSPORT ============
export const transport = {
  getPartners: () => apiFetch('/transport/partners'),
  calculate: (from, to) =>
    apiFetch('/transport/calculate', { method: 'POST', body: JSON.stringify({ from, to }) }),
  book: (data) => apiFetch('/transport/book', { method: 'POST', body: JSON.stringify(data) }),
}

// ============ QUALITY ============
export const quality = {
  getCertificates: () => apiFetch('/quality/certificates'),
  getIoTSensors: () => apiFetch('/quality/iot-sensors'),
  bookLabTest: (data) => apiFetch('/quality/book-lab-test', { method: 'POST', body: JSON.stringify(data) }),
  getGrades: () => apiFetch('/quality/grades'),
  verifyQR: (qrCode) => apiFetch(`/quality/verify/${qrCode}`),
}

// ============ ORDERS ============
export const orders = {
  getAll: (params = {}) => {
    const qs = new URLSearchParams(params).toString()
    return apiFetch(`/orders${qs ? '?' + qs : ''}`)
  },
  create: (data) => apiFetch('/orders/create', { method: 'POST', body: JSON.stringify(data) }),
  updateStatus: (orderId, status) =>
    apiFetch(`/orders/${orderId}/status`, { method: 'PUT', body: JSON.stringify({ status }) }),
}

// ============ NEGOTIATION ============
export const negotiate = {
  getMessages: (orderId) => apiFetch(`/negotiate/${orderId}`),
  send: (orderId, data) =>
    apiFetch(`/negotiate/${orderId}/send`, { method: 'POST', body: JSON.stringify(data) }),
  accept: (orderId, offerPrice) =>
    apiFetch(`/negotiate/${orderId}/accept`, { method: 'POST', body: JSON.stringify({ offerPrice }) }),
}

// ============ ALERTS ============
export const alerts = {
  getAll: () => apiFetch('/alerts'),
  create: (data) => apiFetch('/alerts/create', { method: 'POST', body: JSON.stringify(data) }),
  remove: (id) => apiFetch(`/alerts/${id}`, { method: 'DELETE' }),
}

// Default export for convenience
export default { auth, farmer, produce, prices, profit, storage, transport, quality, orders, negotiate, alerts }
