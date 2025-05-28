import * as historialService from "../services/historialService";

export function useHistorialUsuario() {
  const agregar = async (usuarioId, contenidoId, tipo) => {
    const historial = { usuarioId, contenidoId, tipo };
    return await historialService.agregarAHistorial(historial);
  };

  const obtenerPorUsuario = async (usuarioId) => {
    return await historialService.obtenerHistorialPorUsuario(usuarioId);
  };

  return { agregar, obtenerPorUsuario };
}
