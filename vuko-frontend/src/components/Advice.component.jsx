import { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { userAdvice } from "../services/userService";

export function Advice() {
  const navigate = useNavigate();

  const [advice, setAdvice] = useState("");

  const getCareerAdvice = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      Swal.fire({
        title: "¡Alerta!",
        text: "Primero haz login para obtener tu consejo",
        icon: "warning",
        confirmButtonColor: "#6f42c1",
      });
      navigate("/");
      return;
    }

    const result = await userAdvice(token);

    if (result.msg) {
      setAdvice(result.msg);
    } else {
      Swal.fire({
        title: "Error de la IA",
        text: result.msg || "No pudimos conectar con el asesor en este momento",
        icon: "error",
        confirmButtonColor: "#dc3545",
      });
    }
  };

  return (
    <>
      <h2>Tu Asesor IA 🤖</h2>
      <button
        onClick={getCareerAdvice}
        style={{ backgroundColor: "#6f42c1", color: "white", padding: "10px" }}
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
    </>
  );
}