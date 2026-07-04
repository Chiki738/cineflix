import { Link } from "react-router-dom";

function Landing() {
  return (
    <section className="landing-page d-flex align-items-center">
      <div className="container py-5">
        <div className="col-12 col-lg-7">
          <p className="section-kicker mb-3">Streaming personalizado</p>
          <h1 className="text-white fw-black display-2 fw-bold mb-3">
            CineFlix
          </h1>
          <h2 className="text-white h1 fw-bold mb-3">
            Películas, series y estrenos para ver sin perder tiempo buscando.
          </h2>
          <p className="text-muted-soft fs-5 mb-4">
            Explora por género, guarda tu lista, retoma tu historial y encuentra
            contenido para cada momento.
          </p>

          <Link
            to="/Registro"
            className="btn btn-cine px-sm-4 px-3 py-2 fs-5">
            Crear cuenta
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Landing;
