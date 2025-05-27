import "../assets/styles/Footer.css";
import politicas from "../assets/pdf/politicas.pdf";
import terminos from "../assets/pdf/terminos.pdf";

function Footer() {
  return (
    <footer className="bg-dark text-white py-3">
      <div className="d-flex flex-sm-row flex-column justify-content-evenly align-items-center">
        <ul className="p-0 mb-4 mb-sm-0 list-unstyled">
          <li className="p-1">
            <a href={politicas} target="_blank" rel="noopener noreferrer" className="text-white text-decoration-none">
              Política de Privacidad
            </a>
          </li>
          <li className="p-1">
            <a href={terminos} target="_blank" rel="noopener noreferrer" className="text-white text-decoration-none">
              Términos y Condiciones
            </a>
          </li>
        </ul>

        <div className="redesEnlace justify-content-center flex-wrap mb-4 mb-sm-0 d-flex gap-3">
          <a
            href="https://www.facebook.com/"
            target="_blank"
            title="Facebook"
            aria-label="Facebook"
            rel="noopener noreferrer">
            <i
              className="fa-brands fa-facebook rounded-2 p-1"
              id="facebook"></i>
          </a>

          <a
            href="https://www.instagram.com/"
            title="Instagram"
            aria-label="Instagram"
            target="_blank"
            rel="noopener noreferrer">
            <i
              className="fa-brands fa-instagram rounded-2 p-1"
              id="instagram"></i>
          </a>

          <a
            href="https://x.com/"
            title="Twitter"
            aria-label="Twitter"
            target="_blank"
            rel="noopener noreferrer">
            <i
              className="fa-brands fa-x-twitter rounded-2 p-1"
              id="twitter"></i>
          </a>

          <a
            href="https://mail.google.com"
            title="Gmail"
            aria-label="Gmail"
            target="_blank"
            rel="noopener noreferrer">
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
