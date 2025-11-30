// src/api/usuarios.js
import { apiGet, apiPut } from "./client";

export const apiUsuarios = {
  // obtener datos del usuario logueado
  getPerfil() {
    return apiGet("/api/usuarios/perfil");
  },

  // actualizar datos del usuario
  updatePerfil(data) {
    return apiPut("/api/usuarios/perfil", data);
  },
};
