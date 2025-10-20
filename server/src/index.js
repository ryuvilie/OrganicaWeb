import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';

import productsRoutes from './routes/products.routes.js';
import ordersRoutes from './routes/orders.routes.js';
import notFound from './middleware/notFound.js';
import errorHandler from './middleware/errorHandler.js';

dotenv.config();

const app = express();

// Middlewares base
app.use(cors({
  origin: ['http://localhost:3000'], // agrega aquí tu dominio/puerto de front
  credentials: false
}));
app.use(express.json());
app.use(morgan('dev'));

// Healthcheck
app.get('/api/health', (req, res) => res.json({ ok: true, service: 'api', ts: Date.now() }));

// Rutas
app.use('/api/products', productsRoutes);
app.use('/api/orders', ordersRoutes);

// 404 y errores
app.use(notFound);
app.use(errorHandler);

// Puerto
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
