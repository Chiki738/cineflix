// authService.js
export async function loginUser(credentials) {
  const response = await fetch("http://localhost:8080/api/usuarios/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  if (response.status === 403) {
    throw new Error(
      "Acceso prohibido: credenciales incorrectas o sin permisos"
    );
  }

  if (!response.ok) {
    throw new Error("Error de autenticación");
  }

  return await response.json();
}
