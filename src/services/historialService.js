import { apiRequest } from "./apiClient";

const API_URL = "/historial";

export async function agregarAHistorial(historial) {
  return apiRequest(API_URL, {
    method: "POST",
    body: JSON.stringify(historial),
  });
}

export async function obtenerHistorialPorUsuario(usuarioId) {
  return apiRequest(`${API_URL}/${encodeURIComponent(usuarioId)}`);
}
