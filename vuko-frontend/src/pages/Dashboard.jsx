import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Dashboard() {
  const navigate = useNavigate()
  
  // Estado para el consejo 
  const [advice, setAdvice] = useState("") 
  
  // Estado para editar la profesion
  const [newCareer, setNewCareer] = useState("")
  
  // Funcion para la IA
  const getCareerAdvice = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert("Primero haz login para obtener tu token.");
      navigate('/');
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/advice`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
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

  // Funcion para actualizar el perfil (UPDATE)
  const handleUpdateCareer = async (e) =>{
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/update`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
          'x-auth-token': token
        }, // <--- AQUÍ ESTABA EL ENREDO, faltaba esta coma
        body: JSON.stringify({ career: newCareer })
      });
      if (response.ok) {
        alert("¡Profesion Actualizada! 💪");
        setNewCareer("");
      } else {
        alert("No se pudo actualizar la profesión.");
      }
    } catch {
      alert("Error al actualizar ❌"); 
    }
  };

  // Funcion para borrar la cuenta (DELETE)
  const handleDeleteAccount = async () => {
    const confirmar = window.confirm("¿Realmente quieres borrar tu cuenta?⁉️ No hay marcha atrás.");
    if (!confirmar) return;

    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/delete`, {
        method: 'DELETE',
        headers: { 'x-auth-token': token }
      });
      if (response.ok) {
        alert("Cuenta eliminada con éxito. 👋");
        localStorage.removeItem('token');
        navigate('/');
      }
    } catch {
      alert("Error al intentar eliminar la cuenta.");
    }
  };

  return (
    <div className="card">
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

      {/* CONFIGURACIÓN (UPDATE) */}
      <h3>Configuración de Perfil ⚙️</h3>
      <form onSubmit={handleUpdateCareer} className="user-form">
        <input 
          placeholder="Nueva profesión..." 
          value={newCareer} 
          onChange={(e) => setNewCareer(e.target.value)} 
          required 
        />
        <button type="submit" style={{ backgroundColor: '#007bff' }}>
          Actualizar Profesión
        </button>
      </form>

      {/* BOTÓN PARA BORRAR CUENTA (DELETE) */}
      <button 
        onClick={handleDeleteAccount}
        style={{ backgroundColor: '#dc3545', marginTop: '10px', fontSize: '0.8rem' }}
      >
        Eliminar mi cuenta
      </button>

      <hr />
      
      <button 
        onClick={() => { localStorage.removeItem('token'); navigate('/'); }}
        style={{ backgroundColor: '#6c757d', marginTop: '20px' }}
      >
        Cerrar Sesión
      </button>
    </div>
  )
}

export default Dashboard