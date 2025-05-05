import { Link } from "react-router-dom";
import Header from "../components/Header.jsx";
import Landing from "../pages/Landing.jsx";
import Footer from "../components/Footer.jsx";
import "../assets/styles/LandingLayout.css";

function LandingLayout() {
  return (
    <>
      <Header redirectTo="/">
        <Link
          to="/"
          className="btnLogin btn px-sm-4 py-sm-1 px-2 text-dark fw-bold rounded-3 border-success">
          Iniciar sesión
        </Link>
      </Header>
      <Landing />
      <Footer />
    </>
  );
}

export default LandingLayout;
