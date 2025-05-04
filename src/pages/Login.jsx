// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { loginUser } from "../services/authService";
import "../assets/styles/Login.css";

function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//     //   const data = await loginUser(email, password);
//       localStorage.setItem("token", data.token);
//       localStorage.setItem("user", JSON.stringify(data.user));
//       navigate("/Home");
//     } catch (error) {
//       alert("Credenciales incorrectas");
//       console.error("Error de inicio de sesión:", error);
//     }
//   };

//   const togglePassword = () => setShowPassword(!showPassword);

  return (
    <div className="formLogin d-flex flex-column justify-content-center align-items-center text-white text-center">
      <form
        // onSubmit={handleLogin}
        className="d-flex flex-column justify-content-center align-items-center p-4 rounded-2">
        <h3>INISIAR SESIÓN</h3>

        {/* <div className="mb-3">
          <input
            type="email"
            placeholder="Ingresar correo electrónico"
            className="form-control"
            style={{ width: "300px" }}
            id="email"
            // value={email}
            // onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div> */}

        {/* <div className="input-group mb-3">
          <input
            type={showPassword ? "text" : "password"}
            className="form-control"
            placeholder="Ingresar contraseña"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={togglePassword}>
            <i
              className={`fa-solid ${
                showPassword ? "fa-eye-slash" : "fa-eye"
              }`}></i>
          </button>
        </div> */}

        {/* <button
          type="submit"
          className="btn btn-primary px-4 py-1 text-dark fw-bold btnLogin rounded-3 border-success">
          INGRESAR
        </button>

        <p className="pb-0">
          ¿No tienes cuenta?&nbsp;
          <a href="/Registro" style={{ color: "white" }}>
            <strong>Registrate</strong>
          </a>
        </p> */}
      </form>
    </div>
  );
}

export default Login;
