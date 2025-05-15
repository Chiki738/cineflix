import tronos from "../assets/img/tronos.jpg";
import ConfirmarEliminar from "../components/modals/ConfirmarAccion";
import AgregarSerie from "../components/modals/AgregarSerie";
import EditarPelicula from "../components/modals/EditarPelicula";

function PeliculasAdmin() {
  return (
    <div className="min-vh-100 px-3 py-5">
      <div className="d-flex justify-content-around align-items-center mb-5">
        {/* Buscador */}
        <form
          className="d-flex w-50"
          role="search"
          onSubmit={(e) => e.preventDefault()}>
          <input
            className="form-control me-2"
            type="search"
            placeholder="Buscar"
            aria-label="Buscar"
          />
          <button className="btn btn-outline-success" type="submit">
            Buscar
          </button>
        </form>

        {/* Botón Agregar */}
        <button
          className="btn btn-dark"
          data-bs-toggle="modal"
          data-bs-target="#modalAgregarSerie"
          type="button">
          Agregar Serie
        </button>
      </div>

      <div className="accordion accordion-flush" id="accordionFlushExample">
        {/* Película 1 */}
        <div className="accordion-item">
          <h2 className="accordion-header" id="flush-headingOne">
            <button
              className="accordion-button collapsed d-flex align-items-center"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseOne"
              aria-expanded="false"
              aria-controls="flush-collapseOne"
              style={{ gap: "15px" }}>
              <img
                src={tronos}
                className="img-thumbnail"
                alt="Juego de tronos"
                style={{ width: "80px", height: "auto" }}
              />
              <span className="flex-grow-1 fw-semibold">Juego de tronos</span>
              <span>
                Cantidad de temporadas: <strong>8</strong>
              </span>
              <div className="d-flex gap-2 px-3 py-2">
                <button
                  className="btn btn-warning btn-sm"
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#modalEditar">
                  Editar
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#modalEliminar">
                  Eliminar serie
                </button>
              </div>
            </button>
          </h2>

          {/* Botones fuera del acordeón */}
          <div
            id="flush-collapseOne"
            className="accordion-collapse collapse"
            aria-labelledby="flush-headingOne"
            data-bs-parent="#accordionFlushExample">
            <div className="accordion-body">
              <button className="btn btn-primary mb-3" type="button">
                Agregar capítulo
              </button>

              {/* Sub-acordeón de temporadas */}
              <div
                className="accordion accordion-flush"
                id="accordionFlushTemporadasOne">
                <div className="accordion-item">
                  <h2 className="accordion-header" id="flush-temporada1">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapseTemporada1"
                      aria-expanded="false"
                      aria-controls="flush-collapseTemporada1">
                      Temporada 1
                    </button>
                  </h2>
                  <div
                    id="flush-collapseTemporada1"
                    className="accordion-collapse collapse"
                    aria-labelledby="flush-temporada1"
                    data-bs-parent="#accordionFlushTemporadasOne">
                    <div className="accordion-body p-0">
                      <table className="table mb-0">
                        <thead className="table-light">
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">Título</th>
                            <th scope="col">Video</th>
                            <th scope="col">Botones</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th scope="row">1</th>
                            <td>Winter Is Coming</td>
                            <td>Transformers.mp4</td>
                            <td className="d-flex flex-column align-items-center gap-2">
                              <button
                                className="btn btn-success w-100"
                                type="button"
                                data-bs-toggle="modal"
                                data-bs-target="#modalEditar">
                                EDITAR
                              </button>
                              <button
                                className="btn btn-danger w-100"
                                type="button"
                                data-bs-toggle="modal"
                                data-bs-target="#modalEliminar">
                                ELIMINAR
                              </button>
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">2</th>
                            <td>The Kingsroad</td>
                            <td>Transformers.mp4</td>
                            <td className="d-flex flex-column align-items-center gap-2">
                              <button
                                className="btn btn-success w-100"
                                type="button"
                                data-bs-toggle="modal"
                                data-bs-target="#modalEditar">
                                EDITAR
                              </button>
                              <button
                                className="btn btn-danger w-100"
                                type="button"
                                data-bs-toggle="modal"
                                data-bs-target="#modalEliminar">
                                ELIMINAR
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              {/* Fin sub-acordeón */}
            </div>
          </div>
        </div>
      </div>

      {/* Modales */}
      <AgregarSerie />
      <EditarPelicula />
      <ConfirmarEliminar />
    </div>
  );
}

export default PeliculasAdmin;
