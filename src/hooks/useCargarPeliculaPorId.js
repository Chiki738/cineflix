// src/hooks/useCargarPeliculaPorId.js
import { useEffect, useState } from "react";
import { obtenerPeliculaPorId } from "../services/peliculasService";

export function useCargarPeliculaPorId(id) {
  const [pelicula, setPelicula] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchPelicula = async () => {
      try {
        const data = await obtenerPeliculaPorId(id);
        setPelicula(data);
      } catch (err) {
        setError("No se pudo cargar la película.");
        console.error(err);
      } finally {
        setCargando(false);
      }
    };

    fetchPelicula();
  }, [id]);

  return { pelicula, cargando, error };
}
