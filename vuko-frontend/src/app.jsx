import { useEffect, useState } from 'react'
import './App.css' 

function App() {
  const [data, setData] = useState(null)

  const [formData, setFormData] = useState({ name: '', email: '' })

  useEffect(() => {
    // Llamada a la URL de Render guardada en el .env
    fetch(import.meta.env.VITE_API_URL)
      .then((res) => res.json())
      .then((resData) => setData(resData))
      .catch((err) => console.error("Error conectando:", err))
  }, [])

  // Funcion para manejar los cambios en los inputs 
  const handleChange = (e) =>{
    setFormData({...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();

    try {
      // Petición al servidor (URL del .env + la ruta de registro)
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/register`, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json(); 
      console.log("Datos que llegan del servidor", result);
      

      if (response.ok) {
        alert("¡Usuario registrado con éxito! 🎉");        
        setFormData({ name: '', email: '' });       
      } else {
        alert("Error del servidor:" + (result.msg || "Algo salio mal"));
      }
    } catch (error) {
      console.error("Error en la conexión:", error);
      alert("No se pudo conectar con el servidor de Render.");
    }
  };

  return (
    <div className="app-container">
      <div className="card">
        <h1>VUKO.ai - Registro 🚀</h1>

        <form className='user-form' onSubmit={handleSubmit}>
          <input
          name = 'name'
          placeholder ='Tu nombre'
          value={formData.name}
          onChange = {handleChange}
          />
          <input
          name = 'email'
          placeholder='Tu correo'
          value={formData.email}
          onChange={handleChange}
          />
          <button type='submit'>Registrar Usuario</button>
        </form>

        <hr />
        {data ? (
          <p className="status">Conectado a: {data.author}</p>
        ) : (
          <p>Conectando...</p>
        )}
      </div>
    </div>
  )
}

export default App