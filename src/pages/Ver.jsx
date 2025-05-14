import FotoPortada from "../assets/img/transformers.jpg";

function Ver() {
  return (
    <div className="min-vh-100 bg-black p-4">
      <div className="d-flex mb-5">
        <div className="me-5">
          <img src={FotoPortada} class="img-thumbnail" alt="..."></img>
        </div>

        <div className="w-75">
          <h3 className="text-white display-4">TRANFORMERS</h3>
          <p className="text-white fs-4">⭐ 7.1/10</p>
          <p className="fs-4 text-white">
            An ancient struggle between two Cybertronian races, the heroic
            Autobots and the evil Decepticons, comes to Earth...
          </p>
          <p>
            AÑO: <p className="text-white">03 Jul 2007</p>
          </p>
          <p>
            Duracción: <p className="text-white">120 min</p>
          </p>
          <p>
            Genero: <p className="text-white">Action, Adventure, Sci-Fi</p>
          </p>
        </div>
      </div>

      <div class="ratio ratio-16x9">
        <iframe
          src="https://www.youtube.com/embed/zpOULjyy-n8?rel=0"
          title="YouTube video"
          allowfullscreen></iframe>
      </div>
    </div>
  );
}

export default Ver;
