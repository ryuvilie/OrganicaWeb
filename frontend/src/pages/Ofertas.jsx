import React from "react";
import { apiProducts } from "../api/products";  
import ProductCard from "../components/ProductCard";
import "../styles/Catalogo.css";

const Ofertas = () => {
  const ofertas = apiProducts.filter((p) => p.oferta);

  return (
    <main className="catalogo-container">
      <h1>🔥 Productos en Oferta</h1>

      <div className="productos-grid">
        {ofertas.length > 0 ? (
          ofertas.map((producto) => (
            <ProductCard key={producto.id} producto={producto} />
          ))
        ) : (
          <p>No hay productos en oferta actualmente.</p>
        )}
      </div>
    </main>
  );
};

export default Ofertas;
