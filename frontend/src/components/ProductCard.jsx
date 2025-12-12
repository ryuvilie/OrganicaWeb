import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../styles/ProductCard.css";

const ProductCard = ({ producto }) => {
  const { addToCart } = useCart();

  // ID compatible backend / mock
  const id = producto.id_producto ?? producto.id;

  // Soportar distintos nombres de campos según backend o mock
  const imageSrc =
    producto.image_url ||
    producto.imageUrl ||
    producto.imagen ||
    producto.imagenUrl ||
    producto.image ||
    "";

  const nombre = producto.nombre || producto.name || "Producto";
  const descripcion = producto.descripcion || producto.description || "";
  const categoria = producto.categoria || producto.category || "";
  const precioBase = producto.precio ?? producto.price ?? 0;

  const esOferta = Boolean(producto.oferta);

  const precioNormal = Number(precioBase) || 0;
  const precioAntiguo = Math.round(precioNormal * 1.2);

  return (
    <div className="product-card">
      {/* 🔗 ZONA CLICKEABLE → DETALLE */}
      <Link to={`/productos/${id}`} className="product-link">
        {/* Etiqueta de oferta */}
        {esOferta && <span className="badge-oferta">OFERTA 🔥</span>}

        {/* Imagen */}
        {imageSrc && (
          <img
            src={imageSrc}
            alt={nombre}
            className="product-img"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        )}

        {/* Información */}
        <h3 className="product-nombre">{nombre}</h3>
        <p className="product-desc">{descripcion}</p>

        {categoria && (
          <p className="product-categoria">Categoría: {categoria}</p>
        )}

        {/* Precio */}
        {esOferta ? (
          <p className="product-precio">
            <span className="precio-antiguo">
              ${precioAntiguo.toLocaleString("es-CL")}
            </span>{" "}
            <span className="precio-oferta">
              ${precioNormal.toLocaleString("es-CL")}
            </span>
          </p>
        ) : (
          <p className="product-precio">
            ${precioNormal.toLocaleString("es-CL")}
          </p>
        )}
      </Link>

      {/* 🛒 BOTÓN FUERA DEL LINK */}
      <button
        className="btn-agregar"
        onClick={() => addToCart(producto)}
      >
        Agregar al carrito
      </button>
    </div>
  );
};

export default ProductCard;
