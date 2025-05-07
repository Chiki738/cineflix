import HeaderMain from "../components/headers/HeaderMain";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

function MainLayout() {
  return (
    <>
      <HeaderMain />
      <div style={{ marginTop: "68px" }}>
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default MainLayout;
