import { apiRequest } from "./apiClient";
import { clearSessionStorage } from "../utils/storage";

export async function logoutUser() {
  const sessionId = localStorage.getItem("sessionId");

  if (sessionId) {
    try {
      await apiRequest("/sesiones/cierre", {
        method: "PUT",
        body: JSON.stringify({ sesionId: sessionId }),
      });
    } catch {
      // La sesión local debe limpiarse aunque el backend no responda.
    }
  }

  clearSessionStorage();
}
