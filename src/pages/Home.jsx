import dragonball from "../assets/img/dragonball.jpg";
import PeliculasCard from "../components/PeliculasCard";
import usePeliculas from "../hooks/usePeliculas";

function Home() {
  const { peliculas, cargando, error } = usePeliculas();

  // Agrupar películas por categoría
  const peliculasPorCategoria = peliculas.reduce((acc, pelicula) => {
    const categoria = pelicula.categoria;
    if (!acc[categoria]) acc[categoria] = [];
    acc[categoria].push(pelicula);
    return acc;
  }, {});

  // Obtener todas las categorías únicas desde las películas
  const categorias = [...new Set(peliculas.map((p) => p.categoria))];

  return (
    <div className="min-vh-100 bg-black pt-3 pb-5 pt-sm-0">
      {/* Fondo principal con opacidad */}
      <div
        className="w-100 mb-5 d-none d-sm-block position-relative"
        style={{ minHeight: "100vh" }}>
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            backgroundImage: `url(${dragonball})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            opacity: 0.4,
            zIndex: 0,
            pointerEvents: "none",
          }}></div>

        {/* Contenido sobre fondo */}
        <div className="d-flex flex-column justify-content-center align-items-start vh-100 ps-3">
          <div style={{ width: "50%", zIndex: 1 }}>
            <h3 className="display-2 text-white fw-bold">DRAGON BALL</h3>
            <p className="text-white">
              An ancient struggle between two Cybertronian races, the heroic
              Autobots and the evil Decepticons, comes to Earth...
            </p>
            <p className="display-5 text-white">⭐ 10/10</p>

            <button
              className="btn btn-success w-75 mb-3 text-black"
              data-bs-toggle="modal"
              data-bs-target="#modalGuardarLista">
              GUARDAR EN LISTA
            </button>

            <button
              className="btn btn-info w-75 text-black"
              data-bs-toggle="modal"
              data-bs-target="#modalVerPelicula">
              VER
            </button>
          </div>
        </div>
      </div>

      {/* Cargando/Error */}
      {cargando && <p className="text-white text-center">Cargando...</p>}
      {error && <p className="text-danger text-center">Error: {error}</p>}

      {/* Carruseles por categoría */}
      {!cargando &&
        categorias.map((categoria) => {
          const pelis = peliculasPorCategoria[categoria] || [];
          if (pelis.length === 0) return null;

          return (
            <div className="ps-3 pe-3 mb-4" key={categoria}>
              <h3 className="text-white">{categoria}</h3>
              <div
                className="d-flex overflow-auto gap-3 py-2"
                style={{
                  scrollSnapType: "x mandatory",
                  whiteSpace: "nowrap",
                }}>
                {pelis.map((peli) => (
                  <div
                    key={peli.id}
                    style={{
                      flex: "0 0 auto",
                      scrollSnapAlign: "start",
                    }}>
                    <PeliculasCard
                      titulo={peli.titulo}
                      portada={peli.portada}
                      id={peli.id}
                    />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default Home;
