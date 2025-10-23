import React from 'react';
import { Routes, Route } from 'react-router-dom';

import SiteNavbar from './components/Navbar';
import Home from './pages/Home';
import Productos from './pages/Productos';
import Catalogo from './pages/Catalogo';   // 👈 agregado
import Carrito from './pages/Carrito';
import Registro from './pages/Registro';
import Contacto from "./pages/Contacto";
import Footer from './components/Footer';
import Ofertas from "./pages/Ofertas";

function App() {
  return (
    <>
      <SiteNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/catalogo" element={<Catalogo />} /> {/* 👈 agregado */}
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/ofertas" element={<Ofertas />} />
        {/* fallback */}
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />  
    </>
  );
}

export default App;
