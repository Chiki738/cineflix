import { Link } from "react-router-dom";
import dragonball from "../assets/img/dragonball.jpg";
import PeliculasCard from "../components/PeliculasCard";
import usePeliculas from "../hooks/usePeliculas";
import { Play } from "lucide-react";

function Home() {
  const { peliculas, cargando, error } = usePeliculas();

  const peliculasPorCategoria = peliculas.reduce((acc, pelicula) => {
    const categoria = pelicula.categoria;
    if (!acc[categoria]) acc[categoria] = [];
    acc[categoria].push(pelicula);
    return acc;
  }, {});

  const categorias = [...new Set(peliculas.map((p) => p.categoria))];

  return (
    <div className="page-shell pb-5">
      <section className="home-hero position-relative overflow-hidden mb-5">
        <div
          className="position-absolute inset-0 top-0 start-0 w-100 h-100"
          style={{
            backgroundImage: `url(${dragonball})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            opacity: 0.34,
            zIndex: 0,
            pointerEvents: "none",
          }}></div>

        <div className="position-relative z-1 d-flex align-items-center h-100">
          <div className="col-12 col-lg-6 p-4 p-md-5">
            <p className="section-kicker mb-3">Destacado</p>
            <h1 className="display-3 text-white fw-bold mb-3">Dragon Ball</h1>
            <p className="text-muted-soft fs-5">
              Aventuras, poder y nostalgia en una serie que sigue reuniendo
              generaciones frente a la pantalla.
            </p>
            <p className="h3 text-white mb-4">⭐ 10/10</p>

            <Link to="/series/SER5454" className="btn btn-cine d-inline-flex align-items-center gap-2 px-4 py-2">
              <Play size={18} />
              Ver ahora
            </Link>
          </div>
        </div>
      </section>

      {cargando && <p className="text-white text-center">Cargando catálogo...</p>}
      {error && <p className="text-danger text-center">Error: {error}</p>}
      {!cargando && !error && peliculas.length === 0 && (
        <p className="text-muted-soft text-center">Aún no hay películas disponibles.</p>
      )}

      {!cargando &&
        categorias.map((categoria) => {
          const pelis = peliculasPorCategoria[categoria] || [];
          if (pelis.length === 0) return null;

          return (
            <section className="mb-4" key={categoria}>
              <h2 className="section-title mb-3">{categoria}</h2>
              <div className="horizontal-rail no-scrollbar">
                {pelis.map((peli) => (
                  <PeliculasCard
                    key={peli.id}
                    titulo={peli.titulo}
                    portada={peli.portada}
                    id={peli.id}
                  />
                ))}
              </div>
            </section>
          );
        })}
    </div>
  );
}

export default Home;
