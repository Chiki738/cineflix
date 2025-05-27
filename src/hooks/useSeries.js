import { useEffect, useState } from "react";
import {
  obtenerSeries,
  agregarTemporada,
  eliminarSerie as eliminarSerieService,
  editarSerie as editarSerieService,
} from "../services/seriesService";

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

  const eliminarSerie = async (id) => {
    await eliminarSerieService(id);
    await fetchSeries();
  };

  const guardarTemporada = async (tituloSerie, numeroTemporada, episodios) => {
    const serie = series.find((s) => s.titulo === tituloSerie);
    if (!serie) throw new Error("Serie no encontrada");

    const temporada = {
      numero: Number(numeroTemporada),
      episodios: episodios.map((ep) => ({
        numero: Number(ep.Episode),
        titulo: ep.Title,
        fecha: ep.Released,
        rating: ep.imdbRating,
      })),
    };

    return await agregarTemporada(serie.id, temporada);
  };

  // Función para editar serie, combinando datos actuales y actualizados
  const editarSerie = async (id, datosActualizados) => {
    const serieActual = series.find((s) => s.id === id);

    if (!serieActual) {
      throw new Error("Serie no encontrada");
    }

    const datosCompletos = {
      ...serieActual,
      ...datosActualizados,
    };

    const actualizada = await editarSerieService(id, datosCompletos);
    await fetchSeries();
    return actualizada;
  };

  useEffect(() => {
    fetchSeries();
  }, []);

  return {
    series,
    loading,
    error,
    refetch: fetchSeries,
    guardarTemporada,
    eliminarSerie,
    editarSerie,
  };
}
