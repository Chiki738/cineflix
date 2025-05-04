import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

function AuthLayout({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

export default AuthLayout;
