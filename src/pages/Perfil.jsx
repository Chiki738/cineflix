import { Link, Outlet, useLocation } from "react-router-dom";
import { useState } from "react";
import perfilImg from "../assets/img/perfil.jpg";
import CambiarFoto from "../components/CambiarFoto";

function Perfil() {
  const location = useLocation();
  const [mostrarModal, setMostrarModal] = useState(false); // Estado del modal

  return (
    <div className="bg-black p-5 min-vh-100">
      <div className="d-flex flex-column justify-content-center align-items-center gap-4">
        <img
          src={perfilImg}
          className="img-fluid rounded-circle"
          alt="perfil"
        />
        <button
          className="btn btn-secondary text-black"
          onClick={() => setMostrarModal(true)} // Abrir modal
        >
          CAMBIAR FOTO
        </button>
        <p className="text-white">Miembro desde Enero 2025</p>
      </div>

      <div
        className="container text-center bs-tertiary-color-rgb py-3 px-5 rounded-3"
        style={{ backgroundColor: "#212529" }}>
        {/* Fondo gris oscuro */}
        <div className="row">
          <Link
            to="Informacion"
            className={`col btn fw-bold rounded-3 px-1 py-2${
              location.pathname.includes("/Perfil/Informacion")
                ? " bg-white text-dark"
                : " text-white bg-transparent"
            }`}>
            Información
          </Link>
          <Link
            to="Historial"
            className={`col btn fw-bold rounded-3 px-1 py-2${
              location.pathname.includes("/Perfil/Historial")
                ? " bg-white text-dark"
                : " text-white bg-transparent"
            }`}>
            Historial
          </Link>
          <Link
            to="Lista"
            className={`col btn fw-bold rounded-3 px-1 py-2${
              location.pathname.includes("/Perfil/Lista")
                ? " bg-white text-dark"
                : " text-white bg-transparent"
            }`}>
            Lista
          </Link>
        </div>
      </div>

      {/* Modal */}
      {mostrarModal && <CambiarFoto onClose={() => setMostrarModal(false)} />}

      <div className="p-4">
        <Outlet />
      </div>
    </div>
  );
}

export default Perfil;
