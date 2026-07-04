import "../assets/styles/Footer.css";
import politicas from "../assets/pdf/politicas.pdf";
import terminos from "../assets/pdf/terminos.pdf";
import { Camera, Mail, MessageCircle, Share2 } from "lucide-react";

function Footer() {
  const socialLinks = [
    { href: "https://www.facebook.com/", label: "Facebook", Icon: Share2 },
    { href: "https://www.instagram.com/", label: "Instagram", Icon: Camera },
    { href: "https://x.com/", label: "X", Icon: MessageCircle },
    { href: "mailto:hola@cineflix.local", label: "Correo", Icon: Mail },
  ];

  return (
    <footer className="footer-shell text-white py-4">
      <div className="container d-flex flex-sm-row flex-column justify-content-between align-items-center gap-4">
        <ul className="p-0 mb-4 mb-sm-0 list-unstyled">
          <li className="p-1">
            <a href={politicas} target="_blank" rel="noopener noreferrer" className="text-white text-decoration-none">
              Política de privacidad
            </a>
          </li>
          <li className="p-1">
            <a href={terminos} target="_blank" rel="noopener noreferrer" className="text-white text-decoration-none">
              Términos y condiciones
            </a>
          </li>
        </ul>

        <div className="redesEnlace justify-content-center flex-wrap mb-4 mb-sm-0 d-flex gap-3">
          {socialLinks.map(({ href, label, Icon }) => (
            <a
              href={href}
              title={label}
              aria-label={label}
              target={href.startsWith("mailto:") ? undefined : "_blank"}
              rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
              key={label}>
              <Icon size={20} />
            </a>
          ))}
        </div>
        <p className="mb-0 small text-muted-soft">
          © 2026 CineFlix. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
