import { Link } from "react-router-dom";

function PeliculasCard({ id, titulo, portada }) {
  return (
    <div
      className="card mx-3 mb-4 bg-dark"
      style={{ width: "18rem", height: "100%" }}>
      <div
        className="text-center"
        style={{ height: "250px", overflow: "hidden" }}>
        <img
          src={portada}
          alt={titulo}
          className="rounded img-fluid"
          style={{ maxHeight: "100%", objectFit: "cover" }}
        />
      </div>

      <div
        className="card-body px-1 py-3 d-flex flex-column justify-content-between"
        style={{ height: "calc(100% - 250px)" }}>
        <h5
          className="card-title text-center text-white text-break"
          style={{
            fontSize: "1rem",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }}>
          {titulo}
        </h5>

        <div className="d-flex flex-column align-items-center gap-3 mt-3">
          <button
            className="btn btn-success w-75"
            data-bs-toggle="modal"
            data-bs-target="#modalGuardarLista">
            GUARDAR EN LISTA
          </button>

          <Link to={`/peliculas/${id}`} className="btn btn-info w-75">
            VER
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PeliculasCard;
