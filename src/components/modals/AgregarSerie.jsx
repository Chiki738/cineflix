import { useState } from "react";

function AgregarSerie() {
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
      id="modalAgregarSerie"
      tabIndex="-1"
      aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
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
            {mostrarAlerta && (
              <div className="alert alert-success" role="alert">
                Serie guardada correctamente.
              </div>
            )}

            {imagenPreview && (
              <img
                src={imagenPreview}
                className="img-thumbnail mb-3"
                alt="Portada"
              />
            )}

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

            <div className="mb-3">
              <label className="form-label">Nombre de la serie</label>
              <input type="text" className="form-control" />
            </div>

            <div className="mb-3">
              <label className="form-label">Cantidad de temporadas</label>
              <input type="number" className="form-control" />
            </div>

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

export default AgregarSerie;
