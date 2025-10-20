import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Joi from 'joi';
import { v4 as uuid } from 'uuid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ORDERS_PATH = path.join(__dirname, '../../db/orders.json');

// Esquema de validación para la orden
const orderSchema = Joi.object({
  customer: Joi.object({
    name: Joi.string().min(2).required(),
    email: Joi.string().email().required()
  }).required(),
  items: Joi.array().items(
    Joi.object({
      id: Joi.string().required(),
      name: Joi.string().required(),
      price: Joi.number().min(0).required(),
      qty: Joi.number().integer().min(1).required()
    })
  ).min(1).required()
});

export function createOrder(req, res, next) {
  try {
    const { error, value } = orderSchema.validate(req.body, { abortEarly: false });
    if (error) {
      error.status = 400;
      error.message = 'Validación fallida: ' + error.details.map(d => d.message).join(', ');
      throw error;
    }

    const raw = fs.readFileSync(ORDERS_PATH, 'utf-8');
    const orders = JSON.parse(raw);

    const newOrder = {
      id: uuid(),
      ...value,
      total: value.items.reduce((acc, it) => acc + it.price * it.qty, 0),
      createdAt: new Date().toISOString()
    };

    orders.push(newOrder);
    fs.writeFileSync(ORDERS_PATH, JSON.stringify(orders, null, 2));

    res.status(201).json(newOrder);
  } catch (err) {
    next(err);
  }
}
