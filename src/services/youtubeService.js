// src/services/youtubeService.js
import axios from "axios";

export async function obtenerTrailerPorTitulo(titulo) {
  const response = await axios.get(
    `http://localhost:8080/api/youtube/trailer`,
    {
      params: { movie: titulo },
    }
  );

  return response.data.url;
}
