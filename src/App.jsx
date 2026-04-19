import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ChatBot from './components/ChatBot'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import Marketplace from './pages/Marketplace'
import SellCrops from './pages/SellCrops'
import ColdStorage from './pages/ColdStorage'
import Transport from './pages/Transport'
import Quality from './pages/Quality'
import PriceIntelligence from './pages/PriceIntelligence'
import Login from './pages/Login'

function Layout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}

export default function App() {
  const location = useLocation()
  const isLoginPage = location.pathname === '/login'

  return (
    <>
      {isLoginPage ? (
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      ) : (
        <Layout>
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
        </Layout>
      )}
      <ChatBot />
    </>
  )
}
