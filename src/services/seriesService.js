import { apiRequest } from "./apiClient";

const API_URL = "/series";

export async function obtenerSeries() {
  return apiRequest(API_URL);
}

export async function crearSerie(datosSerie) {
  return apiRequest(`${API_URL}/crear`, {
    method: "POST",
    body: JSON.stringify(datosSerie),
  });
}

export async function agregarTemporada(idSerie, temporada) {
  return apiRequest(`${API_URL}/${encodeURIComponent(idSerie)}/temporadas`, {
    method: "POST",
    body: JSON.stringify(temporada),
  });
}

export async function eliminarSerie(id) {
  await apiRequest(`${API_URL}/${encodeURIComponent(id)}`, { method: "DELETE" });
}

export async function editarSerie(id, datosActualizados) {
  return apiRequest(`${API_URL}/${encodeURIComponent(id)}`, {
    method: "PUT",
    body: JSON.stringify(datosActualizados),
  });
}

export async function obtenerSeriePorId(id) {
  return apiRequest(`${API_URL}/${encodeURIComponent(id)}`);
}
