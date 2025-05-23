// src/hooks/usePeliculas.js
import { useEffect, useState } from "react";
import { obtenerPeliculas } from "../services/peliculasService";

function usePeliculas() {
  const [peliculas, setPeliculas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    obtenerPeliculas()
      .then((data) => {
        setPeliculas(data);
        setCargando(false);
      })
      .catch((err) => {
        setError(err.message);
        setCargando(false);
      });
  }, []);

  return { peliculas, cargando, error };
}

export default usePeliculas;
