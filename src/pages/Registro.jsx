import { Link } from "react-router-dom";
import "../assets/styles/Registro.css";
import { useRegistro } from "../hooks/useRegistro";

function Registro() {
  const {
    password,
    confirmPassword,
    passwordMatch,
    handlePasswordChange,
    handleConfirmPasswordChange,
    handleSubmit,
  } = useRegistro();

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
              type="password"
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
