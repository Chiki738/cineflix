import { useAgregarPelicula } from "../../hooks/useAgregarPelicula";

function AgregarPelicula({ onPeliculaAgregada }) {
  const {
    id,
    setId,
    titulo,
    setTitulo,
    sugerencias,
    buscarSugerencias,
    seleccionarPelicula,
    pelicula,
    mostrarAlerta,
    generoSeleccionado,
    setGeneroSeleccionado,
    imagenPreview,
    actores,
    setActores,
    directores,
    setDirectores,
    rating,
    setRating,
    handleGuardar,
  } = useAgregarPelicula(onPeliculaAgregada);

  return (
    <>
      {mostrarAlerta && (
        <div
          className="alert alert-success text-center"
          role="alert"
          style={{ position: "fixed", top: 20, right: 20, zIndex: 1055 }}>
          Película guardada correctamente.
        </div>
      )}

      <div
        className="modal fade"
        id="modalAgregarPelicula"
        tabIndex="-1"
        aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Agregar Película</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {imagenPreview && (
                <img
                  src={imagenPreview}
                  className="img-thumbnail mb-3 mx-auto d-block"
                  alt="Portada"
                  style={{ maxHeight: "300px" }}
                />
              )}

              <div className="mb-3">
                <label className="form-label">ID</label>
                <input
                  type="text"
                  className="form-control"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                />
              </div>

              <div className="mb-3 position-relative">
                <label className="form-label">Nombre de la película</label>
                <input
                  type="text"
                  className="form-control"
                  value={titulo}
                  onChange={(e) => {
                    setTitulo(e.target.value);
                    buscarSugerencias(e.target.value);
                  }}
                />
                {sugerencias.length > 0 && (
                  <ul
                    className="list-group"
                    style={{
                      position: "absolute",
                      top: "100%",
                      zIndex: 1000,
                      width: "100%",
                    }}>
                    {sugerencias.map((item, index) => (
                      <li
                        key={index}
                        className="list-group-item list-group-item-action bg-light"
                        style={{ cursor: "pointer" }}
                        onClick={() => seleccionarPelicula(item.Title)}>
                        {item.Title} ({item.Year})
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label">Descripción</label>
                <textarea
                  className="form-control"
                  value={pelicula.descripcion || ""}
                  readOnly
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Duración (minutos)</label>
                <input
                  type="number"
                  className="form-control"
                  value={pelicula.duracion || ""}
                  readOnly
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Año</label>
                <input
                  type="text"
                  className="form-control"
                  value={pelicula.anio || ""}
                  readOnly
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Categoría</label>
                <div className="d-flex flex-wrap gap-2">
                  {[
                    "Acción",
                    "Animación",
                    "Biográfico",
                    "Ciencia Ficción",
                    "Comedia",
                    "Crimen",
                    "Documental",
                    "Drama",
                    "Infantil",
                    "Fantasia",
                    "Romance",
                    "Suspenso",
                    "Terror",
                  ].map((genero, index) => (
                    <div key={index} className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="categoria"
                        id={`categoria-${index}`}
                        value={genero}
                        checked={generoSeleccionado === genero}
                        onChange={(e) => setGeneroSeleccionado(e.target.value)}
                      />
                      <label
                        className="form-check-label"
                        htmlFor={`categoria-${index}`}>
                        {genero}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">
                  Actores (separados por coma)
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={actores.join(", ")}
                  onChange={(e) =>
                    setActores(e.target.value.split(",").map((a) => a.trim()))
                  }
                />
              </div>

              <div className="mb-3">
                <label className="form-label">
                  Directores (separados por coma)
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={directores.join(", ")}
                  onChange={(e) =>
                    setDirectores(
                      e.target.value.split(",").map((d) => d.trim())
                    )
                  }
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Rating</label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="10"
                  className="form-control"
                  value={rating}
                  onChange={(e) => setRating(parseFloat(e.target.value))}
                />
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal">
                Cancelar
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleGuardar}>
                Guardar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AgregarPelicula;
