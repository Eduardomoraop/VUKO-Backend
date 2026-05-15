import { Advice } from "../components/Advice.component.jsx";
import { UpdateForm } from "../components/UpdateForm.component.jsx";
import { DeleteAccount } from "../components/DeleteAccount.component.jsx";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="card">
      <Advice />
      <hr />
      <UpdateForm />
      <hr />
      <DeleteAccount />
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