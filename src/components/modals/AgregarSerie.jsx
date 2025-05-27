import { useAgregarSerie } from "../../hooks/useAgregarSerie";

function AgregarSerie({ onSerieAgregada }) {
  const {
    id,
    setId,
    titulo,
    setTitulo,
    sugerencias,
    buscarSugerencias,
    seleccionarSerie,
    serie,
    imagenPreview,
    mostrarAlerta,
    handleGuardar,
    yearInicio,
    setYearInicio,
    yearFin,
    setYearFin,
    generoManual, // <-- incluir género manual
    setGeneroManual, // <-- incluir setter
  } = useAgregarSerie(onSerieAgregada);

  return (
    <>
      {mostrarAlerta && (
        <div
          className="alert alert-success text-center"
          role="alert"
          style={{ position: "fixed", top: 20, right: 20, zIndex: 1055 }}>
          Serie guardada correctamente.
        </div>
      )}

      <div
        className="modal fade"
        id="modalAgregarSerie"
        tabIndex="-1"
        aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Agregar Serie</h5>
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
                <label className="form-label">Nombre de la serie</label>
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
                        onClick={() => seleccionarSerie(item.Title)}>
                        {item.Title}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label">Descripción</label>
                <textarea
                  className="form-control"
                  value={serie.Plot || ""}
                  readOnly
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Año de inicio</label>
                <input
                  type="number"
                  min="1900"
                  max={new Date().getFullYear()}
                  className="form-control"
                  value={yearInicio}
                  onChange={(e) => setYearInicio(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Año de finalización</label>
                <input
                  type="number"
                  min="1900"
                  max={new Date().getFullYear()}
                  className="form-control"
                  value={yearFin}
                  onChange={(e) => setYearFin(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Rating</label>
                <input
                  type="text"
                  className="form-control"
                  value={serie.imdbRating || ""}
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
                        checked={generoManual === genero} // <-- aquí
                        onChange={(e) => setGeneroManual(e.target.value)} // <-- aquí
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

export default AgregarSerie;
