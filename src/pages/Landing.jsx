import { Link } from "react-router-dom";
import "../assets/styles/Landing.css";

function Landing() {
  return (
    <div className="lading d-flex justify-content-center align-items-center text-center">
      <div>
        <h2 className="text-center text-white fw-bold">
          PELICULAS, SERIES Y MUCHO MÁS...
        </h2>

        <p className="text-white fs-sm-5 fs-6">
          ¿Quieres ver en Cineflix? Registrate y disfrutar de nuestras peliculas
          y series que tenemos.
        </p>

        <Link to="/Registro">
          <button className="btnRegistro px-sm-4 px-3 py-1 text-dark fw-bold rounded-3 border-success fs-5">
            Registrate
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Landing;
