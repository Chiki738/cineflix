// services/usuarioService.js

const BASE_URL = "https://cinexflix-gq2n.onrender.com/api/usuarios";

// Login de usuario
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

// Registro de usuario
export const registerUser = async (userData) => {
  try {
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
        // ignorar
      }
      throw new Error(errorMsg);
    }

    return await response.json();
  } catch (error) {
    console.error("Error en registerUser:", error.message);
    throw error;
  }
};

// Obtener todos los usuarios
export async function obtenerUsuarios() {
  try {
    const respuesta = await fetch(BASE_URL);
    if (!respuesta.ok) {
      throw new Error("Error al obtener usuarios: " + respuesta.statusText);
    }
    const usuarios = await respuesta.json();
    return usuarios;
  } catch (error) {
    console.error(error);
    return null; // o puedes lanzar error si quieres manejarlo afuera
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
