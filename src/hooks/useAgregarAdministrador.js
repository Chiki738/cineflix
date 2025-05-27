// hooks/useAgregarAdministrador.js
import { useState } from "react";
import { registrarAdministrador } from "../services/adminService";

export function useAgregarAdministrador() {
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  const agregarAdministrador = async (datos) => {
    setCargando(true);
    setError(null);
    try {
      await registrarAdministrador(datos);
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  return { agregarAdministrador, cargando, error };
}
