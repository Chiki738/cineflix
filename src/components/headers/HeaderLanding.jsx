import { Link } from "react-router-dom";
import "../../assets/styles/HeaderLanding.css";

function HeaderLanding() {
  return (
    <header
      className="navbar bg-dark border-bottom border-body px-2 px-sm-3"
      data-bs-theme="dark">
      <Link to={"/"} className="text-decoration-none">
        <h1 style={{ color: "#3DE3C2" }} className="display-6 fw-bold mb-0">
          CINEFLIX
        </h1>
      </Link>

      <Link
        to="/Login"
        className="btnLogin btn px-sm-4 py-sm-1 py-0 px-2 text-dark fw-bold rounded-3 border-success">
        Iniciar sesión
      </Link>
    </header>
  );
}

export default HeaderLanding;
