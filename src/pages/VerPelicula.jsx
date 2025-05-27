import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { obtenerPeliculaPorId } from "../services/peliculasService";
import { useTrailer } from "../hooks/useTrailer";

function VerPelicula() {
  const { id } = useParams();
  const [pelicula, setPelicula] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await obtenerPeliculaPorId(id);
        setPelicula(data);
      } catch (err) {
        console.error(err);
        setError("Película no encontrada");
      }
    }

    fetchData();
  }, [id]);

  const { trailerUrl, errorTrailer } = useTrailer(pelicula?.titulo);

  if (error) {
    return (
      <div className="min-vh-100 bg-black p-4 text-white text-center">
        {error}
      </div>
    );
  }

  if (!pelicula) {
    return (
      <div className="min-vh-100 bg-black p-4 text-white text-center">
        Cargando película...
      </div>
    );
  }

  return (
    <div className="min-vh-100 bg-black p-4">
      <div className="d-flex mb-5">
        <div className="me-5 mb-3" style={{ minWidth: "250px" }}>
          <img
            src={pelicula.portada}
            className="img-thumbnail"
            alt={pelicula.titulo}
          />
        </div>

        <div className="flex-grow-1">
          <h3 className="text-white display-4">{pelicula.titulo}</h3>
          <p className="text-white fs-4">⭐ {pelicula.rating}/10</p>
          <p className="fs-4 text-white">{pelicula.descripcion}</p>
          <p className="text-white mb-1">
            <strong>Año:</strong> {pelicula.anio}
          </p>
          <p className="text-white mb-1">
            <strong>Duración:</strong> {pelicula.duracion} min
          </p>
          <p className="text-white mb-1">
            <strong>Género:</strong> {pelicula.categoria}
          </p>
          <p className="text-white mb-1">
            <strong>Actores:</strong> {pelicula.actores?.join(", ")}
          </p>
          <p className="text-white mb-1">
            <strong>Directores:</strong> {pelicula.directores?.join(", ")}
          </p>
        </div>
      </div>

      <div className="ratio ratio-16x9">
        {trailerUrl ? (
          <iframe
            src={trailerUrl}
            title="YouTube video"
            allowFullScreen></iframe>
        ) : (
          <p className="text-white">{errorTrailer || "Cargando tráiler..."}</p>
        )}
      </div>
    </div>
  );
}

export default VerPelicula;
