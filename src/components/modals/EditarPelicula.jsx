import React, { useEffect } from "react";
import { useEditarPelicula } from "../../hooks/useEditarPelicula";

function EditarPelicula({ peliculaSeleccionada, onActualizar }) {
  const { form, handleChange, handleSubmit } =
    useEditarPelicula(peliculaSeleccionada);

  useEffect(() => {
    const modalEl = document.getElementById("modalEditarPelicula");
    if (!modalEl) return;

    // Evento que se dispara cuando el modal se cierra
    const handleModalClose = () => {
      onActualizar(); // Actualizar tabla cuando se cierra el modal
    };

    modalEl.addEventListener("hidden.bs.modal", handleModalClose);

    // Limpieza del evento al desmontar componente
    return () => {
      modalEl.removeEventListener("hidden.bs.modal", handleModalClose);
    };
  }, [onActualizar]);

  const guardarCambios = async () => {
    await handleSubmit();
    // NO cerramos el modal aquí, el usuario lo cierra manualmente
  };

  return (
    <>
      <div
        className="modal fade"
        id="modalEditarPelicula"
        tabIndex="-1"
        aria-labelledby="modalEditarLabel"
        aria-hidden="true">
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

            <img
              className="img-thumbnail mb-3 mx-auto d-block"
              alt="Portada"
              src={form.portada || ""}
              style={{ maxHeight: "300px" }}
            />

            <div className="modal-body">
              {/* Aquí van los campos del formulario, iguales que antes */}
              <div className="mb-3">
                <label htmlFor="id" className="form-label">
                  ID
                </label>
                <input
                  type="text"
                  id="id"
                  name="id"
                  className="form-control"
                  disabled
                  value={form.id}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="titulo" className="form-label">
                  Título
                </label>
                <input
                  type="text"
                  id="titulo"
                  name="titulo"
                  className="form-control"
                  value={form.titulo}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="descripcion" className="form-label">
                  Descripción
                </label>
                <textarea
                  id="descripcion"
                  name="descripcion"
                  className="form-control"
                  value={form.descripcion}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="duracion" className="form-label">
                  Duración (minutos)
                </label>
                <input
                  type="number"
                  id="duracion"
                  name="duracion"
                  className="form-control"
                  value={form.duracion}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="anio" className="form-label">
                  Año
                </label>
                <input
                  type="text"
                  id="anio"
                  name="anio"
                  className="form-control"
                  value={form.anio}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="categoria" className="form-label">
                  Categoría
                </label>
                <input
                  type="text"
                  id="categoria"
                  name="categoria"
                  className="form-control"
                  value={form.categoria}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="actores" className="form-label">
                  Actores (separados por coma)
                </label>
                <input
                  type="text"
                  id="actores"
                  name="actores"
                  className="form-control"
                  value={form.actores}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="directores" className="form-label">
                  Directores (separados por coma)
                </label>
                <input
                  type="text"
                  id="directores"
                  name="directores"
                  className="form-control"
                  value={form.directores}
                  onChange={handleChange}
                />
              </div>

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
                  value={form.rating}
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
                onClick={guardarCambios}>
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
