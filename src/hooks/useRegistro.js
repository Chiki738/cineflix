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
      foto: "https://lc.cx/bu3dOF",
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
