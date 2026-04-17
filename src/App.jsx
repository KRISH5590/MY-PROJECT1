import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import Marketplace from './pages/Marketplace'
import SellCrops from './pages/SellCrops'
import ColdStorage from './pages/ColdStorage'
import Transport from './pages/Transport'
import Quality from './pages/Quality'
import PriceIntelligence from './pages/PriceIntelligence'

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/sell" element={<SellCrops />} />
        <Route path="/cold-storage" element={<ColdStorage />} />
        <Route path="/transport" element={<Transport />} />
        <Route path="/quality" element={<Quality />} />
        <Route path="/prices" element={<PriceIntelligence />} />
      </Routes>
      <Footer />
    </>
  )
}
