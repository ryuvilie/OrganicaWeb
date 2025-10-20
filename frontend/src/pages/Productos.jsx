import React, { useEffect, useState } from 'react';
import { apiGet } from '../api/client';

const Productos = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await apiGet('/products');
        setItems(data);
      } catch (err) {
        setError('Error al cargar los productos');
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  if (loading) return <main className="container" style={{ padding: '24px 0' }}><p>Cargando productos...</p></main>;
  if (error) return <main className="container" style={{ padding: '24px 0' }}><p>{error}</p></main>;

  return (
    <main className="container" style={{ padding: '24px 0' }}>
      <h1>Productos</h1>
      <div className="grid" style={{ marginTop: '16px' }}>
        {items.map((p) => (
          <article key={p.id} className="card">
            <img
              src={p.image}
              alt={p.name}
              style={{ width: '100%', borderRadius: '12px', objectFit: 'cover', marginBottom: '8px' }}
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
            <h3>{p.name}</h3>
            <p>${p.price}</p>
            <button className="btn" style={{ marginTop: '8px' }}>
              Agregar al carrito
            </button>
          </article>
        ))}
      </div>
    </main>
  );
};

export default Productos;
