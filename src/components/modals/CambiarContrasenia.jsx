import { useRef } from "react";
import { useActualizarUsuario } from "../../hooks/useActualizarUsuario"; // ajusta la ruta

function CambiarContrasenia({ actualizarPassword }) {
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  // Usar hook para actualizar usuario en backend
  const { actualizar, cargando, error } = useActualizarUsuario();

  const handleGuardar = async () => {
    const pass = passwordRef.current.value;
    const confirmPass = confirmPasswordRef.current.value;

    if (pass !== confirmPass) {
      alert("Las contraseñas no coinciden");
      return;
    }

    const userString = localStorage.getItem("user");
    if (!userString) {
      alert("No hay usuario en sesión");
      return;
    }

    const user = JSON.parse(userString);

    // Actualizamos contraseña en localStorage
    user.contrasena = pass;
    localStorage.setItem("user", JSON.stringify(user));

    // Llamamos al servicio para actualizar el usuario en backend
    const datosActualizar = {
      nombre: user.nombre,
      apellidos: user.apellidos,
      email: user.email,
      contrasena: pass,
      telefono: user.telefono,
      foto: user.foto,
    };

    const resultado = await actualizar(user.id, datosActualizar);

    if (resultado) {
      alert(
        "Contraseña actualizada correctamente"
      );
      // Actualizar estado en componente padre
      if (actualizarPassword) actualizarPassword(pass);

      // Limpiar inputs
      passwordRef.current.value = "";
      confirmPasswordRef.current.value = "";

      // Aquí puedes cerrar el modal si quieres
    } else {
      alert("Error al actualizar datos. Intenta de nuevo.");
    }
  };

  return (
    <div className="modal fade" id="modalCambiarContrasenia" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Cambiar contraseña</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <input
                type="password"
                placeholder="Ingresar contraseña"
                className="form-control"
                id="password"
                ref={passwordRef}
                required
              />
            </div>

            <div className="mb-3">
              <input
                type="password"
                placeholder="Confirmar contraseña"
                className="form-control"
                id="confirmPassword"
                ref={confirmPasswordRef}
                required
              />
            </div>

            {cargando && <p>Actualizando datos...</p>}
            {error && <p className="text-danger">Error: {error}</p>}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal">
              Cancelar
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleGuardar}
              disabled={cargando}>
              Guardar cambios
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CambiarContrasenia;
