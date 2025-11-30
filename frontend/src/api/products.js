// src/api/products.js
import { apiGet, apiPost, apiPut, apiPatch, apiDelete } from "./client";

export const apiProducts = {
  // listado público (catálogo, etc.)
  async list() {
    return apiGet("/api/productos");
  },

  // solo ADMIN
  async create(producto) {
    return apiPost("/api/productos", producto);
  },

  async update(id, producto) {
    return apiPut(`/api/productos/${id}`, producto);
  },

  async updateStock(id, stock) {
    return apiPatch(`/api/productos/${id}/stock`, { stock });
  },

  // ⭐ NUEVO: actualizar precio
  async updatePrice(id, precio) {
    return apiPatch(`/api/productos/${id}/precio`, { precio });
  },

  async remove(id) {
    return apiDelete(`/api/productos/${id}`);
  },
};
