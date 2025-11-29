import React from "react";
import { useCart } from "../context/CartContext";
import "../styles/ProductCard.css";

const ProductCard = ({ producto }) => {
  const { addToCart } = useCart();

  // Soportar distintos nombres de campos según vengan del backend o mock
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

  // Boolean para oferta (por si viene como 0/1, "true"/"false", etc.)
  const esOferta = Boolean(producto.oferta);

  const precioNormal = Number(precioBase) || 0;
  const precioAntiguo = Math.round(precioNormal * 1.2); // 20% más caro

  return (
    <div className="product-card">
      {/* Etiqueta de oferta */}
      {esOferta && <span className="badge-oferta">OFERTA 🔥</span>}

      {/* Imagen */}
      {imageSrc && (
        <img
          src={imageSrc}
          alt={nombre}
          className="product-img"
          onError={(e) => {
            // si la URL falla (404, etc.), escondemos la imagen
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

      {/* Botón agregar */}
      <button className="btn-agregar" onClick={() => addToCart(producto)}>
        Agregar al carrito
      </button>
    </div>
  );
};

export default ProductCard;
