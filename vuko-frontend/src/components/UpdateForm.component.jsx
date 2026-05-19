import { useState } from "react";
import Swal from "sweetalert2";
import { userUpdate } from "../services/userService";

export function UpdateForm() {
  const [newCareer, setNewCareer] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      await userUpdate(token, newCareer);
      Swal.fire({
        title: "¡Genial!",
        text: "Tu profesión se actualizó correctamente 💪",
        icon: "success",
        confirmButtonColor: "#007bff",
        timer: 3000,
      });
      setNewCareer("");
    } catch (error) {
      Swal.fire({
        title: "¡Alerta!",
        text: error.message || "No se pudo actualizar la profesión",
        icon: "error",
        confirmButtonColor: "#dc3545",
      });
    }
  };

  return (
    <div>
      <h3>Configuración de Perfil ⚙️</h3>
      <form onSubmit={handleSubmit} className="user-form">
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
    </div>
  );
}
