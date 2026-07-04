import { Play, Plus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLista } from "../hooks/useLista";
import { useHistorial } from "../hooks/useHistorial";
import { getStoredUser } from "../utils/storage";

function ContenidoCard({
  id,
  titulo,
  portada,
  tipo,
  enHistorial = false,
  mostrarAgregarLista = true,
  onEliminar,
}) {
  const { agregar: agregarALista } = useLista();
  const { agregar: agregarAHistorial } = useHistorial();
  const navigate = useNavigate();
  const user = getStoredUser();
  const detallePath = `/${tipo === "serie" ? "series" : "peliculas"}/${id}`;

  const handleGuardarLista = async () => {
    if (!user) {
      alert("Debes iniciar sesión para guardar en lista");
      return;
    }
    try {
      await agregarALista(user.id, id);
      alert("¡Agregado a tu lista para ver más tarde!");
    } catch (error) {
      alert("Error al agregar a la lista");
      console.error(error);
    }
  };

  const handleEliminar = async () => {
    onEliminar?.();
  };

  const handleVer = () => {
    if (user) {
      agregarAHistorial(user.id, id).finally(() => {
        navigate(detallePath);
      });
    } else {
      navigate(detallePath);
    }
  };

  return (
    <article className="content-card">
      <div className="content-card__poster">
        <img
          src={portada}
          alt={titulo}
          loading="lazy"
        />
      </div>

      <div className="content-card__body">
        <h3 className="content-card__title" title={titulo}>
          {titulo}
        </h3>

        <div className="d-flex flex-column align-items-stretch gap-2 mt-3">
          {mostrarAgregarLista && !enHistorial && (
            <button
              className="btn btn-cine d-inline-flex align-items-center justify-content-center gap-2"
              onClick={handleGuardarLista}>
              <Plus size={17} />
              Mi lista
            </button>
          )}

          {onEliminar && (
            <button className="btn btn-danger d-inline-flex align-items-center justify-content-center gap-2" onClick={handleEliminar}>
              <Trash2 size={17} />
              Quitar
            </button>
          )}

          <button className="btn btn-ghost d-inline-flex align-items-center justify-content-center gap-2" onClick={handleVer}>
            <Play size={17} />
            Ver
          </button>
        </div>
      </div>
    </article>
  );
}

export default ContenidoCard;
