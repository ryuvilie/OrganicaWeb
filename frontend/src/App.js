import React from 'react';
import { Routes, Route } from 'react-router-dom';

import ProductoDetalle from "./pages/ProductoDetalle";
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
import Forbidden403 from "./pages/Forbidden403";
import AdminUsuarios from "./pages/AdminUsuarios";
import VendedorVentas from "./pages/VendedorVentas";

import PrivateRouteAdmin from "./routes/PrivateRouteAdmin";
import PrivateRouteVendedor from "./routes/PrivateRouteVendedor";

function App() {
  return (
    <>
      <SiteNavbar />

      <Routes>
        <Route path="/productos/:id" element={<ProductoDetalle />} />
        <Route path="/" element={<Home />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/ofertas" element={<Ofertas />} />
        <Route path="/perfil" element={<Perfil />} />

        {/* 🔐 ADMIN */}
        <Route
          path="/admin/productos"
          element={
            <PrivateRouteAdmin>
              <AdminProductos />
            </PrivateRouteAdmin>
          }
        />

        <Route
          path="/admin/usuarios"
          element={
            <PrivateRouteAdmin>
              <AdminUsuarios />
            </PrivateRouteAdmin>
          }
        />

        {/* 🧾 VENDEDOR */}
        <Route
          path="/vendedor/ventas"
          element={
            <PrivateRouteVendedor>
              <VendedorVentas />
            </PrivateRouteVendedor>
          }
        />

        {/* ❌ Acceso prohibido */}
        <Route path="/403" element={<Forbidden403 />} />

        {/* Fallback */}
        <Route path="*" element={<Home />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
