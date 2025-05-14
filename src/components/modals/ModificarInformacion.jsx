import { useState } from "react";

function ModificarInformacion({ onClose }) {
  const datosOriginales = {
    nombre: "GRUPO",
    apellido: "A",
    correo: "grupoa@gmail.com",
    telefono: "+51 987 654 321",
  };

  const [formData, setFormData] = useState({ ...datosOriginales });
  const [editable, setEditable] = useState({
    nombre: false,
    apellido: false,
    correo: false,
    telefono: false,
  });

  // Detectar si se ha modificado al menos un campo
  const cambiosRealizados = Object.keys(formData).some(
    (campo) => formData[campo] !== datosOriginales[campo]
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const habilitarCampo = (campo) => {
    setEditable((prev) => ({ ...prev, [campo]: true }));
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
                  name="apellido"
                  className="form-control"
                  value={formData.apellido}
                  onChange={handleInputChange}
                  disabled={!editable.apellido}
                />
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={() => habilitarCampo("apellido")}>
                  Editar
                </button>
              </div>

              <div className="input-group mb-3">
                <input
                  type="email"
                  name="correo"
                  className="form-control"
                  value={formData.correo}
                  onChange={handleInputChange}
                  disabled={!editable.correo}
                />
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={() => habilitarCampo("correo")}>
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
              type="submit"
              className="btn btn-primary"
              disabled={!cambiosRealizados}>
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModificarInformacion;
