import { httpGet } from './http';
import { productos as mockProductos } from '../data/productos';

export const apiProducts = {
  async list() {
    try {
      // intenta API real
      if (process.env.REACT_APP_API_URL) {
        return await httpGet('/products');
      }
      // si no hay URL, usa mock
      return mockProductos;
    } catch (err) {
      // si la API falla, usa mock (no rompemos la UI)
      console.warn('[apiProducts.list] usando mock por error:', err?.message);
      return mockProductos;
    }
  },
};
