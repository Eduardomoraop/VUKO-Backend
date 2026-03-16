import { useEffect, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard.jsx'
import './App.css' 

function App() {
  // ESTADOS
  const [data, setData] = useState(null)

  // EFECTOS
  useEffect(() => {
    
    fetch(import.meta.env.VITE_API_URL)
      .then((res) => res.json())
      .then((resData) => setData(resData))
      .catch((err) => console.error("Error conectando:", err))
  }, [])

  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<Home serverStatus={data} />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  )
}

export default App