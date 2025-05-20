import { Link } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
import "../assets/styles/Login.css";

function Login() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    toggleShowPassword,
    handleLogin,
  } = useLogin();

  return (
    <div className="formLogin d-flex flex-column justify-content-center align-items-center text-white text-center">
      <form onSubmit={handleLogin} className="d-flex flex-column p-4 rounded-2">
        <h3>INICIAR SESIÓN</h3>

        <input
          type="email"
          placeholder="Ingresar correo electrónico"
          className="form-control mb-3"
          style={{ width: "300px" }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <div className="input-group mb-3" style={{ width: "300px" }}>
          <input
            type={showPassword ? "text" : "password"}
            className="form-control"
            placeholder="Ingresar contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={toggleShowPassword}>
            <i
              className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
            />
          </button>
        </div>

        <button
          type="submit"
          className="btn btn-primary px-4 py-1 text-dark fw-bold btnLogin rounded-3 border-success">
          INGRESAR
        </button>

        <p className="pt-3">
          ¿No tienes cuenta?&nbsp;
          <Link to="/Registro" style={{ color: "white" }}>
            <strong>Regístrate</strong>
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
