import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../assets/styles/Registro.css";

function Registro() {
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
      contrasena: form.password.value, // Aquí la contraseña sin encriptar
      fechaNacimiento: form.birthDate.value,
      telefono: form.phone.value,
      foto: "perfil.jpg",
      rol: "USER",
      // No enviamos aún plan
    };

    // Guardar datos en localStorage para usar en el pago
    localStorage.setItem("user", JSON.stringify(userData));

    // Solo redirigimos a la página de pagos para que el usuario seleccione el plan
    alert("Registro exitoso. Ahora selecciona tu plan.");
    navigate("/Pagos");
  };

  return (
    <div className="formRegistro d-flex flex-column justify-content-center align-items-center text-white text-center p-5">
      <form
        onSubmit={handleSubmit}
        className="w-100 p-4"
        style={{ maxWidth: "500px" }}>
        <h3 className="fw-bold mb-4">REGÍSTRATE</h3>

        <div className="row">
          <div className="col-md-6 mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Primer nombre"
              id="name"
              name="name"
              required
            />
          </div>

          <div className="col-md-6 mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Primer apellido"
              id="lastName"
              name="lastName"
              required
            />
          </div>

          <div className="col-12 mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Correo electrónico"
              id="email"
              name="email"
              required
            />
          </div>

          <div className="col-md-6 mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Contraseña"
              id="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>

          <div className="col-md-6 mb-3">
            <input
              type={`password`}
              className={`form-control ${!passwordMatch ? "is-invalid" : ""}`}
              placeholder="Confirmar contraseña"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
            />
            {!passwordMatch && (
              <div className="invalid-feedback">
                Las contraseñas no coinciden.
              </div>
            )}
          </div>

          <div className="col-md-6 mb-3">
            <input
              type="date"
              className="form-control"
              placeholder="Fecha de nacimiento"
              id="birthDate"
              name="birthDate"
              required
            />
          </div>

          <div className="col-md-6 mb-4">
            <input
              type="tel"
              className="form-control"
              placeholder="Número telefónico"
              id="phone"
              name="phone"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-primary px-4 py-1 text-dark fw-bold btnLogin rounded-3 border-success">
          REGISTRARSE
        </button>

        <p className="pt-3">
          ¿Ya tienes una cuenta?&nbsp;
          <Link to="/Login" style={{ color: "white" }}>
            <strong>Iniciar sesión</strong>
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Registro;
