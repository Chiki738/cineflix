import { useState, useEffect } from "react";

function EditarPelicula({ pelicula }) {
  const [formData, setFormData] = useState({});
  const [isModified, setIsModified] = useState(false);

  useEffect(() => {
    if (pelicula) {
      setFormData(pelicula);
    }
  }, [pelicula]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    let newValue;

    if (type === "checkbox") {
      const currentGenres = formData.generos || [];
      newValue = checked
        ? [...currentGenres, value]
        : currentGenres.filter((g) => g !== value);
    } else if (type === "file") {
      newValue = files[0];
    } else {
      newValue = value;
    }

    setFormData({ ...formData, [name]: newValue });
    setIsModified(true);
  };

  return (
    <div className="modal fade" id="modalEditar" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Editar Película</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"></button>
          </div>
          <div className="modal-body">
            {/* Imagen de portada */}
            {formData.imagen && (
              <img
                src={
                  typeof formData.imagen === "string"
                    ? formData.imagen
                    : URL.createObjectURL(formData.imagen)
                }
                className="img-thumbnail mb-3"
                alt="Portada"
              />
            )}
            <div className="mb-3">
              <label htmlFor="formFile" className="form-label">
                Imagen
              </label>
              <input
                className="form-control"
                type="file"
                id="formFile"
                name="imagen"
                onChange={handleChange}
              />
            </div>

            {/* Nombre */}
            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input
                type="text"
                className="form-control"
                name="nombre"
                value={formData.nombre || ""}
                onChange={handleChange}
              />
            </div>

            {/* Calificación */}
            <div className="mb-3">
              <label className="form-label">Calificación</label>
              <input
                type="number"
                className="form-control"
                name="calificacion"
                step="0.1"
                value={formData.calificacion || ""}
                onChange={handleChange}
              />
            </div>

            {/* Descripción */}
            <div className="mb-3">
              <label htmlFor="descripcion" className="form-label">
                Descripción
              </label>
              <textarea
                className="form-control"
                id="descripcion"
                name="descripcion"
                value={formData.descripcion || ""}
                onChange={handleChange}></textarea>
            </div>

            {/* Fecha de publicación */}
            <div className="mb-3">
              <label className="form-label">Fecha de publicación</label>
              <input
                type="date"
                className="form-control"
                name="fecha"
                value={formData.fecha || ""}
                onChange={handleChange}
              />
            </div>

            {/* Duración */}
            <div className="mb-3">
              <label className="form-label">Duración por episodio (min)</label>
              <input
                type="number"
                className="form-control"
                name="duracion"
                value={formData.duracion || ""}
                onChange={handleChange}
              />
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
                ].map((genero, idx) => (
                  <label key={idx}>
                    <input
                      type="checkbox"
                      name="generos"
                      value={genero}
                      checked={formData.generos?.includes(genero) || false}
                      onChange={handleChange}
                    />{" "}
                    {genero}
                  </label>
                ))}
              </div>
            </div>

            {/* Enlace del tráiler */}
            <div className="mb-3">
              <label className="form-label">Enlace del tráiler (YouTube)</label>
              <input
                type="url"
                className="form-control"
                name="trailer"
                value={formData.trailer || ""}
                onChange={handleChange}
              />
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
              disabled={!isModified}>
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditarPelicula;
