import { useState } from "react";
import { useActualizarUsuario } from "../../hooks/useActualizarUsuario";

function ModificarInformacion({ userData, onClose, onSave }) {
  const [formData, setFormData] = useState({ ...userData });
  const [editable, setEditable] = useState({
    nombre: false,
    apellidos: false,
    email: false,
    telefono: false,
  });

  const { actualizar, cargando, error } = useActualizarUsuario();

  const cambiosRealizados = Object.keys(formData).some(
    (campo) => formData[campo] !== userData[campo]
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const habilitarCampo = (campo) => {
    setEditable((prev) => ({ ...prev, [campo]: true }));
  };

  const handleSubmit = async () => {
    // Obtengo datos actuales del localStorage
    const localUser = JSON.parse(localStorage.getItem("user")) || {};

    // Actualizo localStorage con los datos nuevos
    const updatedUser = {
      ...localUser,
      nombre: formData.nombre,
      apellidos: formData.apellidos,
      email: formData.email,
      telefono: formData.telefono,
      foto: localUser.foto || "",
      contrasenia: localUser.contrasenia || "",
    };

    // Guardo en localStorage
    localStorage.setItem("user", JSON.stringify(updatedUser));

    // Obtengo el id desde localStorage, que sí debería existir
    const idUsuario = localUser.id || localUser._id;
    if (!idUsuario) {
      console.error("ID de usuario no disponible");
      return;
    }

    try {
      const respuesta = await actualizar(idUsuario, updatedUser);
      if (respuesta) {
        onSave(respuesta);
      }
      onClose();
    } catch (e) {
      console.error(e.message);
    }
  };

  return (
    <div className="modal d-block" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">EDITAR INFORMACIÓN</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Close"></button>
          </div>

          <div className="modal-body">
            <form>
              <div className="input-group mb-3">
                <input
                  type="text"
                  name="nombre"
                  className="form-control"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  disabled={!editable.nombre}
                />
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={() => habilitarCampo("nombre")}>
                  Editar
                </button>
              </div>

              <div className="input-group mb-3">
                <input
                  type="text"
                  name="apellidos"
                  className="form-control"
                  value={formData.apellidos}
                  onChange={handleInputChange}
                  disabled={!editable.apellidos}
                />
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={() => habilitarCampo("apellidos")}>
                  Editar
                </button>
              </div>

              <div className="input-group mb-3">
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={!editable.email}
                />
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={() => habilitarCampo("email")}>
                  Editar
                </button>
              </div>

              <div className="input-group mb-3">
                <input
                  type="tel"
                  name="telefono"
                  className="form-control"
                  value={formData.telefono}
                  onChange={handleInputChange}
                  disabled={!editable.telefono}
                />
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={() => habilitarCampo("telefono")}>
                  Editar
                </button>
              </div>

              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
            </form>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}>
              Cerrar
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSubmit}
              disabled={!cambiosRealizados || cargando}>
              {cargando ? "Guardando..." : "Guardar"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModificarInformacion;
