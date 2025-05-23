import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function useRegistro() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordMatch(newPassword === confirmPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);
    setPasswordMatch(password === newConfirmPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!passwordMatch) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    const form = e.target;
    const userData = {
      nombre: form.name.value,
      apellidos: form.lastName.value,
      email: form.email.value,
      contrasena: form.password.value,
      fechaNacimiento: form.birthDate.value,
      telefono: form.phone.value,
      foto: "https://imagenes.elpais.com/resizer/v2/4UPKL26K5ZICHFC6UIAU5DDHWU.jpg?auth=393fdef15d621d403eec4dc5bc104e8ce874f3be8958f4d708d2ca856b646922&width=1200",
      rol: "USER",
    };

    localStorage.setItem("user", JSON.stringify(userData));

    alert("Registro exitoso. Ahora selecciona tu plan.");
    navigate("/Planes");
  };

  return {
    password,
    confirmPassword,
    passwordMatch,
    handlePasswordChange,
    handleConfirmPasswordChange,
    handleSubmit,
  };
}
