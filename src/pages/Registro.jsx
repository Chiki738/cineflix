import { Link } from "react-router-dom";
import "../assets/styles/Registro.css";

function Login() {
  return (
    <div className="formRegistro d-flex flex-column justify-content-center align-items-center text-white text-center p-5">
      <form className="d-flex flex-column justify-content-center align-items-center p-4 rounded-2">
        <h3>REGISTRATE</h3>

        <div class="mb-3">
          <input
            type="text"
            placeholder="Ingresar primer nombre"
            className="form-control"
            style={{ width: "300px" }}
            id="name"
            required
          />
        </div>

        <div class="mb-3">
          <input
            type="text"
            placeholder="Ingresar primer apellido"
            className="form-control"
            style={{ width: "300px" }}
            id="lastName"
            required
          />
        </div>

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

        <div class="mb-3">
          <input
            type="tel"
            placeholder="Ingresar número telefónico"
            className="form-control"
            style={{ width: "300px" }}
            id="tel"
            required
          />
        </div>

        <div class="mb-3">
          <input
            type="password"
            placeholder="Ingresar contraseña"
            className="form-control"
            style={{ width: "300px" }}
            id="password"
            required
          />
        </div>

        <div class="mb-3">
          <input
            type="password"
            placeholder="Confirmar contraseña"
            className="form-control"
            style={{ width: "300px" }}
            id="passwordConfirm"
            required
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary px-4 py-1 text-dark fw-bold btnLogin rounded-3 border-success">
          REGISTRARSE
        </button>

        <p className="pb-0">
          ¿Ya tienes una cuenta?&nbsp;
          <Link to="/Login" style={{ color: "white" }}>
            <strong>Iniciar Sesión</strong>
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;

// import { Link } from "react-router-dom";
// import "../assets/styles/Registro.css";

// function Registro() {
//   return (
//     <div className="registroContainer">
//       <form action="" id="registroForm">
//         <h2>Registrarse</h2>

//         <input type="text" placeholder="Ingresar nombre" required />
//         <input type="text" placeholder="Ingresar apellido" required />
//         <input type="email" placeholder="Ingresar correo electrónico" required />
//         <input type="tel" placeholder="Ingresar número telefónico" required />
//         <input type="password" placeholder="Ingresar contraseña" required />
//         <input type="password" placeholder="Confirmar contraseña" required />

//         <div className="termsContainer">
//           <input type="checkbox" id="terms" required />
//           <label htmlFor="terms">Acepto los términos y condiciones</label>
//         </div>

//         <button type="submit">Registrarse</button>

//         <p>
//           ¿Ya tienes cuenta?&nbsp;
//           <Link to="/Login">
//             <strong>Inicia sesión</strong>
//           </Link>
//         </p>
//       </form>
//     </div>
//   );
// }

// export default Registro;
