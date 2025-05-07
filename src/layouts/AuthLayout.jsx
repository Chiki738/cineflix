import HeaderSimple from "../components/headers/HeaderSimple.jsx";
import Footer from "../components/Footer.jsx";

function AuthLayout({ children }) {
  return (
    <>
      <HeaderSimple />
      {children}
      <Footer />
    </>
  );
}

export default AuthLayout;
