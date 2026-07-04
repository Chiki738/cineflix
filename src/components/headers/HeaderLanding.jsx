import { Link } from "react-router-dom";
import "../../assets/styles/HeaderLanding.css";
import { Clapperboard } from "lucide-react";

function HeaderLanding() {
  return (
    <header
      className="main-header navbar px-2 px-sm-3"
      data-bs-theme="dark">
      <Link to="/" className="brand-mark text-decoration-none d-inline-flex align-items-center gap-2">
        <Clapperboard size={30} />
        <span>CineFlix</span>
      </Link>

      <Link
        to="/Login"
        className="btn btn-cine px-sm-4 py-sm-2 py-1 px-3">
        Iniciar sesión
      </Link>
    </header>
  );
}

export default HeaderLanding;
