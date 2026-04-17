// ===========================
// KisanDirect — Mock Data
// ===========================

export const mandiPrices = [
  { id: 1, crop: 'Wheat', emoji: '🌾', variety: 'Sharbati', market: 'Indore Mandi', state: 'MP', price: 2850, prevPrice: 2780, unit: 'quintal', date: '2026-04-17' },
  { id: 2, crop: 'Soybean', emoji: '🫘', variety: 'JS-9560', market: 'Dewas Mandi', state: 'MP', price: 4620, prevPrice: 4700, unit: 'quintal', date: '2026-04-17' },
  { id: 3, crop: 'Rice', emoji: '🍚', variety: 'Basmati', market: 'Karnal Mandi', state: 'Haryana', price: 3950, prevPrice: 3820, unit: 'quintal', date: '2026-04-17' },
  { id: 4, crop: 'Cotton', emoji: '🏵️', variety: 'MCU-5', market: 'Rajkot Mandi', state: 'Gujarat', price: 7200, prevPrice: 7150, unit: 'quintal', date: '2026-04-17' },
  { id: 5, crop: 'Onion', emoji: '🧅', variety: 'Nashik Red', market: 'Lasalgaon', state: 'Maharashtra', price: 1850, prevPrice: 2100, unit: 'quintal', date: '2026-04-17' },
  { id: 6, crop: 'Potato', emoji: '🥔', variety: 'Agra Red', market: 'Agra Mandi', state: 'UP', price: 1200, prevPrice: 1150, unit: 'quintal', date: '2026-04-17' },
  { id: 7, crop: 'Gram', emoji: '🟤', variety: 'Desi Chana', market: 'Ujjain Mandi', state: 'MP', price: 5300, prevPrice: 5180, unit: 'quintal', date: '2026-04-17' },
  { id: 8, crop: 'Maize', emoji: '🌽', variety: 'Yellow', market: 'Davangere', state: 'Karnataka', price: 2100, prevPrice: 2050, unit: 'quintal', date: '2026-04-17' },
  { id: 9, crop: 'Mustard', emoji: '🟡', variety: 'RH-749', market: 'Alwar Mandi', state: 'Rajasthan', price: 5600, prevPrice: 5450, unit: 'quintal', date: '2026-04-17' },
  { id: 10, crop: 'Tomato', emoji: '🍅', variety: 'Hybrid', market: 'Kolar', state: 'Karnataka', price: 2400, prevPrice: 2600, unit: 'quintal', date: '2026-04-17' },
  { id: 11, crop: 'Sugarcane', emoji: '🎋', variety: 'Co-0238', market: 'Meerut', state: 'UP', price: 350, prevPrice: 345, unit: 'quintal', date: '2026-04-17' },
  { id: 12, crop: 'Turmeric', emoji: '🟠', variety: 'Salem', market: 'Erode', state: 'Tamil Nadu', price: 12500, prevPrice: 12200, unit: 'quintal', date: '2026-04-17' },
];

export const priceTrends7d = {
  labels: ['11 Apr', '12 Apr', '13 Apr', '14 Apr', '15 Apr', '16 Apr', '17 Apr'],
  wheat: [2720, 2740, 2780, 2800, 2780, 2820, 2850],
  soybean: [4500, 4550, 4620, 4680, 4700, 4650, 4620],
  rice: [3750, 3780, 3820, 3850, 3880, 3920, 3950],
  gram: [5100, 5120, 5180, 5200, 5220, 5280, 5300],
};

export const priceTrends30d = {
  labels: Array.from({length: 30}, (_, i) => {
    const d = new Date('2026-03-19');
    d.setDate(d.getDate() + i);
    return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' });
  }),
  wheat: Array.from({length: 30}, (_, i) => 2600 + Math.floor(Math.random() * 300) + i * 5),
  soybean: Array.from({length: 30}, (_, i) => 4300 + Math.floor(Math.random() * 400) + i * 3),
};

