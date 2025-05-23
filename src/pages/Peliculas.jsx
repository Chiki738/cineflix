// src/pages/Peliculas.jsx
import PeliculasCard from "../components/PeliculasCard";
import usePeliculas from "../hooks/usePeliculas";

function Peliculas() {
  const { peliculas, cargando, error } = usePeliculas();

  if (cargando) return <p className="text-white text-center">Cargando...</p>;
  if (error) return <p className="text-danger text-center">Error: {error}</p>;

  return (
    <div className="min-vh-100 d-flex flex-wrap align-items-stretch p-3 bg-black">
      {peliculas.map((peli) => (
        <PeliculasCard
          key={peli.id}
          id={peli.id} // ✅ Agregado
          titulo={peli.titulo}
          portada={peli.portada}
        />
      ))}
    </div>
  );
}

export default Peliculas;
