import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { userDelete, userUpdate } from "../services/userService";
import { Advice } from "../components/advice.component";

function Dashboard() {
  const navigate = useNavigate();

  // Estado para editar la profesion
  const [newCareer, setNewCareer] = useState("");

  // Funcion para actualizar el perfil (UPDATE)
  const handleUpdateCareer = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    userUpdate(token, newCareer, setNewCareer, Swal);
  };

  // Funcion para borrar la cuenta (DELETE)
  const handleDeleteAccount = async () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto y perderás tu acceso a VUKO!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc3545",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Sí, borrar cuenta",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const token = localStorage.getItem("token");
        userDelete(token, Swal, navigate);
      }
    });
  };
  return (
    <div className="card">
      <Advice />
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
        <button type="submit" style={{ backgroundColor: "#007bff" }}>
          Actualizar Profesión
        </button>
      </form>

      {/* BOTÓN PARA BORRAR CUENTA (DELETE) */}
      <button
        onClick={handleDeleteAccount}
        style={{
          backgroundColor: "#dc3545",
          marginTop: "10px",
          fontSize: "0.8rem",
        }}
      >
        Eliminar mi cuenta
      </button>

      <hr />

      <button
        onClick={() => {
          localStorage.removeItem("token");
          navigate("/");
        }}
        style={{ backgroundColor: "#6c757d", marginTop: "20px" }}
      >
        Cerrar Sesión
      </button>
    </div>
  );
}

export default Dashboard;
