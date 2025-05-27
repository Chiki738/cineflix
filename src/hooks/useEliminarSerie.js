// hooks/useEliminarSerie.js
import { useState } from "react";
import { eliminarSerie as eliminarSerieService } from "../services/seriesService";

export function useEliminarSerie(refetch) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const eliminarSerie = async (id) => {
    setLoading(true);
    try {
      await eliminarSerieService(id);
      if (refetch) await refetch(); // refrescar datos después de eliminar
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { eliminarSerie, loading, error };
}
