import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useUser } from "../context/UserContext";
import "../styles/Navbar.css";

const SiteNavbar = () => {
  const { cartItems } = useCart();
  const cantidadTotal = cartItems.reduce((sum, item) => sum + item.cantidad, 0);

  const { usuario, isAdmin, isVendedor, logout } = useUser();

  const nombreMostrar =
    usuario?.nombre || usuario?.correo || usuario?.email || "";

  return (
    <header className="navbar">
      <div className="container header-inner">
        {/* Brand */}
        <div className="brand">
          <div className="logo">
            <img
              src="/assets/img/logo.png"
              alt="logo zanahoria"
              className="logo-icon"
            />
            <Link to="/" className="logo-text">
              Orgánica
            </Link>
          </div>
          <div className="tagline">Productos frescos del campo a tu mesa</div>
        </div>

        {/* Nav */}
        <nav aria-label="Principal" className="nav-menu">
          <ul>
            <li>
              <NavLink to="/" end>
                Inicio
              </NavLink>
            </li>

            <li>
              <NavLink to="/catalogo">Productos</NavLink>
            </li>

            <li>
              <NavLink to="/contacto">Contacto</NavLink>
            </li>

            {/* 🧾 VENTAS — SOLO VENDEDOR / ADMIN */}
            {(isVendedor || isAdmin) && (
              <li>
                <NavLink to="/vendedor/ventas">Ventas</NavLink>
              </li>
            )}

            {/* ⚙️ ADMIN */}
            {isAdmin && (
              <li>
                <NavLink to="/admin/productos">
                  Administrar productos
                </NavLink>
              </li>
            )}
          </ul>
        </nav>

        {/* Ícono de carrito + usuario */}
        <div className="nav-actions">
          {/* Carrito */}
          <div className="nav-cart">
            <Link to="/carrito" className="cart-link">
              🛒
              {cantidadTotal > 0 && (
                <span className="cart-badge">{cantidadTotal}</span>
              )}
            </Link>
          </div>

          {/* Usuario */}
          <div className="user-info">
            {usuario ? (
              <>
                <Link to="/perfil" className="user-bienvenida perfil-link">
                  👋 {nombreMostrar}
                </Link>

                <button onClick={logout} className="btn-logout">
                  Cerrar sesión
                </button>
              </>
            ) : (
              <Link to="/registro" className="btn-login">
                Iniciar sesión
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default SiteNavbar;
