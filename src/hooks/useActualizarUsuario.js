import { useState } from "react";
import { actualizarUsuario } from "../services/usuarioService";

export function useActualizarUsuario() {
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  async function actualizar(id, datos) {
    setCargando(true);
    setError(null);
    try {
      const resultado = await actualizarUsuario(id, datos);
      setCargando(false);
      return resultado;
    } catch (e) {
      setError(e.message);
      setCargando(false);
      return null;
    }
  }

  return { actualizar, cargando, error };
}
