// hooks/usePeliculas.js
import { useEffect, useState } from "react";
import { obtenerPeliculas, eliminarPeliculaPorId } from "../services/peliculasService";

export function usePeliculas() {
  const [peliculas, setPeliculas] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [peliculaSeleccionada, setPeliculaSeleccionada] = useState(null);

  const cargarPeliculas = async () => {
    try {
      const data = await obtenerPeliculas();
      setPeliculas(data);
    } catch (error) {
      console.error(error);
    }
  };

  const eliminarPelicula = async (id) => {
    try {
      await eliminarPeliculaPorId(id);
      await cargarPeliculas();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    cargarPeliculas();
  }, []);

  const peliculasFiltradas = peliculas.filter((p) =>
    p.titulo.toLowerCase().includes(busqueda.trim().toLowerCase())
  );

  const extraerNumero = (id) => {
    const match = id.toUpperCase().match(/^MOV(\d+)$/);
    return match ? parseInt(match[1], 10) : Number.MAX_SAFE_INTEGER;
  };

  const peliculasOrdenadas = peliculasFiltradas.sort((a, b) => {
    const numA = extraerNumero(a.id);
    const numB = extraerNumero(b.id);
    return numA - numB;
  });

  return {
    peliculas: peliculasOrdenadas,
    busqueda,
    setBusqueda,
    peliculaSeleccionada,
    setPeliculaSeleccionada,
    cargarPeliculas,
    eliminarPelicula,
  };
}
