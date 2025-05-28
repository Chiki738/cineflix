import { useEffect, useState } from "react";
import { useHistorialUsuario } from "../hooks/useHistorialUsuario";
import { useCargarPeliculaPorId } from "../hooks/useCargarPeliculaPorId";
import { useCargarSeriePorId } from "../hooks/useCargarSeriePorId";
import ContenidoCard from "../components/ContenidoCard";

function Historial() {
  const [historial, setHistorial] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const { obtenerPorUsuario } = useHistorialUsuario();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      setError("Debes iniciar sesión");
      setCargando(false);
      return;
    }

    const fetchHistorial = async () => {
      try {
        setCargando(true);
        const data = await obtenerPorUsuario(user.id);

        const vistos = new Map();

        // Recorrer de atrás hacia adelante para que el más reciente quede primero
        for (let i = data.length - 1; i >= 0; i--) {
          const item = data[i];
          const tipo = item.contenidoId.startsWith("MOV")
            ? "pelicula"
            : item.contenidoId.startsWith("SER")
            ? "serie"
            : null;
          if (!tipo) continue;

          if (!vistos.has(item.contenidoId)) {
            vistos.set(item.contenidoId, {
              contenidoId: item.contenidoId,
              tipo,
            });
          }
        }

        setHistorial(Array.from(vistos.values()));
      } catch (e) {
        console.error(e);
        setError("Error al cargar historial");
      } finally {
        setCargando(false);
      }
    };

    fetchHistorial();
  }, []);

  if (cargando) return <p>Cargando historial...</p>;
  if (error) return <p>{error}</p>;
  if (!historial.length) return <p>No hay historial aún.</p>;

  return (
    <div className="d-flex flex-wrap align-items-start justify-content-center">
      {historial.map(({ contenidoId, tipo }, index) => (
        <ContenidoCardWrapper
          key={`${tipo}-${contenidoId}-${index}`}
          id={contenidoId}
          tipo={tipo}
        />
      ))}
    </div>
  );
}

function ContenidoCardWrapper({ id, tipo }) {
  const hook =
    tipo === "pelicula" ? useCargarPeliculaPorId : useCargarSeriePorId;
  const {
    pelicula: contenido,
    serie: contenidoSerie,
    cargando,
    error,
  } = hook(id);

  const datos = contenido || contenidoSerie;

  if (cargando) return <p>Cargando {tipo}...</p>;
  if (error || !datos) return <p>Error al cargar {tipo}</p>;

  // portada para películas, imagen para series
  const portada = tipo === "pelicula" ? datos.portada : datos.imagen;

  return (
    <ContenidoCard
      id={id}
      titulo={datos.titulo}
      portada={portada}
      tipo={tipo}
      enHistorial={true} // para ocultar botón "Guardar en lista"
    />
  );
}

export default Historial;
