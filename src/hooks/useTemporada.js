import { useState, useCallback } from "react";
import {
  buscarDetallesSerie,
  buscarTemporadaSerie,
} from "../services/omdbService";

export const useTemporada = () => {
  const [episodios, setEpisodios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchTemporada = useCallback(async (titulo, temporada) => {
    try {
      setLoading(true);
      setError("");

      const detalles = await buscarDetallesSerie(titulo);
      if (!detalles || !detalles.imdbID) {
        throw new Error("No se encontró el ID de la serie");
      }

      const data = await buscarTemporadaSerie(detalles.imdbID, temporada);
      if (data.Response === "True") {
        setEpisodios(data.Episodes);
      } else {
        setEpisodios([]);
        throw new Error("No se encontraron episodios");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return { episodios, loading, error, fetchTemporada };
};
