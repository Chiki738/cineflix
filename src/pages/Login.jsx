import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/authService";
import "../assets/styles/Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const toggle = () => setShowPassword(!showPassword);

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
            onClick={toggle}>
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
