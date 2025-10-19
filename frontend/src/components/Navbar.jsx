import { Link } from 'react-router-dom';

export default function Navbar(){
  return (
    <nav className="navbar">
      <Link to="/" className="brand">Mi Tienda</Link>
      <div className="links">
        <Link to="/catalogo">Catálogo</Link>
        <Link to="/carrito">Carrito</Link>
      </div>
    </nav>
  );
}
