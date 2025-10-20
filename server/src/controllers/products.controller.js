import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_PATH = path.join(__dirname, '../../db/products.json');

export function getAllProducts(req, res) {
  const raw = fs.readFileSync(DB_PATH, 'utf-8');
  const products = JSON.parse(raw);
  res.json(products);
}

export function getProductById(req, res) {
  const { id } = req.params;
  const raw = fs.readFileSync(DB_PATH, 'utf-8');
  const products = JSON.parse(raw);
  const found = products.find(p => p.id === id);
  if (!found) return res.status(404).json({ error: 'Producto no encontrado' });
  res.json(found);
}
