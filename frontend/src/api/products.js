// src/api/products.js
import { httpGet } from './http';

export const apiProducts = {
  async list() {
    // Llama SIEMPRE al backend real
    return await httpGet('/api/productos');
  },
};
