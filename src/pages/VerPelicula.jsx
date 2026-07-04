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
      <div className="page-shell text-white text-center">
        {error}
      </div>
    );
  }

  if (!pelicula) {
    return (
      <div className="page-shell text-white text-center">
        Cargando película...
      </div>
    );
  }

  return (
    <main className="page-shell">
      <div className="container">
        <section className="detail-hero d-flex flex-column flex-lg-row gap-4 mb-5">
        <div className="detail-poster">
          <img
            src={pelicula.portada}
            className="img-fluid"
            alt={pelicula.titulo}
          />
        </div>

        <div className="flex-grow-1">
          <p className="section-kicker mb-2">Película</p>
          <h1 className="text-white display-4 fw-bold">{pelicula.titulo}</h1>
          <p className="text-white fs-4">⭐ {pelicula.rating}/10</p>
          <p className="fs-5 text-muted-soft">{pelicula.descripcion}</p>
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
        </section>

      <section className="ratio ratio-16x9 app-surface overflow-hidden">
        {trailerUrl ? (
          <iframe
            src={trailerUrl}
            title={`Tráiler de ${pelicula.titulo}`}
            allowFullScreen></iframe>
        ) : (
          <p className="text-white p-4">{errorTrailer || "Cargando tráiler..."}</p>
        )}
      </section>
      </div>
    </main>
  );
}

export default VerPelicula;
