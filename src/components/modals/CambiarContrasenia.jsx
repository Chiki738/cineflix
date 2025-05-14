function CambiarContrasenia() {
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
                required
              />
            </div>

            <div className="mb-3">
              <input
                type="password"
                placeholder="Confirmar contraseña"
                className="form-control"
                id="confirmPassword"
                required
              />
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal">
              Cancelar
            </button>
            <button type="button" className="btn btn-primary">
              Guardar cambios
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CambiarContrasenia;
