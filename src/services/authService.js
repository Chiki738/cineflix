import axios from "axios";

// Definir la URL base de la API
const API_URL = "http://localhost:5000/api/users/register";

// Función para registrar un nuevo usuario
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(API_URL, userData);
    return response.data; // Devuelve la respuesta de la API
  } catch (error) {
    console.error("Error al registrar el usuario", error);
    throw error; // Lanza el error para manejarlo en el componente
  }
};
