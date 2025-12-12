// src/api/ventas.js
import { apiPost, apiGet } from "./client";  // apiPost para crear, apiGet para listar

export const apiVentas = {
  async listarVentas() {
    const response = await apiGet("/api/ventas");
    return response.data;  // Ajusta según la estructura de la respuesta de tu backend
  },
  
  async crearVenta(payload) {
    return apiPost("/api/ventas", payload);  // Asegúrate de que la URL coincida con la del backend
  }
};
