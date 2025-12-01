// src/api/ventas.js
import { apiPost } from "./client";

export const apiVentas = {
  async finalizarCompra(payload) {
    // Backend: POST /api/ventas/finalizar
    return apiPost("/api/ventas/finalizar", payload);
  },
};
