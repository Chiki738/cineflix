// src/services/peliculasService.js
import axios from "axios";

const API_URL = "https://cinexflix-gq2n.onrender.com/api/peliculas";

// Obtener todas las películas
export async function obtenerPeliculas() {
  const response = await axios.get(API_URL);
  return response.data;
}

// Obtener una película por ID
export async function obtenerPeliculaPorId(id) {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
}

// Crear nueva película
export async function crearPelicula(pelicula) {
  const response = await axios.post(`${API_URL}/crear`, pelicula);
  return response.data;
}

// Actualizar película existente
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

  const response = await axios.put(`${API_URL}/${formData.id}`, dataActualizar);
  return response.data;
}

// Eliminar película por ID
export const eliminarPeliculaPorId = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!response.ok) throw new Error("No se pudo eliminar la película");
};
