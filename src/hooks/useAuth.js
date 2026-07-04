import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import { apiRequest } from "../services/apiClient";
import { setStoredUser } from "../utils/storage";

export function useLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const toggleShowPassword = () => setShowPassword(!showPassword);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser({ email, contrasena: password });

      if (response.rol === "ADMIN" || response.rol === "USER") {
        const user = {
          id: response.id,
          rol: response.rol,
          nombre: response.nombre,
          apellidos: response.apellidos,
          email: response.email,
          fechaNacimiento: response.fechaNacimiento,
          fechaCreacionCuenta: response.fechaCreacionCuenta,
          telefono: response.telefono,
          foto: response.foto,
          plan_seleccionado: response.plan_seleccionado,
          modalidad_plan: response.modalidad_plan,
          fecha_inicio_plan: response.fecha_inicio_plan,
          fecha_fin_plan: response.fecha_fin_plan,
        };

        setStoredUser(user);

        try {
          const sessionData = await apiRequest("/sesiones/inicio", {
            method: "POST",
            body: JSON.stringify({ userId: response.id }),
          });
          localStorage.setItem("sessionId", sessionData.id);
        } catch {
          localStorage.removeItem("sessionId");
        }

        navigate(response.rol === "ADMIN" ? "/PeliculasAdmin" : "/Home");
      } else {
        alert("Credenciales incorrectas");
      }
    } catch {
      alert("Error al iniciar sesión");
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    toggleShowPassword,
    handleLogin,
  };
}
