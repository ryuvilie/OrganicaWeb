import { Router } from 'express';
const r = Router();

const data = [
  { id: 1, name: 'Producto A', price: 1990 },
  { id: 2, name: 'Producto B', price: 2990 },
  { id: 3, name: 'Producto C', price: 3990 },
];

r.get('/', (_req, res) => res.json(data));

r.post('/', (req, res) => {
  const { name, price } = req.body || {};
  if (!name || typeof price !== 'number') {
    return res.status(400).json({ error: 'name y price son requeridos' });
  }
  const id = data.length ? Math.max(...data.map(p => p.id)) + 1 : 1;
  const nuevo = { id, name, price };
  data.push(nuevo);
  res.status(201).json(nuevo);
});

export default r;
