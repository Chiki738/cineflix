import { useRef, useState } from "react";

function CambiarFoto({ onClose }) {
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
    }
  };

  const openFileDialog = () => {
    fileInputRef.current.click();
  };

  return (
    <div
      className="modal d-block"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Cambiar Foto de Perfil</h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={onClose}></button>
          </div>

          <div className="modal-body">
            <div className="text-center mb-3">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                ref={fileInputRef}
                style={{ display: "none" }}
              />
            </div>

            {preview && (
              <div className="text-center mb-4">
                <img
                  src={preview}
                  className="img-fluid rounded-circle"
                  alt="Vista previa"
                />
              </div>
            )}

            <div className="d-flex justify-content-between gap-3">
              <button
                type="button"
                className="btn btn-primary"
                onClick={openFileDialog}>
                SUBIR FOTO
              </button>
              <button
                type="button"
                className="btn btn-success px-4"
                onClick={onClose}>
                ACEPTAR
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CambiarFoto;
