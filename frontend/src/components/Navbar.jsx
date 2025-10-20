import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const SiteNavbar = () => {
  return (
    <header>
      <div className="container header-inner">
        {/* Brand */}
        <div>
          <Link to="/" className="logo">Orgánica</Link>
          <div className="tagline">Productos fescos del campo a tu mesa</div>
        </div>

        {/* Nav */}
        <nav aria-label="Principal">
          <ul>
            <li><NavLink to="/" end>Inicio</NavLink></li>
            <li><NavLink to="/productos">Productos</NavLink></li>
            <li><NavLink to="/carrito">Carrito</NavLink></li>
            <li><NavLink to="/registro">Registro</NavLink></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default SiteNavbar;
