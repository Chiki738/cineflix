// services/planService.js

export const obtenerPlanes = async () => {
  try {
    const response = await fetch("http://localhost:8080/api/planes", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error("Error al obtener planes");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en obtenerPlanes:", error.message);
    throw error;
  }
};
