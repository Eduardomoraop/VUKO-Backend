import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

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
      Swal.fire({
        title: '¡Alerta!',
        text: 'Primero haz login para obtener tu consejo',
        icon: 'warning',
        confirmButtonColor: '#6f42c1'
      })
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
        Swal.fire({
          title: 'Error de la IA',
          text: result.msg || 'No pudimos conectar con el asesor en este momento',
          icon: 'error',
          confirmButtonColor: '#dc3545'
        });
      }
    } catch {
      Swal.fire({
        title: 'Fallo de conexión',
        text: 'Revisa tu conexión o intenta mas tarde. VUKO esta fuera de linea',
        icon: 'error',
        confirmButtonColor: '#dc3545'
      })
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
        Swal.fire({
          title: '¡Genial!',
          text: 'Tu profesión se actualizó correctamente 💪',
          icon: 'success',
          confirmButtonColor:'#007bff',
          timer: 3000
        });
        setNewCareer("");
      } else {
        Swal.fire({
          title: '¡Alerta!',
          text: 'No se pudo actualizar la profesión',
          icon: 'error',
          confirmButtonColor: '#dc3545'
        });
      }
    } catch {
      Swal.fire('Error', 'Hubo un fallo de conexión ❌', 'error'); 
    }
  };

  // Funcion para borrar la cuenta (DELETE)
const handleDeleteAccount = async () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esto y perderás tu acceso a VUKO!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Sí, borrar cuenta',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const token = localStorage.getItem('token');
        try {
          const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/delete`, {
            method: 'DELETE',
            headers: { 'x-auth-token': token }
          });
          if (response.ok) {
            Swal.fire('Eliminado', 'Tu cuenta ha sido borrada.', 'success');
            localStorage.removeItem('token');
            navigate('/');
          }
        } catch {
          Swal.fire('Error', 'No pudimos borrar la cuenta', 'error');
        }
      }
    });
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