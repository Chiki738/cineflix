import { API_BASE_URL } from "./apiClient";

const BASE_URL = `${API_BASE_URL}/admins`;

export async function registrarAdministrador(adminData) {
  const response = await fetch(`${BASE_URL}/registro`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(adminData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al registrar el administrador");
  }

  return await response.json();
}

export async function loginAdmin(credentials) {
  const response = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) return null;

  const data = await response.json();
  return data.rol === "ADMIN" ? data : null;
}
