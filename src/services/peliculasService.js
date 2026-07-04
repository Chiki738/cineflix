import { apiRequest } from "./apiClient";

const API_URL = "/peliculas";

export async function obtenerPeliculas() {
  return apiRequest(API_URL);
}

export async function obtenerPeliculaPorId(id) {
  return apiRequest(`${API_URL}/${encodeURIComponent(id)}`);
}

export async function crearPelicula(pelicula) {
  return apiRequest(`${API_URL}/crear`, {
    method: "POST",
    body: JSON.stringify(pelicula),
  });
}

export async function actualizarPelicula(formData) {
  const dataActualizar = {
    ...formData,
    duracion: Number(formData.duracion),
    rating: Number(formData.rating),
    actores: Array.isArray(formData.actores)
      ? formData.actores
      : formData.actores.split(",").map((a) => a.trim()),
    directores: Array.isArray(formData.directores)
      ? formData.directores
      : formData.directores.split(",").map((d) => d.trim()),
  };

  return apiRequest(`${API_URL}/${encodeURIComponent(formData.id)}`, {
    method: "PUT",
    body: JSON.stringify(dataActualizar),
  });
}

export const eliminarPeliculaPorId = async (id) => {
  await apiRequest(`${API_URL}/${encodeURIComponent(id)}`, { method: "DELETE" });
};
