// src/pages/Peliculas.jsx
import PeliculasCard from "../components/PeliculasCard";
import usePeliculas from "../hooks/usePeliculas";

function Peliculas() {
  const { peliculas, cargando, error } = usePeliculas();

  if (cargando) {
    return <p className="page-shell text-white text-center">Cargando películas...</p>;
  }

  if (error) {
    return <p className="page-shell text-danger text-center">Error: {error}</p>;
  }

  return (
    <main className="page-shell">
      <div className="container-fluid">
        <div className="mb-4">
          <p className="section-kicker mb-2">Catálogo</p>
          <h1 className="section-title mb-0">Películas</h1>
          <p className="text-muted-soft mb-0">
            Historias para maratonear, descubrir o volver a ver.
          </p>
        </div>

        <div className="content-grid">
      {peliculas.map((peli) => (
        <PeliculasCard
          key={peli.id}
          id={peli.id}
          titulo={peli.titulo}
          portada={peli.portada}
        />
      ))}
        </div>
      </div>
    </main>
  );
}

export default Peliculas;
