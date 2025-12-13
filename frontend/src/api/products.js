import { apiGet, apiPost, apiPut, apiPatch, apiDelete } from "./client";

export const apiProducts = {
  // 📦 listado público
  async list() {
    return apiGet("/api/productos");
  },

  // 🔎 detalle por ID (para ProductoDetalle)
  async getById(id) {
    return apiGet(`/api/productos/${id}`);
  },

  // ⭐ comentario (solo CLIENTE, no se guarda en BD)
  async comentar(id, payload) {
    return apiPost(`/api/productos/${id}/comentario`, payload);
  },

  // 🔒 ADMIN
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

  async remove(id) {
    return apiDelete(`/api/productos/${id}`);
  },
};