export const coldStorages = [
  { id: 1, name: 'Malwa Cold Storage Pvt. Ltd', type: 'private', location: 'Indore, MP', distance: '12 km', capacity: '5000 MT', available: '1200 MT', pricePerQt: 45, rating: 4.5, reviews: 128, features: ['24/7 Monitoring', 'Humidity Control', 'Insurance'], verified: true },
  { id: 2, name: 'MP State Warehousing Corp.', type: 'government', location: 'Dewas, MP', distance: '38 km', capacity: '10000 MT', available: '3500 MT', pricePerQt: 30, rating: 4.2, reviews: 256, features: ['Fumigation', 'Quality Testing', 'Transport Link'], verified: true },
  { id: 3, name: 'Kisan Sahakari Cold Storage', type: 'cooperative', location: 'Ujjain, MP', distance: '55 km', capacity: '3000 MT', available: '800 MT', pricePerQt: 35, rating: 4.0, reviews: 89, features: ['Organic Certified', 'Solar Powered'], verified: true },
  { id: 4, name: 'Agri Fresh Solutions', type: 'private', location: 'Ratlam, MP', distance: '78 km', capacity: '8000 MT', available: '2100 MT', pricePerQt: 50, rating: 4.7, reviews: 195, features: ['Multi-Chamber', 'GPS Tracking', 'Fire Safety', 'Insurance'], verified: true },
  { id: 5, name: 'Narmada Valley Storage', type: 'private', location: 'Hoshangabad, MP', distance: '95 km', capacity: '4000 MT', available: '1500 MT', pricePerQt: 40, rating: 4.3, reviews: 112, features: ['Temperature Zones', 'Loading Docks'], verified: false },
  { id: 6, name: 'Central Warehousing Corp.', type: 'government', location: 'Bhopal, MP', distance: '190 km', capacity: '15000 MT', available: '5000 MT', pricePerQt: 28, rating: 4.4, reviews: 340, features: ['Grading', 'Certification', 'Railway Siding'], verified: true },
];

export const transportPartners = [
  { id: 1, name: 'Porter', type: 'Aggregator', logo: '🚛', minPrice: 800, pricePerKm: 18, rating: 4.6, reviews: 2450, eta: '2-4 hrs', vehicles: ['Mini Truck', 'Tata Ace', 'Eicher'], tracking: true, insurance: true },
  { id: 2, name: 'Loadshare', type: 'Logistics', logo: '📦', minPrice: 600, pricePerKm: 15, rating: 4.3, reviews: 1820, eta: '3-5 hrs', vehicles: ['Open Truck', 'Container', 'Trailer'], tracking: true, insurance: true },
  { id: 3, name: 'Vahak', type: 'Marketplace', logo: '🏗️', minPrice: 500, pricePerKm: 12, rating: 4.1, reviews: 980, eta: '4-6 hrs', vehicles: ['All Types'], tracking: true, insurance: false },
  { id: 4, name: 'Rivigo', type: 'Tech Logistics', logo: '⚡', minPrice: 1200, pricePerKm: 22, rating: 4.8, reviews: 3200, eta: '1-3 hrs', vehicles: ['Refrigerated', 'Container', 'Flatbed'], tracking: true, insurance: true },
  { id: 5, name: 'BlackBuck', type: 'Fleet', logo: '🐂', minPrice: 700, pricePerKm: 14, rating: 4.4, reviews: 1560, eta: '3-5 hrs', vehicles: ['Tata 407', 'Eicher', 'Ashok Leyland'], tracking: true, insurance: true },
];

export const farmerProfile = {
  name: 'Ramesh Patel',
  farmName: 'Patel Organic Farms',
  location: 'Dewas, Madhya Pradesh',
  phone: '+91 98765 43210',
  totalSales: '₹12,45,800',
  cropsListed: 8,
  ordersCompleted: 47,
  qualityScore: 92,
  certified: true,
  certifiedDate: '2026-02-15',
  activeSince: '2025-06-10',
  recentOrders: [
    { id: 'KD-4521', crop: 'Wheat', qty: '50 quintals', buyer: 'DMart', price: '₹1,42,500', status: 'Delivered', date: '2026-04-15' },
    { id: 'KD-4489', crop: 'Soybean', qty: '30 quintals', buyer: 'Reliance Fresh', price: '₹1,38,600', status: 'In Transit', date: '2026-04-14' },
    { id: 'KD-4456', crop: 'Gram', qty: '20 quintals', buyer: 'Local Wholesaler', price: '₹1,06,000', status: 'Pending', date: '2026-04-13' },
    { id: 'KD-4401', crop: 'Wheat', qty: '80 quintals', buyer: 'ITC Agri', price: '₹2,28,000', status: 'Delivered', date: '2026-04-10' },
  ],
};

