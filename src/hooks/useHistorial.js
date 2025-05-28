import { useState } from "react";
import * as historialService from "../services/historialService";

export function useHistorial() {
  const [error, setError] = useState(null);

  const agregar = async (usuarioId, contenidoId) => {
    try {
      setError(null);
      await historialService.agregarAHistorial({ usuarioId, contenidoId });
    } catch (e) {
      setError(e.message || "Error al agregar al historial");
    }
  };

  return { agregar, error };
}