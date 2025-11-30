import React from 'react';
import { Routes, Route } from 'react-router-dom';

import SiteNavbar from './components/Navbar';
import Home from './pages/Home';
import Productos from './pages/Productos';
import Catalogo from './pages/Catalogo';
import Carrito from './pages/Carrito';
import Registro from './pages/Registro';
import Contacto from "./pages/Contacto";
import Footer from './components/Footer';
import Ofertas from "./pages/Ofertas";
import AdminProductos from "./pages/AdminProductos";
import Perfil from "./pages/Perfil";
import PrivateRouteAdmin from "./routes/PrivateRouteAdmin";
import Forbidden403 from "./pages/Forbidden403";
import AdminUsuarios from "./pages/AdminUsuarios";


function App() {
  return (
    <>
      <SiteNavbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/ofertas" element={<Ofertas />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/admin/usuarios" element={<AdminUsuarios />} />



        {/* 🔐 RUTA PROTEGIDA PARA ADMIN */}
        <Route
          path="/admin/productos"
          element={
            <PrivateRouteAdmin>
              <AdminProductos />
            </PrivateRouteAdmin>
          }
        />

        {/* ❌ Ruta para acceso prohibido */}
        <Route path="/403" element={<Forbidden403 />} />

        {/* Cualquier ruta inválida → Home */}
        <Route path="*" element={<Home />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
