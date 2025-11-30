import { apiPost } from "./client";

export const apiVentas = {
  crear(venta) {
    return apiPost("/api/ventas", venta);
  }
};
