import { useEditarPelicula } from "../../hooks/useEditarPelicula";
import { actualizarPelicula } from "../../services/editarPeliculaService";
import { useEffect, useRef, useState } from "react";

function EditarPelicula({ pelicula, onActualizar }) {
  const { formData, handleChange, camposModificados, setCamposModificados } =
    useEditarPelicula(pelicula, onActualizar);

  const [mostrarAlerta, setMostrarAlerta] = useState(false);
  const modalRef = useRef(null);
  const [actualizado, setActualizado] = useState(false);

  const handleActualizar = async () => {
    try {
      await actualizarPelicula(formData);
      setCamposModificados(new Set());
      setActualizado(true); // Marca que hubo actualización
      onActualizar?.();
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  useEffect(() => {
    if (!modalRef.current) return;

    const modalEl = modalRef.current;

    const handleModalClosed = () => {
      if (actualizado) {
        setMostrarAlerta(true);
        setTimeout(() => setMostrarAlerta(false), 3000);
        setActualizado(false); // Reiniciar flag para siguiente edición
      }
    };

    modalEl.addEventListener("hidden.bs.modal", handleModalClosed);

    return () => {
      modalEl.removeEventListener("hidden.bs.modal", handleModalClosed);
    };
  }, [actualizado]);

  return (
    <>
      {mostrarAlerta && (
        <div
          className="alert alert-success text-center"
          role="alert"
          style={{
            position: "fixed",
            top: 20,
            right: 20,
            zIndex: 1055,
            minWidth: "250px",
          }}>
          Película actualizada correctamente.
        </div>
      )}

      <div
        className="modal fade"
        id="modalEditar"
        tabIndex="-1"
        aria-labelledby="modalEditarLabel"
        aria-hidden="true"
        ref={modalRef}>
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="modalEditarPeliculaLabel">
                Editar Película
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Cerrar"></button>
            </div>

            {formData.portada && (
              <img
                src={formData.portada}
                className="img-thumbnail mb-3 mx-auto d-block"
                alt="Portada"
                style={{ maxHeight: "300px" }}
              />
            )}

            <div className="modal-body">
              {/* ID */}
              <div className="mb-3">
                <label htmlFor="id" className="form-label">
                  ID
                </label>
                <input
                  type="text"
                  id="id"
                  name="id"
                  className="form-control"
                  value={formData.id}
                  onChange={handleChange}
                />
              </div>

              {/* Título */}
              <div className="mb-3">
                <label htmlFor="titulo" className="form-label">
                  Título
                </label>
                <input
                  type="text"
                  id="titulo"
                  name="titulo"
                  className="form-control"
                  value={formData.titulo}
                  onChange={handleChange}
                />
              </div>

              {/* Descripción */}
              <div className="mb-3">
                <label htmlFor="descripcion" className="form-label">
                  Descripción
                </label>
                <textarea
                  id="descripcion"
                  name="descripcion"
                  className="form-control"
                  value={formData.descripcion}
                  onChange={handleChange}
                />
              </div>

              {/* Duración */}
              <div className="mb-3">
                <label htmlFor="duracion" className="form-label">
                  Duración (minutos)
                </label>
                <input
                  type="number"
                  id="duracion"
                  name="duracion"
                  className="form-control"
                  value={formData.duracion}
                  onChange={handleChange}
                />
              </div>

              {/* Año */}
              <div className="mb-3">
                <label htmlFor="anio" className="form-label">
                  Año
                </label>
                <input
                  type="text"
                  id="anio"
                  name="anio"
                  className="form-control"
                  value={formData.anio}
                  onChange={handleChange}
                />
              </div>

              {/* Categoría */}
              <div className="mb-3">
                <label htmlFor="categoria" className="form-label">
                  Categoría
                </label>
                <input
                  type="text"
                  id="categoria"
                  name="categoria"
                  className="form-control"
                  value={formData.categoria}
                  onChange={handleChange}
                />
              </div>

              {/* Actores */}
              <div className="mb-3">
                <label htmlFor="actores" className="form-label">
                  Actores (separados por coma)
                </label>
                <input
                  type="text"
                  id="actores"
                  name="actores"
                  className="form-control"
                  value={formData.actores}
                  onChange={handleChange}
                />
              </div>

              {/* Directores */}
              <div className="mb-3">
                <label htmlFor="directores" className="form-label">
                  Directores (separados por coma)
                </label>
                <input
                  type="text"
                  id="directores"
                  name="directores"
                  className="form-control"
                  value={formData.directores}
                  onChange={handleChange}
                />
              </div>

              {/* Rating */}
              <div className="mb-3">
                <label htmlFor="rating" className="form-label">
                  Rating
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="10"
                  id="rating"
                  name="rating"
                  className="form-control"
                  value={formData.rating}
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
                onClick={handleActualizar}
                disabled={camposModificados.size === 0}>
                Guardar Cambios
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditarPelicula;