export const cropCategories = [
  { name: 'Cereals', emoji: '🌾', crops: ['Wheat', 'Rice', 'Maize', 'Bajra', 'Jowar'] },
  { name: 'Pulses', emoji: '🫘', crops: ['Gram', 'Moong', 'Urad', 'Masoor', 'Arhar'] },
  { name: 'Oilseeds', emoji: '🟡', crops: ['Soybean', 'Mustard', 'Groundnut', 'Sunflower'] },
  { name: 'Vegetables', emoji: '🥬', crops: ['Onion', 'Potato', 'Tomato', 'Cauliflower', 'Brinjal'] },
  { name: 'Spices', emoji: '🌶️', crops: ['Turmeric', 'Chilli', 'Coriander', 'Cumin'] },
  { name: 'Cash Crops', emoji: '🏵️', crops: ['Cotton', 'Sugarcane', 'Jute', 'Tobacco'] },
];

export const qualityCertificates = [
  { id: 'QC-2026-0142', crop: 'Wheat (Sharbati)', grade: 'A+', testDate: '2026-03-28', validTill: '2026-06-28', lab: 'MPSC Lab, Indore', parameters: { moisture: '11.2%', protein: '12.8%', gluten: '28.5%', foreignMatter: '0.3%' } },
  { id: 'QC-2026-0098', crop: 'Soybean (JS-9560)', grade: 'A', testDate: '2026-02-15', validTill: '2026-05-15', lab: 'Agri Quality Lab, Dewas', parameters: { moisture: '10.5%', oil: '19.2%', protein: '38.4%', foreignMatter: '0.5%' } },
];

export const notifications = [
  { id: 1, type: 'price', message: 'Wheat prices hit ₹2,850/qt in Indore — above 30-day average!', time: '10 min ago', read: false },
  { id: 2, type: 'order', message: 'Order KD-4489 is out for delivery to Reliance Fresh', time: '1 hr ago', read: false },
  { id: 3, type: 'quality', message: 'Your Sharbati Wheat quality certificate expires in 71 days', time: '3 hrs ago', read: true },
  { id: 4, type: 'system', message: 'New transport partner Rivigo now available in your area', time: '1 day ago', read: true },
];

export const marketplaceListings = [
  { id: 1, crop: 'Wheat', emoji: '🌾', variety: 'Sharbati', qty: '100 quintals', price: 2850, location: 'Indore, MP', seller: 'Ramesh Patel', quality: 'A+', certified: true, postedDate: '2 hrs ago' },
  { id: 2, crop: 'Soybean', emoji: '🫘', variety: 'JS-9560', qty: '75 quintals', price: 4620, location: 'Dewas, MP', seller: 'Sunil Sharma', quality: 'A', certified: true, postedDate: '5 hrs ago' },
  { id: 3, crop: 'Gram', emoji: '🟤', variety: 'Desi Chana', qty: '50 quintals', price: 5300, location: 'Ujjain, MP', seller: 'Mohan Yadav', quality: 'B+', certified: false, postedDate: '8 hrs ago' },
  { id: 4, crop: 'Rice', emoji: '🍚', variety: 'Basmati', qty: '200 quintals', price: 3950, location: 'Karnal, HR', seller: 'Gurpreet Singh', quality: 'A+', certified: true, postedDate: '1 day ago' },
  { id: 5, crop: 'Onion', emoji: '🧅', variety: 'Nashik Red', qty: '150 quintals', price: 1850, location: 'Nashik, MH', seller: 'Pravin Patil', quality: 'A', certified: true, postedDate: '1 day ago' },
  { id: 6, crop: 'Maize', emoji: '🌽', variety: 'Yellow', qty: '80 quintals', price: 2100, location: 'Davangere, KA', seller: 'Ravi Kumar', quality: 'B+', certified: false, postedDate: '2 days ago' },
  { id: 7, crop: 'Mustard', emoji: '🟡', variety: 'RH-749', qty: '60 quintals', price: 5600, location: 'Alwar, RJ', seller: 'Bhola Ram', quality: 'A', certified: true, postedDate: '2 days ago' },
  { id: 8, crop: 'Turmeric', emoji: '🟠', variety: 'Salem', qty: '25 quintals', price: 12500, location: 'Erode, TN', seller: 'Murugan S.', quality: 'A+', certified: true, postedDate: '3 days ago' },
];
