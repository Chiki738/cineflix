import { API_BASE_URL } from "./apiClient";

const BASE_URL = `${API_BASE_URL}/usuarios`;

export async function loginUsuario(credentials) {
  const response = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) return null;

  const data = await response.json();
  return data.rol === "USER" ? data : null;
}

export const registerUser = async (userData) => {
  const response = await fetch(`${BASE_URL}/registro`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  if (response.status === 409) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Correo ya registrado");
  }

  if (!response.ok) {
    let errorMsg = "Error al registrar usuario";
    try {
      const errorData = await response.json();
      errorMsg = errorData.message || errorMsg;
    } catch {
      // El backend puede responder sin JSON en errores genéricos.
    }
    throw new Error(errorMsg);
  }

  return await response.json();
};

export async function obtenerUsuarios() {
  try {
    const respuesta = await fetch(BASE_URL);
    if (!respuesta.ok) {
      throw new Error("Error al obtener usuarios: " + respuesta.statusText);
    }
    return await respuesta.json();
  } catch {
    return [];
  }
}

export async function actualizarUsuario(id, datos) {
  const response = await fetch(`${BASE_URL}/${id}/actualizar`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos),
  });

  if (!response.ok) {
    let errorMessage = "Error al actualizar usuario";
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorMessage;
    } catch {
      // no hacer nada
    }
    throw new Error(errorMessage);
  }

  return response.json();
}
