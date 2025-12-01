// src/api/products.js
import { apiGet, apiPost, apiPut, apiPatch } from "./client";

export const apiProducts = {
  // listado público (solo activos)
  async list() {
    return apiGet("/api/productos");
  },

  // listado para admin que incluye inactivos
  async listAdmin() {
    return apiGet("/api/productos/admin");
  },

  async create(producto) {
    return apiPost("/api/productos", producto);
  },

  async update(id, producto) {
    return apiPut(`/api/productos/${id}`, producto);
  },

  async updateStock(id, stock) {
    return apiPatch(`/api/productos/${id}/stock`, { stock });
  },

  async updatePrice(id, precio) {
    return apiPatch(`/api/productos/${id}/precio`, { precio });
  },

  // ❌ eliminar real
  // async remove(id) {
  //   return apiDelete(`/api/productos/${id}`);
  // }

  // ✅ eliminación lógica (nuevo)
  async deactivate(id) {
    return apiPut(`/api/productos/${id}/desactivar`);
  },
};
