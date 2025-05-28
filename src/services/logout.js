export async function logoutUser() {
  const sessionId = localStorage.getItem("sessionId");

  if (sessionId) {
    try {
      const response = await fetch(
        "https://cinexflix-gq2n.onrender.com/api/sesiones/cierre",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sesionId: sessionId }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Sesión cerrada correctamente:", data);
      } else {
        console.warn("Error al cerrar sesión:", response.status);
      }
    } catch (error) {
      console.error("Error en la petición de cierre de sesión:", error);
    }
  }

  localStorage.removeItem("user");
  localStorage.removeItem("token");
  localStorage.removeItem("sessionId");
  sessionStorage.clear();
}
