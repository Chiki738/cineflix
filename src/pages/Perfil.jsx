import { Link, Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import CambiarFoto from "../components/modals/CambiarFoto";

function Perfil() {
  const location = useLocation();
  const [mostrarModal, setMostrarModal] = useState(false);

  // Obtener usuario desde localStorage
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  return (
    <div className="bg-black py-sm-5 px-sm-3 p-3 min-vh-100">
      <div className="d-flex flex-column justify-content-center align-items-center gap-4">
        <img
          src={user?.foto}
          className="img-fluid rounded-circle"
          alt="perfil"
          style={{ width: "150px", height: "150px", objectFit: "cover" }}
        />
        <button
          className="btn btn-secondary text-black"
          onClick={() => setMostrarModal(true)}>
          CAMBIAR FOTO
        </button>
        {user && (
          <p className="text-white">
            Miembro desde{" "}
            {new Date(user.fechaCreacionCuenta).toLocaleDateString("es-PE", {
              year: "numeric",
              month: "long",
            })}
          </p>
        )}
      </div>

      <div
        className="text-center bs-tertiary-color-rgb py-3 px-5 mx-3 rounded-3 shadow-lg"
        style={{ backgroundColor: "#212529" }}>
        <div className="row">
          <Link
            to="Informacion"
            className={`col-12 col-sm-4 btn fw-bold rounded-3 px-1 py-2${
              location.pathname.includes("/Perfil/Informacion")
                ? " bg-white text-dark"
                : " text-white bg-transparent"
            }`}>
            Información
          </Link>
          <Link
            to="Historial"
            className={`col-12 col-sm-4 btn fw-bold rounded-3 px-1 py-2${
              location.pathname.includes("/Perfil/Historial")
                ? " bg-white text-dark"
                : " text-white bg-transparent"
            }`}>
            Historial
          </Link>
          <Link
            to="Lista"
            className={`col-12 col-sm-4 btn fw-bold rounded-3 px-1 py-2${
              location.pathname.includes("/Perfil/Lista")
                ? " bg-white text-dark"
                : " text-white bg-transparent"
            }`}>
            Lista
          </Link>
        </div>
      </div>

      {mostrarModal && <CambiarFoto onClose={() => setMostrarModal(false)} />}

      <div className="px-3 py-4">
        <Outlet />
      </div>
    </div>
  );
}

export default Perfil;
