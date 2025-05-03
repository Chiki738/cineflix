import { Link } from "react-router-dom";
import "../assets/styles/Login.css";

function Login() {
  return (
    <div className="formLogin d-flex flex-column justify-content-center align-items-center text-white text-center">
      <form className="d-flex flex-column justify-content-center align-items-center p-4 rounded-2">
        <h3>INISIAR SESIÓN</h3>

        <div class="mb-3">
          <input
            type="email"
            placeholder="Ingresar correo electrónico"
            className="form-control"
            style={{ width: "300px" }}
            id="email"
            required
          />
        </div>

        <div class="input-group mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Ingresar contraseña"
            id="password"
            required
          />
          <button
            className="btn btn-outline-secondary"
            type="button"
            id="button-addon2">
            <i className="fa-solid fa-eye"></i>
          </button>
        </div>

        <button
          type="submit"
          className="btn btn-primary px-4 py-1 text-dark fw-bold btnLogin rounded-3 border-success">
          INGRESAR
        </button>

        <p className="pb-0">
          ¿No tienes cuenta?&nbsp;
          <Link to="/Registro" style={{ color: "white" }}>
            <strong>Registrate</strong>
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
