import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";

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
        const user = { email: response.email, rol: response.rol };
        localStorage.setItem("user", JSON.stringify(user));
        navigate(response.rol === "ADMIN" ? "/PeliculasAdmin" : "/Home");
      } else {
        alert("Credenciales incorrectas");
      }
    } catch (error) {
      alert("Error al iniciar sesión");
      console.error("Error de inicio de sesión:", error);
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
