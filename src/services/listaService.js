import { apiRequest, buildQuery } from "./apiClient";

const API_URL = "/lista";

export async function agregarALista(lista) {
  return apiRequest(API_URL, {
    method: "POST",
    body: JSON.stringify(lista),
  });
}

export async function obtenerListaPorUsuario(usuarioId) {
  return apiRequest(`${API_URL}/${encodeURIComponent(usuarioId)}`);
}

export async function eliminarDeLista(usuarioId, contenidoId) {
  return apiRequest(`${API_URL}${buildQuery({ usuarioId, contenidoId })}`, {
    method: "DELETE",
  });
}
