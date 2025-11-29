import React, { useEffect, useState } from "react";
import { apiProducts } from "../api/products";
import ProductCard from "../components/ProductCard";

const Productos = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        setError(null);
        // 👇 ahora viene del backend: GET http://localhost:9090/api/productos
        const data = await apiProducts.list();
        setItems(data || []);
      } catch (err) {
        console.error("Error al cargar los productos (Productos.jsx):", err);
        setError("Error al cargar los productos");
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <main className="container" style={{ padding: "24px 0" }}>
        <p>Cargando productos...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="container" style={{ padding: "24px 0" }}>
        <p>{error}</p>
      </main>
    );
  }

  return (
    <main className="container" style={{ padding: "24px 0" }}>
      <h1>Productos</h1>
      <div className="grid" style={{ marginTop: "16px" }}>
        {items.map((p) => (
          <ProductCard key={p.id} producto={p} />
        ))}
      </div>
    </main>
  );
};

export default Productos;
