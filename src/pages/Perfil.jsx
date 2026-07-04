import { Link, Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import CambiarFoto from "../components/modals/CambiarFoto";
import { Camera } from "lucide-react";
import { getStoredUser } from "../utils/storage";

function Perfil() {
  const location = useLocation();
  const [mostrarModal, setMostrarModal] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(getStoredUser());
  }, []);

  return (
    <main className="page-shell">
      <div className="d-flex flex-column justify-content-center align-items-center gap-4">
        <img
          src={user?.foto}
          className="img-fluid rounded-circle"
          alt="Perfil"
          style={{ width: "150px", height: "150px", objectFit: "cover" }}
        />
        <button
          className="btn btn-cine d-inline-flex align-items-center gap-2"
          onClick={() => setMostrarModal(true)}>
          <Camera size={18} />
          Cambiar foto
        </button>
        {user && (
          <p className="text-muted-soft">
            Miembro desde{" "}
            {new Date(user.fechaCreacionCuenta).toLocaleDateString("es-PE", {
              year: "numeric",
              month: "long",
            })}
          </p>
        )}
      </div>

      <div
        className="profile-tabs text-center py-3 px-3 mx-auto app-surface"
        style={{ maxWidth: "820px" }}>
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

      {mostrarModal && (
        <CambiarFoto
          onClose={() => setMostrarModal(false)}
          onFotoActualizada={(urlNuevaFoto) => {
            setUser((currentUser) =>
              currentUser ? { ...currentUser, foto: urlNuevaFoto } : currentUser
            );
            setMostrarModal(false);
          }}
        />
      )}

      <div className="px-3 py-4">
        <Outlet />
      </div>
    </main>
  );
}

export default Perfil;
