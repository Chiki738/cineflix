import { useLista } from "../hooks/useLista";
import { useHistorial } from "../hooks/useHistorial";

function PeliculasCard({ id, titulo, portada }) {
  const { agregar: agregarALista } = useLista();
  const { agregar: agregarAHistorial } = useHistorial();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleGuardarLista = async () => {
    if (!user) {
      alert("Debes iniciar sesión para guardar en lista");
      return;
    }
    try {
      await agregarALista(user.id, id);
      alert("¡Agregado a tu lista para ver más tarde!");
    } catch (error) {
      alert("Error al agregar a la lista",error);
    }
  };

  const handleVer = () => {
    if (user) {
      agregarAHistorial(user.id, id).finally(() => {
        window.location.href = `/peliculas/${id}`;
      });
    } else {
      window.location.href = `/peliculas/${id}`;
    }
  };

  return (
    <div
      className="card mx-3 mb-4 bg-dark"
      style={{ width: "18rem", height: "100%" }}>
      <div
        className="text-center"
        style={{ height: "250px", overflow: "hidden" }}>
        <img
          src={portada}
          alt={titulo}
          className="rounded img-fluid"
          style={{ maxHeight: "100%", objectFit: "cover" }}
        />
      </div>

      <div
        className="card-body px-1 py-3 d-flex flex-column justify-content-between"
        style={{ height: "calc(100% - 250px)" }}>
        <h5
          className="card-title text-center text-white text-break"
          style={{
            fontSize: "1rem",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }}>
          {titulo}
        </h5>

        <div className="d-flex flex-column align-items-center gap-3 mt-3">
          <button className="btn btn-success w-75" onClick={handleGuardarLista}>
            GUARDAR EN LISTA
          </button>

          <button className="btn btn-info w-75" onClick={handleVer}>
            VER
          </button>
        </div>
      </div>
    </div>
  );
}

export default PeliculasCard;
