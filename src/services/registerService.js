export const registerUser = async (userData) => {
  try {
    const response = await fetch(
      "http://localhost:8080/api/usuarios/registro",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      }
    );

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
