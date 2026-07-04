import { Link } from "react-router-dom";
import { useRegistro } from "../hooks/useRegistroUsuario";
import { UserPlus } from "lucide-react";

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
    <div className="auth-page d-flex flex-column justify-content-center align-items-center text-white text-center p-3">
      <form
        onSubmit={handleSubmit}
        className="auth-panel w-100 p-4"
        style={{ maxWidth: "500px" }}>
        <p className="section-kicker mb-2">Empieza tu cuenta</p>
        <h1 className="h3 fw-bold mb-4">Regístrate</h1>

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
          className="btn btn-cine px-4 py-2 d-inline-flex align-items-center justify-content-center gap-2">
          <UserPlus size={18} />
          Crear cuenta
        </button>

        <p className="pt-3 mb-0 text-muted-soft">
          ¿Ya tienes una cuenta?&nbsp;
          <Link to="/Login" className="text-decoration-none text-white">
            <strong className="color-white">Iniciar sesión</strong>
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Registro;
