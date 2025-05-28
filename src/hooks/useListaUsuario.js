import { useState } from "react";
import {
  obtenerListaPorUsuario,
  agregarALista,
  eliminarDeLista,
} from "../services/listaService";

export function useListaUsuario() {
  const [lista, setLista] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  const obtenerPorUsuario = async (usuarioId) => {
    setCargando(true);
    setError(null);
    try {
      const data = await obtenerListaPorUsuario(usuarioId);
      setLista(data);
      return data;
    } catch (e) {
      setError(e.message || "Error al cargar la lista");
      return [];
    } finally {
      setCargando(false);
    }
  };

  const agregar = async (usuarioId, contenidoId) => {
    try {
      await agregarALista({ usuarioId, contenidoId });
      await obtenerPorUsuario(usuarioId);
    } catch (e) {
      setError(e.message || "Error al agregar a la lista");
    }
  };

  const eliminar = async (usuarioId, contenidoId) => {
    try {
      await eliminarDeLista(usuarioId, contenidoId);
      await obtenerPorUsuario(usuarioId);
    } catch (e) {
      setError(e.message || "Error al eliminar de la lista");
      throw e; // para que el componente pueda capturar el error
    }
  };

  return {
    lista,
    cargando,
    error,
    obtenerPorUsuario,
    agregar,
    eliminar,
  };
}
