import { Link } from "react-router-dom";
import { Clapperboard } from "lucide-react";

function Header() {
  return (
    <header
      className="main-header navbar px-2 px-sm-3"
      data-bs-theme="dark">
      <Link to="/" className="brand-mark text-decoration-none d-inline-flex align-items-center gap-2">
        <Clapperboard size={30} />
        <span>CineFlix</span>
      </Link>
    </header>
  );
}

export default Header;
