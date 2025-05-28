import ContenidoCard from "./ContenidoCard";

function SeriesCard({ id, titulo, portada }) {
  return (
    <ContenidoCard
      id={id}
      titulo={titulo}
      portada={portada}
      tipo="serie"
    />
  );
}

export default SeriesCard;
