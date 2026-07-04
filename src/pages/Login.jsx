import { Link } from "react-router-dom";
import { useLogin } from "../hooks/useAuth";
import { Eye, EyeOff, LogIn } from "lucide-react";

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
    <div className="auth-page d-flex flex-column justify-content-center align-items-center text-white text-center p-3">
      <form onSubmit={handleLogin} className="auth-panel d-flex flex-column p-4 gap-3">
        <p className="section-kicker mb-0">Bienvenido de vuelta</p>
        <h1 className="h3 fw-bold mb-2">Iniciar sesión</h1>

        <input
          type="email"
          placeholder="Ingresar correo electrónico"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <div className="input-group">
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
            aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
            onClick={toggleShowPassword}>
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <button
          type="submit"
          className="btn btn-cine px-4 py-2 d-inline-flex align-items-center justify-content-center gap-2">
          <LogIn size={18} />
          Ingresar
        </button>

        <p className="pt-2 mb-0 text-muted-soft">
          ¿No tienes cuenta?&nbsp;
          <Link to="/Registro" className="text-white text-decoration-none">
            <strong>Regístrate</strong>
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
