import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser, loginUser } from "../services/userService";
import Swal from "sweetalert2";

function Home({ serverStatus }) {
  const navigate = useNavigate();

  // Estado para el registro
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    career: "",
  });

  // Estado para el Login
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  // Funcion para el registro
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { name, email, password, career } = formData;
      await registerUser(name, email, password, career);

      Swal.fire({
        title: "¡Genial!",
        text: "Usuario registrado con éxito!💪",
        icon: "success",
        confirmButtonColor: "#007bff",
        timer: 3000,
      });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Error:" + error.message,
        icon: "error",
        confirmButtonColor: "#007bff",
        timer: 3000,
      });
    }
  };

  // Funcion para el Login
  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await loginUser(loginData.email, loginData.password);
      localStorage.setItem("token", result.token);
      Swal.fire({
        title: "¡Genial!",
        text: "¡Bienvenido de Nuevo! 🔓",
        icon: "success",
        confirmButtonColor: "#28a745",
        timer: 3000,
      });
      navigate("/dashboard");
    } catch (error) {
      Swal.fire({
        title: "¡Alerta!",
        text: error.message || "Credenciales inválidas",
        icon: "error",
        confirmButtonColor: "#dc3545",
      });
    }
  };

  return (
    <div className="card">
      <h1>VUKO.ai - Registro 🚀</h1>
      <form className="user-form" onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Tu nombre"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Tu correo"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Tu contraseña"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          name="career"
          placeholder="Tu profesión"
          value={formData.career}
          onChange={handleChange}
          required
        />
        <button type="submit">Registrar Usuario</button>
      </form>

      <hr />

      <h2>Iniciar Sesión 🔑</h2>
      <form className="user-form" onSubmit={handleLoginSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Correo"
          value={loginData.email}
          onChange={handleLoginChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={loginData.password}
          onChange={handleLoginChange}
          required
        />
        <button type="submit" style={{ backgroundColor: "#28a745" }}>
          Entrar
        </button>
      </form>

      <hr />
      {serverStatus ? (
        <p className="status">Conectado a: {serverStatus.author}</p>
      ) : (
        <p>Conectando...</p>
      )}
    </div>
  );
}

export default Home;
