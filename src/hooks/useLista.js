import { useState } from "react";
import * as listaService from "../services/listaService";

export function useLista() {
  const [error, setError] = useState(null);

  const agregar = async (usuarioId, contenidoId) => {
    try {
      setError(null);
      await listaService.agregarALista({ usuarioId, contenidoId });
    } catch (e) {
      setError(e.message || "Error al agregar a la lista");
    }
  };

  return { agregar, error };
}
