import { useState, useEffect } from "react";
import { useTemporada } from "../../hooks/useTemporada";
import { useSeries } from "../../hooks/useSeries";

function AgregarCapitulo({ nombreSerie }) {
  const [numeroTemporada, setNumeroTemporada] = useState("");
  const { episodios, fetchTemporada, loading, error } = useTemporada();
  const { guardarTemporada } = useSeries();
  const [mensaje, setMensaje] = useState("");

  // En el hook useTemporada, envuelve fetchTemporada en useCallback
  // para evitar que cambie de referencia sin necesidad (te lo muestro abajo).

  useEffect(() => {
    if (numeroTemporada.trim() && !isNaN(numeroTemporada)) {
      fetchTemporada(nombreSerie, numeroTemporada);
    }
  }, [numeroTemporada, fetchTemporada, nombreSerie]);

  const handleGuardar = async () => {
    try {
      const filtrados = episodios.filter(
        (ep) => ep.Episode !== "0" && ep.Title !== "Unaired Original Pilot"
      );
      await guardarTemporada(nombreSerie, numeroTemporada, filtrados);
      setMensaje("Temporada guardada correctamente");
    } catch (err) {
      setMensaje(`Error: ${err.message}`);
    }
  };

  return (
    <div className="modal fade" id="modalAgregarCapitulo" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Agregar temporada</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"></button>
          </div>

          <div className="modal-body">
            {/* Inputs */}
            <div className="mb-3 row">
              <label className="col-sm-3 col-form-label">
                Nombre de la Serie
              </label>
              <div className="col-sm-9">
                <input
                  type="text"
                  readOnly
                  className="form-control-plaintext"
                  value={nombreSerie}
                />
              </div>
            </div>

            <div className="mb-3 row">
              <label className="col-sm-3 col-form-label">
                Número de temporada
              </label>
              <div className="col-sm-9">
                <input
                  type="number"
                  className="form-control"
                  value={numeroTemporada}
                  onChange={(e) => setNumeroTemporada(e.target.value)}
                />
              </div>
            </div>

            {loading && <p>Cargando episodios...</p>}
            {error && <p className="text-danger">{error}</p>}
            {mensaje && <p>{mensaje}</p>}

            {/* Tabla de episodios */}
            <table className="table mt-3">
              <thead>
                <tr>
                  <th>Episodio</th>
                  <th>Título</th>
                  <th>Fecha</th>
                  <th>Rating</th>
                </tr>
              </thead>
              <tbody>
                {episodios
                  .filter(
                    (ep) =>
                      ep.Episode !== "0" &&
                      ep.Title !== "Unaired Original Pilot"
                  )
                  .map((ep) => (
                    <tr key={ep.imdbID}>
                      <td>{ep.Episode}</td>
                      <td>{ep.Title}</td>
                      <td>{ep.Released}</td>
                      <td>{ep.imdbRating}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal">
              Cerrar
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleGuardar}>
              Guardar cambios
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AgregarCapitulo;
