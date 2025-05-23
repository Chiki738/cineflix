import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingLayout from "./layouts/LandingLayout";
import AuthLayout from "./layouts/AuthLayout";
import Registro from "./pages/Registro";
import Planes from "./pages/Planes";
import Login from "./pages/Login";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Perfil from "./pages/Perfil";
import Peliculas from "./pages/Peliculas";
import Series from "./pages/Series";
import Ver from "./pages/Ver";
import InformacionLayout from "./layouts/InformacionLayout";
import Historial from "./pages/Historial";
import Lista from "./pages/Lista";
import AdminLayout from "./layouts/AdminLayout";
import PeliculasAdmin from "./pages/PeliculasAdmin";
import SeriesAdmin from "./pages/SeriesAdmin";
import ProtectedRoute from "../src/routes/ProtectedRoute";
import Analisis from "./pages/Analisis";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<LandingLayout />} />

        <Route
          path="/Registro"
          element={
            <AuthLayout>
              <Registro />
            </AuthLayout>
          }
        />
        <Route path="/Planes" element={<Planes />} />
        <Route
          path="/Login"
          element={
            <AuthLayout>
              <Login />
            </AuthLayout>
          }
        />

        {/* Rutas protegidas para usuarios con rol USER */}
        <Route element={<ProtectedRoute allowedRoles={["USER"]} />}>
          <Route element={<MainLayout />}>
            <Route path="/Home" element={<Home />} />
            <Route path="/Perfil" element={<Perfil />}>
              <Route index path="Informacion" element={<InformacionLayout />} />
              <Route path="Historial" element={<Historial />} />
              <Route path="Lista" element={<Lista />} />
            </Route>
            <Route path="/Peliculas" element={<Peliculas />} />
            <Route path="/Series" element={<Series />} />
            <Route path="/peliculas/:id" element={<Ver />} />
          </Route>
        </Route>

        {/* Rutas protegidas para rol ADMIN */}
        <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
          <Route element={<AdminLayout />}>
            <Route path="/PeliculasAdmin" element={<PeliculasAdmin />} />
            <Route path="/SeriesAdmin" element={<SeriesAdmin />} />
            <Route path="/Analisis" element={<Analisis />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
