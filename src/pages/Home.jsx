import { useRef } from "react";
import dragonball from "../assets/img/dragonball.jpg";
import PeliculasCard from "../components/PeliculasCard";

function Home() {
  // Refs para cada carrusel
  const scrollRefs = useRef({});

  // Función para manejar el drag
  const handleMouseEvents = (e, categoria, type) => {
    const el = scrollRefs.current[categoria];
    if (!el) return;

    if (type === "down") {
      el.isDown = true;
      el.startX = e.pageX - el.offsetLeft;
      el.scrollLeftStart = el.scrollLeft;
    }

    if (type === "leave" || type === "up") {
      el.isDown = false;
    }

    if (type === "move") {
      if (!el.isDown) return;
      e.preventDefault();
      const x = e.pageX - el.offsetLeft;
      const walk = (x - el.startX) * 2; // velocidad
      el.scrollLeft = el.scrollLeftStart - walk;
    }
  };

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

      {/* Carrusel por categoría */}
      {["Historial", "Horror", "Aventura", "Suspenso"].map((categoria) => (
        <div className="ps-3 pe-3 mb-4" key={categoria}>
          <h3 className="text-white">{categoria}</h3>
          <div
            ref={(el) => (scrollRefs.current[categoria] = el)}
            className="d-flex gap-3 py-2 no-scrollbar"
            style={{
              overflowX: "auto",
              whiteSpace: "nowrap",
              scrollSnapType: "x mandatory",
              cursor: "grab",
            }}
            onMouseDown={(e) => handleMouseEvents(e, categoria, "down")}
            onMouseLeave={(e) => handleMouseEvents(e, categoria, "leave")}
            onMouseUp={(e) => handleMouseEvents(e, categoria, "up")}
            onMouseMove={(e) => handleMouseEvents(e, categoria, "move")}>
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                style={{ flex: "0 0 auto", scrollSnapAlign: "start" }}>
                <PeliculasCard />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Home;
