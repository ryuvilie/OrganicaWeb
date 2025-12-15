// src/api/ventas.js
import { apiPost, apiGet } from "./client";  // apiPost para crear, apiGet para listar

export const apiVentas = {
  async listarVentas() {
    const response = await apiGet("/api/ventas");
    // Log para desarrollo: ver qué responde el backend
    // (abrir la consola del navegador para revisar)
    if (typeof console !== "undefined") {
      console.debug("apiVentas.listarVentas response:", response);
    }

    // Normalizamos varios formatos comunes:
    // - { data: [...] }
    // - { ventas: [...] }
    // - directamente el array [...]
    // - { result: [...] }
    const maybeArray =
      (response && response.data) ||
      (response && response.ventas) ||
      (response && response.result) ||
      response ||
      [];

    // Asegurarnos de devolver un array (si viene un objeto, devolver [] para evitar fallos)
    return Array.isArray(maybeArray) ? maybeArray : [];
  },
  
  async crearVenta(payload) {
    return apiPost("/api/ventas", payload);  // Asegúrate de que la URL coincida con la del backend
  }
};
