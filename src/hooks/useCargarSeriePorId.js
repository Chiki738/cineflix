import { useEffect, useState } from "react";
import { obtenerSeriePorId } from "../services/seriesService";

export function useCargarSeriePorId(id) {
  const [serie, setSerie] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchSerie = async () => {
      try {
        const data = await obtenerSeriePorId(id);
        setSerie(data);
      } catch (err) {
        setError("No se pudo cargar la serie.");
        console.error(err);
      } finally {
        setCargando(false);
      }
    };

    fetchSerie();
  }, [id]);

  return { serie, cargando, error };
}
