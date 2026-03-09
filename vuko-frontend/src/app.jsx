import { useEffect, useState } from 'react'
import './App.css' // <-- Aquí conectamos con tu archivo de estilos

function App() {
  const [data, setData] = useState(null)

  useEffect(() => {
    // Llamada a la URL de Render guardada en el .env
    fetch(import.meta.env.VITE_API_URL)
      .then((res) => res.json())
      .then((resData) => setData(resData))
      .catch((err) => console.error("Error conectando:", err))
  }, [])

  return (
    <div className="app-container">
      <div className="card">
        <h1>VUKO.ai - Semana 3 🚀</h1>
        
        {data ? (
          <div>
            <h2 className="success-badge">Conexión Exitosa ✅</h2>
            <p>Mensaje del servidor: <strong>{data.msg}</strong></p>
            <p>Autor: {data.author}</p>
          </div>
        ) : (
          <p>Conectando con el servidor en Render...</p>
        )}
      </div>
    </div>
  )
}

export default App