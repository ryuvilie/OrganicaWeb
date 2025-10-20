import React from 'react';
import { Routes, Route } from 'react-router-dom';

import SiteNavbar from './components/Navbar';
import Home from './pages/Home';
import Productos from './pages/Productos';
import Carrito from './pages/Carrito';
import Registro from './pages/Registro';

function App() {
  return (
    <>
      <SiteNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/registro" element={<Registro />} />
        {/* fallback */}
        <Route path="*" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
