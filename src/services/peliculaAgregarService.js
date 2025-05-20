import axios from "axios";

const URL_BASE = "http://localhost:8080/api/peliculas";

export const crearPelicula = async (pelicula) => {
  const response = await axios.post(`${URL_BASE}/crear`, pelicula);
  return response.data;
};
