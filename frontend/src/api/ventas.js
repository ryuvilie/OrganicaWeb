// src/api/ventas.js
import { apiPost, apiGet } from "./client";

export const apiVentas = {
  crearVenta(data) {
    return apiPost("/api/ventas", data);
  },
  getVenta(id) {
    return apiGet(`/api/ventas/${id}`);
  },
  listar() {
    return apiGet("/api/ventas");
  },
};
