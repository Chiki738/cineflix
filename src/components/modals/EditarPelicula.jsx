import React, { useState, useEffect } from "react";
import * as bootstrap from 'bootstrap';

function EditarPelicula({ pelicula, onActualizar }) {
  const [formData, setFormData] = useState({
    id: "",
    titulo: "",
    descripcion: "",
    duracion: "",
    anio: "",
    actores: "",
    directores: "",
    rating: "",
    categoria: "",
    youtubeUrl: "",
  });

  const [camposModificados, setCamposModificados] = useState(new Set());

  useEffect(() => {
    if (pelicula) {
      setFormData({
        id: pelicula.id || "",
        titulo: pelicula.titulo || "",
        descripcion: pelicula.descripcion || "",
        duracion: pelicula.duracion ? String(pelicula.duracion) : "",
        anio: pelicula.anio || "",
        actores: (pelicula.actores || []).join(", "),
        directores: (pelicula.directores || []).join(", "),
        rating: pelicula.rating ? String(pelicula.rating) : "",
        categoria: pelicula.categoria || "",
        youtubeUrl: pelicula.youtubeUrl || "",
      });
      setCamposModificados(new Set());
    }
  }, [pelicula]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setCamposModificados((prev) => new Set(prev).add(name));
  };

  const actualizarPelicula = async () => {
    if (camposModificados.size === 0) {
      alert("No has hecho cambios para actualizar.");
      return;
    }

    const dataActualizar = {
      ...formData,
      duracion: parseInt(formData.duracion),
      anio: parseInt(formData.anio),
      rating: parseFloat(formData.rating),
      actores: formData.actores.split(",").map((a) => a.trim()),
      directores: formData.directores.split(",").map((d) => d.trim()),
    };

    try {
      const response = await fetch(
        `http://localhost:8080/api/peliculas/${formData.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dataActualizar),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Película actualizada con éxito");
        setCamposModificados(new Set());

        // ✅ Cerrar el modal usando la API de Bootstrap
        const modalElement = document.getElementById("modalEditar");
        const modalInstance = bootstrap.Modal.getInstance(modalElement);
        modalInstance?.hide();

        // ✅ Llamar función para refrescar la lista en el componente padre
        onActualizar?.();
      } else {
        alert("Error al actualizar: " + (data.message || response.statusText));
        console.error("Error detalle:", data);
      }
    } catch (error) {
      alert("Error de conexión o inesperado");
      console.error("Error catch:", error);
    }
  };

  return (
    <div
      className="modal fade"
      id="modalEditar"
      tabIndex="-1"
      aria-labelledby="modalEditarLabel"
      aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="modalEditarLabel">
              Editar Película
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Cerrar"></button>
          </div>

          <div className="modal-body">
            {/* Título */}
            <div className="mb-3">
              <label className="form-label">Título</label>
              <input
                type="text"
                name="titulo"
                className="form-control"
                value={formData.titulo}
                onChange={handleChange}
              />
            </div>

            {/* Descripción */}
            <div className="mb-3">
              <label className="form-label">Descripción</label>
              <textarea
                name="descripcion"
                className="form-control"
                rows="3"
                value={formData.descripcion}
                onChange={handleChange}></textarea>
            </div>

            {/* Duración */}
            <div className="mb-3">
              <label className="form-label">Duración (minutos)</label>
              <input
                type="number"
                name="duracion"
                className="form-control"
                value={formData.duracion}
                onChange={handleChange}
                min="0"
              />
            </div>

            {/* Año */}
            <div className="mb-3">
              <label className="form-label">Año</label>
              <input
                type="number"
                name="anio"
                className="form-control"
                value={formData.anio}
                onChange={handleChange}
              />
            </div>

            {/* Actores */}
            <div className="mb-3">
              <label className="form-label">Actores (separados por coma)</label>
              <input
                type="text"
                name="actores"
                className="form-control"
                value={formData.actores}
                onChange={handleChange}
              />
            </div>

            {/* Directores */}
            <div className="mb-3">
              <label className="form-label">
                Directores (separados por coma)
              </label>
              <input
                type="text"
                name="directores"
                className="form-control"
                value={formData.directores}
                onChange={handleChange}
              />
            </div>

            {/* Calificación */}
            <div className="mb-3">
              <label className="form-label">Calificación</label>
              <input
                type="number"
                name="rating"
                className="form-control"
                value={formData.rating}
                onChange={handleChange}
                min="0"
                max="10"
                step="0.1"
              />
            </div>

            {/* Categoría */}
            <div className="mb-3">
              <label className="form-label">Género</label>
              <div className="d-flex flex-wrap gap-3">
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
                  <label
                    key={idx}
                    style={{ userSelect: "none", cursor: "pointer" }}>
                    <input
                      type="radio"
                      name="categoria"
                      value={genero}
                      checked={formData.categoria === genero}
                      onChange={handleChange}
                    />{" "}
                    {genero}
                  </label>
                ))}
              </div>
            </div>

            {/* Trailer */}
            <div className="mb-3">
              <label className="form-label">Enlace del tráiler (YouTube)</label>
              <input
                type="url"
                name="youtubeUrl"
                className="form-control"
                value={formData.youtubeUrl}
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
              onClick={actualizarPelicula}>
              Actualizar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditarPelicula;
