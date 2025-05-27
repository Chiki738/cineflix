import axios from "axios";

const API_URL = "http://localhost:8080/api/lista";

// Agregar a la lista
export async function agregarALista(lista) {
  const response = await axios.post(API_URL, lista);
  return response.data;
}

// Obtener lista de un usuario
export async function obtenerListaPorUsuario(usuarioId) {
  const response = await axios.get(`${API_URL}/${usuarioId}`);
  return response.data;
}

// Eliminar contenido de la lista
export async function eliminarDeLista(usuarioId, contenidoId) {
  const response = await axios.delete(`${API_URL}`, {
    params: { usuarioId, contenidoId },
  });
  return response.data;
}
