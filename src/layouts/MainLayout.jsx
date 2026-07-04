import HeaderMain from "../components/headers/HeaderMain";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

function MainLayout() {
  return (
    <>
      <HeaderMain />
      <main className="app-main">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default MainLayout;
