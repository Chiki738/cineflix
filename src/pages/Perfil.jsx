import { Link, Outlet } from "react-router-dom";
import perfilImg from "../assets/img/perfil.jpg";

function Perfil() {
  return (
    <div className="bg-black p-5 min-vh-100">
      <div className=" d-flex flex-column justify-content-center align-items-center gap-4">
        <img
          src={perfilImg}
          className="img-fluid rounded-circle"
          alt="perfil"
        />
        <button className="btn btn-primary">CAMBIAR FOTO</button>
        <p>Miembro desde Enero 2025</p>
      </div>

      <div className="container text-center">
        <div className="row">
          <div className="col">
            <Link
              to="Informacion"
              className="btnSeleccionar btn px-sm-4 py-sm-1 px-2 fw-bold text-white rounded-3 border-success">
              Seleccionar Información
            </Link>
          </div>
          <div className="col">
            <Link
              to="Historial"
              className="btnSeleccionar btn px-sm-4 py-sm-1 px-2 fw-bold text-white rounded-3 border-success">
              Seleccionar Historial
            </Link>
          </div>
          <div className="col">
            <Link
              to="Lista"
              className="btnSeleccionar btn px-sm-4 py-sm-1 px-2 fw-bold text-white rounded-3 border-success">
              Seleccionar Lista
            </Link>
          </div>
        </div>
      </div>

      <Outlet />
    </div>
  );
}

export default Perfil;
