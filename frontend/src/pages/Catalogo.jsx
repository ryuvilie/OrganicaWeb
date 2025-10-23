import React, { useState } from "react";
import productos from "../data/productos";
import ProductCard from "../components/ProductCard";
import "../styles/Catalogo.css";

const Catalogo = () => {
  const [categoria, setCategoria] = useState("Todos");

  const categorias = ["Todos", "Frutas", "Verduras", "Semillas", "Otros"];

  const productosFiltrados =
    categoria === "Todos"
      ? productos
      : productos.filter((p) => p.categoria === categoria);

  return (
    <main className="catalogo-container">
      <h1>Catálogo de Productos</h1>

      <div className="filtros">
        {categorias.map((cat) => (
          <button
            key={cat}
            className={`filtro-btn ${categoria === cat ? "activo" : ""}`}
            onClick={() => setCategoria(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="productos-grid">
        {productosFiltrados.map((producto) => (
          <ProductCard key={producto.id} producto={producto} />
        ))}
      </div>
    </main>
  );
};

export default Catalogo;
