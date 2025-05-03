import { Link } from "react-router-dom";
import Header from "../components/Header.jsx";
import Landing from "../pages/Landing.jsx";
import Footer from "../components/Footer.jsx";
import "../assets/styles/LandingLayout.css";

function LandingLayout() {
  return (
    <>
      <Header redirectTo="/">
        <Link to="/Login">
          <button className="px-sm-4 py-1 text-dark fw-bold btnLogin rounded-3 border-success">
            Iniciar sesión
          </button>
        </Link>
      </Header>
      <Landing />
      <Footer />
    </>
  );
}

export default LandingLayout;
