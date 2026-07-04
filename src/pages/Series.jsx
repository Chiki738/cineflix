import SeriesCard from "../components/SeriesCard";
import { useSeries } from "../hooks/useSeries";

function Series() {
  const { series, loading, error } = useSeries();

  if (loading) {
    return <p className="page-shell text-white text-center">Cargando series...</p>;
  }

  if (error) {
    return <p className="page-shell text-danger text-center">Error: {error}</p>;
  }

  return (
    <main className="page-shell">
      <div className="container-fluid">
        <div className="mb-4">
          <p className="section-kicker mb-2">Catálogo</p>
          <h1 className="section-title mb-0">Series</h1>
          <p className="text-muted-soft mb-0">
            Temporadas completas, favoritos recientes y próximos maratones.
          </p>
        </div>

        <div className="content-grid">
          {series.map((serie) => (
            <SeriesCard
              key={serie.id}
              id={serie.id}
              titulo={serie.titulo}
              portada={serie.imagen}
            />
          ))}
        </div>
      </div>
    </main>
  );
}

export default Series;
