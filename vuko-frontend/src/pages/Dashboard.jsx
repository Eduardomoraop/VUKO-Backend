import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Dashboard() {
  const navigate = useNavigate()
  // Estado para el consejo 
  const [advice, setAdvice] = useState("")

  // Funcion para la IA
  const getCareerAdvice = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert("Chamo, primero haz login para obtener tu token.");
      navigate('/');
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/advice`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token // Enviamos el token de seguridad
        }
      });
      const result = await response.json();
      if (response.ok) {
        setAdvice(result.msg);
      } else {
        alert("Error de la IA: " + result.msg);
      }
    } catch {
      alert("Error conectando con la IA de VUKO.");
    }
  };

  return (
    <div className="card">
      {/*SECCIÓN DE CONSEJO IA*/}
      <h2>Tu Asesor IA 🤖</h2>
      <button 
        onClick={getCareerAdvice} 
        style={{ backgroundColor: '#6f42c1', color: 'white', padding: '10px' }}
      >
        Obtener mi consejo profesional
      </button>

      {advice && (
        <div className="advice-card">
          <div className="advice-header">
            <span>🎯</span>
            <h3>Estrategia VUKO</h3>
          </div>
          <p className="advice-content">"{advice}"</p>
        </div>
      )}

      <hr />
      <button 
        onClick={() => { localStorage.removeItem('token'); navigate('/'); }}
        style={{ backgroundColor: '#dc3545', marginTop: '20px' }}
      >
        Cerrar Sesión
      </button>
    </div>
  )
}

export default Dashboard