import { apiRequest, buildQuery } from "./apiClient";

export async function obtenerTrailerPorTitulo(titulo) {
  const data = await apiRequest(`/youtube/trailer${buildQuery({ movie: titulo })}`);
  return data.url;
}

export async function obtenerVideosPorPlaylist(playlistId) {
  return apiRequest(`/youtube/playlist/videos${buildQuery({ playlistId })}`);
}
