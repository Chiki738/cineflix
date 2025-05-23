// src/hooks/useTrailer.js
import { useEffect, useState } from "react";
import { obtenerTrailerPorTitulo } from "../services/youtubeService";

export function useTrailer(titulo) {
  const [trailerUrl, setTrailerUrl] = useState(null);
  const [errorTrailer, setErrorTrailer] = useState(null);

  useEffect(() => {
    if (!titulo) return;

    async function fetchTrailer() {
      try {
        const url = await obtenerTrailerPorTitulo(titulo);
        setTrailerUrl(url);
      } catch (error) {
        console.error("Error al obtener el tráiler:", error);
        setErrorTrailer("No se pudo cargar el tráiler.");
      }
    }

    fetchTrailer();
  }, [titulo]);

  return { trailerUrl, errorTrailer };
}
