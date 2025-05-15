import HeaderAdmin from "../components/headers/HeaderAdmin";
import { Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <>
      <HeaderAdmin />
      <Outlet />
    </>
  );
}

export default AdminLayout;
