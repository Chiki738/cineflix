import axios from "axios";

export async function obtenerTrailerPorTitulo(titulo) {
  try {
    const response = await axios.get(
      `https://cinexflix-gq2n.onrender.com/api/youtube/trailer`,
      { params: { movie: titulo } }
    );
    return response.data.url;
  } catch (error) {
    console.error("Error en obtenerTrailerPorTitulo:", error);
    throw error;
  }
}

export async function obtenerVideosPorPlaylist(playlistId) {
  try {
    const response = await axios.get(
      `https://cinexflix-gq2n.onrender.com/api/youtube/playlist/videos`,
      { params: { playlistId } }
    );
    return response.data;
  } catch (error) {
    console.error("Error en obtenerVideosPorPlaylist:", error);
    throw error;
  }
}
