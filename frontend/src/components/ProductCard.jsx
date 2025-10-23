import React from "react";
import { useCart } from "../context/CartContext";
import "../styles/ProductCard.css";

const ProductCard = ({ producto }) => {
  const { addToCart } = useCart();

  return (
    <div className="product-card">
      {/* Etiqueta de oferta */}
      {producto.oferta && <span className="badge-oferta">OFERTA 🔥</span>}

      {/* Imagen */}
      <img
        src={producto.imagen}
        alt={producto.nombre}
        className="product-img"
        onError={(e) => (e.target.style.display = "none")}
      />

      {/* Información */}
      <h3 className="product-nombre">{producto.nombre}</h3>
      <p className="product-desc">{producto.descripcion}</p>
      <p className="product-categoria">Categoría: {producto.categoria}</p>

      {/* Precio */}
      {producto.oferta ? (
        <p className="product-precio">
          <span className="precio-antiguo">
            ${Math.round(producto.precio * 1.2).toLocaleString("es-CL")}
          </span>{" "}
          <span className="precio-oferta">
            ${producto.precio.toLocaleString("es-CL")}
          </span>
        </p>
      ) : (
        <p className="product-precio">
          ${producto.precio.toLocaleString("es-CL")}
        </p>
      )}

      {/* Botón agregar */}
      <button className="btn-agregar" onClick={() => addToCart(producto)}>
        Agregar al carrito
      </button>
    </div>
  );
};

export default ProductCard;
