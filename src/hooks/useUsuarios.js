import { useState, useEffect } from "react";
import { obtenerUsuarios } from "../services/usuarioService";

export function useUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await obtenerUsuarios();
        if (data) setUsuarios(data);
        else setError("No se pudieron obtener los usuarios");
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return { usuarios, loading, error };
}
