// services/planService.js

export const obtenerPlanes = async () => {
  try {
    const response = await fetch("https://cinexflix-gq2n.onrender.com/planes", {
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
