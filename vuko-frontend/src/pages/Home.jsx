import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Home({ serverStatus }) {
  const navigate = useNavigate()

  // Estado para el registro 
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    password: '',
    career: '' 
  })
 
  // Estado para el Login
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  })

  // Funcion para el registro
  const handleChange = (e) =>{
    setFormData({...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/register`, {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await response.json(); 
      if (response.ok) {
        alert("¡Usuario registrado con éxito! 🎉");        
        setFormData({ name: '', email: '', password: '', career: '' });       
      } else {
        const errorMsg = result.msg || (result.errors && result.errors[0].msg) || "Algo salio mal";
        alert("Error del servidor: " + errorMsg);
      }
    } catch {
      alert("No se pudo conectar con el servidor.");
    }
  };
 
  // Funcion para el Login
  const handleLoginChange = (e) => {
    setLoginData({...loginData, [e.target.name]: e.target.value});
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try{
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),        
      });
      const result = await response.json();
      if (response.ok){
        alert("¡Bienvenido de Nuevo! 🔓");        
        localStorage.setItem('token', result.token);
        navigate('/dashboard'); 
      } else {
        alert("Error de login: " + (result.msg || "Credenciales invalidas"));
      }
    } catch {
      alert("Error al intentar iniciar sesion.");
    }    
  };

  return (
    <div className="card">
      <h1>VUKO.ai - Registro 🚀</h1>
      <form className='user-form' onSubmit={handleSubmit}>
        <input name='name' placeholder='Tu nombre' value={formData.name} onChange={handleChange} required />
        <input type='email' name='email' placeholder='Tu correo' value={formData.email} onChange={handleChange} required />
        <input type='password' name='password' placeholder='Tu contraseña' value={formData.password} onChange={handleChange} required />
        <input name='career' placeholder='Tu profesión' value={formData.career} onChange={handleChange} required />
        <button type='submit'>Registrar Usuario</button>
      </form>

      <hr />

      <h2>Iniciar Sesión 🔑</h2>
      <form className='user-form' onSubmit={handleLoginSubmit}>
        <input type='email' name='email' placeholder='Correo' value={loginData.email} onChange={handleLoginChange} required />
        <input type='password' name='password' placeholder='Contraseña' value={loginData.password} onChange={handleLoginChange} required />
        <button type='submit' style={{ backgroundColor: '#28a745' }}>Entrar</button>
      </form>

      <hr />
      {serverStatus ? (
        <p className="status">Conectado a: {serverStatus.author}</p>
      ) : (
        <p>Conectando...</p>
      )}
    </div>
  )
}

export default Home