import { useState } from "react";

function AgregarPelicula() {
  const [imagenPreview, setImagenPreview] = useState(null);
  const [mostrarAlerta, setMostrarAlerta] = useState(false);

  const handleImagenChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagenPreview(URL.createObjectURL(file));
    }
  };

  const handleGuardar = () => {
    // Aquí iría tu lógica para guardar los datos
    setMostrarAlerta(true);
    setTimeout(() => setMostrarAlerta(false), 3000);
  };

  return (
    <div
      className="modal fade"
      id="modalAgregarPelicula"
      tabIndex="-1"
      aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
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
            {/* Alerta Bootstrap */}
            {mostrarAlerta && (
              <div className="alert alert-success" role="alert">
                Película guardada correctamente.
              </div>
            )}

            {/* Imagen de portada */}
            {imagenPreview && (
              <img
                src={imagenPreview}
                className="img-thumbnail mb-3"
                alt="Portada"
              />
            )}

            {/* Subir imagen */}
            <div className="mb-3">
              <label htmlFor="formFile" className="form-label">
                Subir imagen desde PC
              </label>
              <input
                className="form-control"
                type="file"
                id="formFile"
                onChange={handleImagenChange}
              />
            </div>

            {/* Nombre */}
            <div className="mb-3">
              <label className="form-label">Nombre de la película</label>
              <input type="text" className="form-control" />
            </div>

            {/* Calificación */}
            <div className="mb-3">
              <label className="form-label">Calificación</label>
              <input type="number" className="form-control" step="0.1" />
            </div>

            {/* Descripción con validación */}
            <div className="mb-3">
              <label htmlFor="validationTextarea" className="form-label">
                Descripción
              </label>
              <textarea
                className="form-control"
                id="validationTextarea"
                placeholder="Agrega una descripción de la película"
                required></textarea>
              <div className="invalid-feedback">
                Por favor, escribe una descripción.
              </div>
            </div>

            {/* Fecha */}
            <div className="mb-3">
              <label className="form-label">Fecha de publicación</label>
              <input type="date" className="form-control" />
            </div>

            {/* Duración */}
            <div className="mb-3">
              <label className="form-label">Duración (minutos)</label>
              <input type="number" className="form-control" />
            </div>

            {/* Géneros */}
            <div className="mb-3">
              <label className="form-label">Géneros</label>
              <div className="d-flex flex-wrap gap-2">
                {[
                  "Acción",
                  "Animación",
                  "Aventura",
                  "Ciencia ficción",
                  "Comedia",
                  "Crimen",
                  "Documental",
                  "Drama",
                  "Familiar / Infantil",
                  "Fantasía",
                  "Romance",
                  "Suspenso",
                  "Terror",
                ].map((genero, index) => (
                  <div key={index} className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={`genero-${index}`}
                      value={genero}
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`genero-${index}`}>
                      {genero}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Tráiler */}
            <div className="mb-3">
              <label className="form-label">Enlace del tráiler (YouTube)</label>
              <input type="url" className="form-control" />
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal">
              Cerrar
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
  );
}

export default AgregarPelicula;
