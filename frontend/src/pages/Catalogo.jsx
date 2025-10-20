import { useEffect, useState } from 'react';
import { apiProducts } from '../api/products';

export default function Catalogo(){
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    apiProducts.list().then(data => {
      if (alive) setItems(data);
    }).finally(() => {
      if (alive) setLoading(false);
    });
    return () => { alive = false; };
  }, []);

  if (loading) return <p>Cargando productos…</p>;

  return (
    <>
      <h3>Catálogo</h3>
      <ul>
        {items.map(p => (
          <li key={p.id || p._id}>{p.name} — ${p.price}</li>
        ))}
      </ul>
    </>
  );
}
