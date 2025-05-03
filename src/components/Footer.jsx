import "../assets/styles/Footer.css";

function Footer() {
  return (
    <footer className="bg-dark text-white py-3">
      <div className="d-flex justify-content-evenly align-items-center">
        <ul className="p-0 m-0">
          <li className="p-1">
            <a href="">Política de Privacidad</a>
          </li>
          <li className="p-1">
            <a href="">Términos y Condiciones</a>
          </li>
        </ul>

        <div className="redesEnlace d-flex justify-content-center flex-wrap">
          <a href="" title="Facebook" target="" rel="noopener noreferrer">
            <i
              className="fa-brands fa-facebook rounded-2 p-1"
              id="facebook"></i>
          </a>

          <a href="" title="Instagram" target="" rel="noopener noreferrer">
            <i className="fa-brands fa-instagram rounded-2 p-1" id="instagram"></i>
          </a>

          <a href="" title="Twitter" target="" rel="noopener noreferrer">
            <i className="fa-brands fa-x-twitter rounded-2 p-1" id="twitter"></i>
          </a>

          <a href="" title="Gmail" target="" rel="noopener noreferrer">
            <i className="fa-regular fa-envelope rounded-2 p-1" id="gmail"></i>
          </a>
        </div>
      </div>

      <p className="text-center pt-2">
        © 2025 CineFlix. Todos los derechos reservados.
      </p>
    </footer>
  );
}

export default Footer;
