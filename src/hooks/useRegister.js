import { useState } from "react";
import { registerUser } from "../services/authService";
import perfil from "../assets/img/perfil.jpg"; // Importación de la imagen

const useRegister = () => {
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "", // Nuevo campo para la confirmación de la contraseña
  });

  // Maneja el cambio de valores en los campos de formulario
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // Llama al servicio para registrar al usuario
  const handleRegister = async (e) => {
    e.preventDefault();

    // Verificar si las contraseñas coinciden
    if (formData.password !== formData.confirmPassword) {
      alert("Las contraseñas no coinciden.");
      return; // Si no coinciden, no enviar el formulario
    }

    // Crear el objeto con los datos del usuario
    const userData = {
      _id: formData.email,
      nombre: formData.name,
      apellido: formData.lastName,
      contrasena: formData.password, // Solo enviamos el password
      fechaCreacion: new Date().toISOString(),
      fotoPerfil: perfil, // Ruta de la imagen
    };

    try {
      const result = await registerUser(userData);
      console.log(result);
      alert("Usuario registrado con éxito.");
    } catch (error) {
      alert("Error al registrar el usuario.");
      console.error("Error al registrar el usuario:", error);
    }
  };

  return { formData, handleChange, handleRegister };
};

export default useRegister;
