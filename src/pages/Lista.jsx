import { useEffect, useState } from "react";
import { useListaUsuario } from "../hooks/useListaUsuario";
import { useCargarPeliculaPorId } from "../hooks/useCargarPeliculaPorId";
import { useCargarSeriePorId } from "../hooks/useCargarSeriePorId";
import ContenidoCard from "../components/ContenidoCard";

function Lista() {
  const [listaFiltrada, setListaFiltrada] = useState([]);
  const { lista, cargando, error, obtenerPorUsuario, eliminar } =
    useListaUsuario();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) return;

    const cargarLista = async () => {
      await obtenerPorUsuario(user.id);
    };

    cargarLista();
  }, [user?.id]);

  // Filtrar y mantener solo el más reciente (igual que historial)
  useEffect(() => {
    if (!lista.length) {
      setListaFiltrada([]);
      return;
    }

    const vistos = new Map();
    for (let i = lista.length - 1; i >= 0; i--) {
      const item = lista[i];
      const tipo = item.contenidoId.startsWith("MOV")
        ? "pelicula"
        : item.contenidoId.startsWith("SER")
        ? "serie"
        : null;
      if (!tipo) continue;

      if (!vistos.has(item.contenidoId)) {
        vistos.set(item.contenidoId, { contenidoId: item.contenidoId, tipo });
      }
    }
    setListaFiltrada(Array.from(vistos.values()));
  }, [lista]);

  const handleEliminar = async (contenidoId) => {
    try {
      await eliminar(user.id, contenidoId);
      alert("Eliminado de la lista");
    } catch {
      alert("Error al eliminar de la lista");
    }
  };

  if (!user) return <p>Debes iniciar sesión</p>;
  if (cargando) return <p>Cargando lista...</p>;
  if (error) return <p>{error}</p>;
  if (!listaFiltrada.length) return <p>No hay contenido en tu lista.</p>;

  return (
    <div className="d-flex flex-wrap align-items-start justify-content-center">
      {listaFiltrada.map(({ contenidoId, tipo }, index) => (
        <ContenidoCardWrapper
          key={`${tipo}-${contenidoId}-${index}`}
          id={contenidoId}
          tipo={tipo}
          onEliminar={() => handleEliminar(contenidoId)}
        />
      ))}
    </div>
  );
}

function ContenidoCardWrapper({ id, tipo, onEliminar }) {
  const hook =
    tipo === "pelicula" ? useCargarPeliculaPorId : useCargarSeriePorId;
  const { pelicula, serie, cargando, error } = hook(id);

  const datos = pelicula || serie;

  if (cargando) return <p>Cargando {tipo}...</p>;
  if (error || !datos) return <p>Error al cargar {tipo}</p>;

  const portada = tipo === "pelicula" ? datos.portada : datos.imagen;

  return (
    <ContenidoCard
      id={id}
      titulo={datos.titulo}
      portada={portada}
      tipo={tipo}
      enHistorial={false}
      onEliminar={onEliminar}
      mostrarAgregarLista={false} // Ocultar botón agregar en esta vista
    />
  );
}

export default Lista;
