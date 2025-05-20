import { useState } from "react";
import { crearPelicula } from "../../services/peliculaAgregarService";
import {
  buscarPeliculasPorNombre,
  buscarDetallesPorTitulo,
} from "../../services/omdbService";

function AgregarPelicula({ onPeliculaAgregada }) {
  const [id, setId] = useState("");
  const [titulo, setTitulo] = useState("");
  const [sugerencias, setSugerencias] = useState([]);
  const [pelicula, setPelicula] = useState({});
  const [mostrarAlerta, setMostrarAlerta] = useState(false);
  const [generoSeleccionado, setGeneroSeleccionado] = useState("");
  const [imagenPreview, setImagenPreview] = useState(null);

  const [actores, setActores] = useState([]);
  const [directores, setDirectores] = useState([]);
  const [rating, setRating] = useState(0);
  const [youtubeUrl, setYoutubeUrl] = useState("");

  const buscarSugerencias = async (query) => {
    if (query.length < 2) return setSugerencias([]);
    const resultados = await buscarPeliculasPorNombre(query);
    setSugerencias(resultados.slice(0, 5));
  };

  const seleccionarPelicula = async (tituloSeleccionado) => {
    setTitulo(tituloSeleccionado);
    const datos = await buscarDetallesPorTitulo(tituloSeleccionado);

    const actoresArray = datos.Actors
      ? datos.Actors.split(",").map((a) => a.trim())
      : [];
    const directoresArray = datos.Director
      ? datos.Director.split(",").map((d) => d.trim())
      : [];

    const peliculaFormateada = {
      titulo: datos.Title,
      descripcion: datos.Plot,
      duracion: parseInt(datos.Runtime) || 0,
      anio: datos.Year || "",
      actores: actoresArray,
      directores: directoresArray,
      rating: parseFloat(datos.imdbRating) || 0,
      portada: datos.Poster,
    };

    setPelicula(peliculaFormateada);
    setImagenPreview(peliculaFormateada.portada);
    setActores(peliculaFormateada.actores);
    setDirectores(peliculaFormateada.directores);
    setRating(peliculaFormateada.rating);
    setSugerencias([]);
  };

  const limpiarFormulario = () => {
    setId("");
    setTitulo("");
    setPelicula({});
    setGeneroSeleccionado("");
    setImagenPreview(null);
    setActores([]);
    setDirectores([]);
    setRating(0);
    setYoutubeUrl("");
    setSugerencias([]);
  };

  const handleGuardar = async () => {
    try {
      const nuevaPelicula = {
        id,
        titulo,
        portada: imagenPreview,
        descripcion: pelicula.descripcion,
        duracion: pelicula.duracion,
        anio: pelicula.anio,
        categoria: generoSeleccionado,
        actores,
        directores,
        rating,
        youtubeUrl,
      };

      await crearPelicula(nuevaPelicula);

      // Cerrar modal inmediatamente
      const botonCerrar = document.querySelector(
        "#modalAgregarPelicula .btn-close"
      );
      if (botonCerrar) botonCerrar.click();

      limpiarFormulario();

      // Esperar 1 segundo antes de mostrar alerta
      setTimeout(() => {
        setMostrarAlerta(true);

        // Ocultar alerta después de 3 segundos
        setTimeout(() => setMostrarAlerta(false), 3000);
      }, 1000);

      if (onPeliculaAgregada) {
        onPeliculaAgregada();
      }
    } catch (error) {
      console.error("Error al guardar la película:", error);
    }
  };

  return (
    <>
      {/* ALERTA FUERA DEL MODAL para que sea visible cuando el modal está cerrado */}
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

              <div className="mb-3">
                <label className="form-label">URL de YouTube (tráiler)</label>
                <input
                  type="url"
                  className="form-control"
                  placeholder="https://www.youtube.com/watch?v=..."
                  value={youtubeUrl}
                  onChange={(e) => setYoutubeUrl(e.target.value)}
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
