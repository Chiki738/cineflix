import { useRef, useState } from "react";
import { useActualizarUsuario } from "../../hooks/useActualizarUsuario";

function CambiarFoto({ onClose, onFotoActualizada }) {
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const fileInputRef = useRef();

  const { actualizar } = useActualizarUsuario();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const url = URL.createObjectURL(selectedFile);
      setPreview(url);
      setFile(selectedFile);
    }
  };

  const openFileDialog = () => {
    fileInputRef.current.click();
  };

  const handleGuardar = async () => {
    if (!preview || !file) {
      alert("Primero selecciona una foto");
      return;
    }

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      alert("Usuario no encontrado");
      return;
    }

    try {
      const timestamp = Date.now();
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "cinexflix");
      formData.append("public_id", `${user.id}_${timestamp}`);
      formData.append("folder", "samples/ecommerce");

      const cloudinaryResponse = await fetch(
        "https://api.cloudinary.com/v1_1/doacvhdgt/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await cloudinaryResponse.json();

      if (!cloudinaryResponse.ok) {
        throw new Error(data.error.message);
      }

      const urlFotoSubidaConCacheBust = data.secure_url + "?t=" + timestamp;

      const datosActualizados = {
        nombre: user.nombre,
        apellidos: user.apellidos,
        telefono: user.telefono,
        contrasena: user.contrasena,
        foto: urlFotoSubidaConCacheBust,
      };

      const resultado = await actualizar(user.id, datosActualizados);

      if (resultado) {
        const nuevoUsuario = { ...user, ...datosActualizados };
        localStorage.setItem("user", JSON.stringify(nuevoUsuario));
        onFotoActualizada(urlFotoSubidaConCacheBust);
        alert("Foto actualizada correctamente");
        window.location.reload();
      } else {
        alert("No se pudo actualizar el usuario");
      }
    } catch (error) {
      console.error("Error al subir la imagen o actualizar usuario:", error);
      alert("Error al subir la imagen o actualizar los datos");
    }
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
                  style={{
                    width: "150px",
                    height: "150px",
                    objectFit: "cover",
                  }}
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
                onClick={handleGuardar}>
                GUARDAR
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CambiarFoto;
