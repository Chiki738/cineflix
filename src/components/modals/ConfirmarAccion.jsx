function ConfirmarAccion() {
  return (
    <div className="modal fade" id="modalEliminar" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered modal-sm">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Eliminar</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <p>
              ¿Estás seguro de que deseas proceder?
            </p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal">
              Cancelar
            </button>
            <button type="button" className="btn btn-danger">
              Sí, eliminar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmarAccion;
