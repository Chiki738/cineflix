import axios from "axios";

const API_URL = "https://cinexflix-gq2n.onrender.com/api/historial";

// Agregar al historial
export async function agregarAHistorial(historial) {
  const response = await axios.post(API_URL, historial);
  return response.data;
}

// Obtener historial de un usuario
export async function obtenerHistorialPorUsuario(usuarioId) {
  const response = await axios.get(`${API_URL}/${usuarioId}`);
  return response.data;
}
