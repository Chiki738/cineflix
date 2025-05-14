import FotoPortada from "../assets/img/transformers.jpg";

function PeliculasCard() {
  return (
    <div className="card mx-3 mb-4" style={{ width: "18rem" }}>
      <div className="text-center">
        <img src={FotoPortada} className="rounded img-fluid" alt="Transformers" />
      </div>

      <div className="card-body">
        <h5 className="card-title text-center">Transformers</h5>

        <div className="d-flex flex-column align-items-center gap-3 mt-4">
          <button
            className="btn btn-success w-75"
            data-bs-toggle="modal"
            data-bs-target="#modalGuardarLista">
            GUARDAR EN LISTA
          </button>

          <button
            className="btn btn-info w-75"
            data-bs-toggle="modal"
            data-bs-target="#modalVerPelicula">
            VER
          </button>
        </div>
      </div>
    </div>
  );
}

export default PeliculasCard;
