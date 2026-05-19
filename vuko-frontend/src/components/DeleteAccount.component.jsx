import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { userDelete } from "../services/userService";

export function DeleteAccount() {
  const navigate = useNavigate();

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto y perderás tu acceso a VUKO!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc3545",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Sí, borrar cuenta",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      const token = localStorage.getItem("token");
      const response = await userDelete(token);

      if (response.ok) {
        Swal.fire("Eliminado", "Tu cuenta ha sido borrada.", "success");
        localStorage.removeItem("token");
        navigate("/");
      } else {
        Swal.fire("Error", "No pudimos borrar la cuenta", "error");
      }
    }
  };

  return (
    <div>
      <button
        onClick={handleDelete}
        style={{
          backgroundColor: "#dc3545",
          marginTop: "10px",
          fontSize: "0.8rem",
        }}
      >
        Eliminar mi cuenta
      </button>
    </div>
  );
}

// usar try catch igual que lo hice en el, home y en el uptdateForm
 