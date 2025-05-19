export const obtenerPlanes = async () => {
  try {
    const response = await fetch("http://localhost:8080/api/planes");
    if (!response.ok) throw new Error("Error al obtener planes");
    return await response.json();
  } catch (error) {
    console.error("Error en obtenerPlanes:", error);
    throw error;
  }
};
