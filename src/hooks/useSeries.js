// hooks/useSeries.js
import { useEffect, useState } from "react";
import { obtenerSeries, agregarTemporada } from "../services/seriesService";

export function useSeries() {
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSeries = async () => {
    setLoading(true);
    try {
      const data = await obtenerSeries();
      setSeries(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSeries();
  }, []);

  const guardarTemporada = async (tituloSerie, numeroTemporada, episodios) => {
    const serie = series.find((s) => s.titulo === tituloSerie);
    if (!serie) {
      throw new Error("Serie no encontrada");
    }

    const temporada = {
      numero: Number(numeroTemporada), // asegúrate que sea número
      episodios: episodios.map((ep) => ({
        numero: Number(ep.Episode),
        titulo: ep.Title,
        fecha: ep.Released,
        rating: ep.imdbRating,
      })),
    };

    return await agregarTemporada(serie.id, temporada);
  };

  return {
    series,
    loading,
    error,
    refetch: fetchSeries,
    guardarTemporada, // 👈 ¡Aquí se incluye en el return!
  };
}
