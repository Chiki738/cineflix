import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingLayout from "./layouts/LandingLayout";
import AuthLayout from "./layouts/AuthLayout";
import Registro from "./pages/Registro";
import Pagos from "./pages/Pagos";
import Login from "./pages/Login";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Perfil from "./pages/Perfil";

// Importa los nuevos componentes
import Informacion from "./pages/Informacion";
import Historial from "./pages/Historial";
import Lista from "./pages/Lista";

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
        <Route path="/Pagos" element={<Pagos />} />
        <Route
          path="/Login"
          element={
            <AuthLayout>
              <Login />
            </AuthLayout>
          }
        />

        {/* Rutas con layout común */}
        <Route element={<MainLayout />}>
          <Route path="/Home" element={<Home />} />
          <Route path="/Perfil" element={<Perfil />}>
            {/* Rutas anidadas solo accesibles desde /Perfil */}
            <Route path="Informacion" element={<Informacion />} />
            <Route path="Historial" element={<Historial />} />
            <Route path="Lista" element={<Lista />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
