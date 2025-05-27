// components/SeriesAdmin.jsx
import { useState } from "react";
import { useSeries } from "../hooks/useSeries";
import { useEliminarSerie } from "../hooks/useEliminarSerie";
import ConfirmarEliminar from "../components/modals/ConfirmarAccion";
import AgregarSerie from "../components/modals/AgregarSerie";
import AgregarCapitulo from "../components/modals/AgregarTemporada";

function SeriesAdmin() {
  const { series, loading, error, refetch } = useSeries();
  const {
    eliminarSerie,
    loading: eliminarLoading,
    error: eliminarError,
  } = useEliminarSerie(refetch);

  const [serieSeleccionada, setSerieSeleccionada] = useState("");
  const [serieAEliminar, setSerieAEliminar] = useState(null);

  const handleSerieAgregada = () => {
    refetch();
  };

  const handleTemporadaAgregada = () => {
    refetch();
  };

  if (loading) return <p>Cargando series...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="min-vh-100 px-3 py-5">
      <div className="d-flex justify-content-around align-items-center mb-5">
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

        <button
          className="btn btn-dark"
          data-bs-toggle="modal"
          data-bs-target="#modalAgregarSerie"
          type="button">
          Agregar Serie
        </button>
      </div>

      <div className="accordion accordion-flush" id="accordionFlushExample">
        {series.map((serie) => (
          <div key={serie.id} className="accordion-item">
            <h2 className="accordion-header" id={`flush-heading-${serie.id}`}>
              <div className="d-flex align-items-center">
                <button
                  className="accordion-button collapsed flex-grow-1 border-dark bg-light"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#flush-collapse-${serie.id}`}
                  aria-expanded="false"
                  aria-controls={`flush-collapse-${serie.id}`}
                  style={{ gap: "15px" }}>
                  <img
                    src={serie.imagen}
                    className="img-thumbnail"
                    alt={serie.titulo}
                    style={{ width: "80px", height: "auto" }}
                  />
                  <span className="fw-semibold">{serie.titulo}</span>
                  <span className="ms-auto">
                    Categoría: <strong>{serie.categoria}</strong>
                  </span>
                </button>
              </div>
            </h2>

            <div
              id={`flush-collapse-${serie.id}`}
              className="accordion-collapse collapse"
              aria-labelledby={`flush-heading-${serie.id}`}
              data-bs-parent="#accordionFlushExample">
              <div className="accordion-body">
                <p>{serie.descripcion}</p>
                <p>Rating: {serie.rating}</p>
                <p>
                  Año:{" "}
                  {serie.anioInicio
                    ? serie.anioInicio +
                      (serie.anioFin ? ` - ${serie.anioFin}` : " - En emisión")
                    : "Sin información"}
                </p>

                <div className="d-grid gap-2 col-12 col-md-4 mx-auto mt-3">
                  <button
                    className="btn btn-primary"
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#modalAgregarCapitulo"
                    onClick={() => setSerieSeleccionada(serie.titulo)}>
                    Agregar temporada
                  </button>

                  <button
                    className="btn btn-danger"
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#modalEliminar"
                    onClick={() => setSerieAEliminar(serie)}>
                    Eliminar serie
                  </button>
                </div>

                {serie.temporadas && serie.temporadas.length > 0 ? (
                  <div
                    className="accordion mt-5"
                    id={`accordionTemporadas-${serie.id}`}>
                    {serie.temporadas.map((temporada) => (
                      <div className="accordion-item" key={temporada.numero}>
                        <h2
                          className="accordion-header"
                          id={`headingTemporada-${serie.id}-${temporada.numero}`}>
                          <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={`#collapseTemporada-${serie.id}-${temporada.numero}`}
                            aria-expanded="false"
                            aria-controls={`collapseTemporada-${serie.id}-${temporada.numero}`}>
                            Temporada {temporada.numero}
                          </button>
                        </h2>
                        <div
                          id={`collapseTemporada-${serie.id}-${temporada.numero}`}
                          className="accordion-collapse collapse"
                          aria-labelledby={`headingTemporada-${serie.id}-${temporada.numero}`}
                          data-bs-parent={`#accordionTemporadas-${serie.id}`}>
                          <div className="accordion-body">
                            <table className="table">
                              <thead>
                                <tr>
                                  <th>#</th>
                                  <th>Título</th>
                                  <th>Fecha</th>
                                  <th>Rating</th>
                                </tr>
                              </thead>
                              <tbody>
                                {temporada.episodios.map((episodio) => (
                                  <tr key={episodio.numero}>
                                    <td>{episodio.numero}</td>
                                    <td>{episodio.titulo}</td>
                                    <td>{episodio.fecha}</td>
                                    <td>{episodio.rating}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No hay temporadas disponibles</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modales */}
      <AgregarSerie onSerieAgregada={handleSerieAgregada} />
      <AgregarCapitulo
        nombreSerie={serieSeleccionada}
        onTemporadaAgregada={handleTemporadaAgregada}
      />

      <ConfirmarEliminar
        pelicula={serieAEliminar}
        onConfirm={() => eliminarSerie(serieAEliminar.id)}
      />
      {eliminarLoading && <p>Eliminando serie...</p>}
      {eliminarError && <p>Error al eliminar: {eliminarError}</p>}
    </div>
  );
}

export default SeriesAdmin;
