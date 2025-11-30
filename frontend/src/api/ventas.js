// src/api/ventas.js
import { apiPost } from "./client";

export const apiVentas = {
  async crearVenta(payload) {
    return apiPost("/api/ventas", payload);
  },
};
