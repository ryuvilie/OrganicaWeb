// src/api/http.js
// Cliente HTTP único para toda la app (backend-ready)

const baseURL =
  (typeof import.meta !== "undefined" && import.meta.env && import.meta.env.VITE_API_URL) ||
  (typeof process !== "undefined" && process.env && process.env.REACT_APP_API_URL) ||
  "http://localhost:8080"; // por defecto Spring Boot local

export async function http(path, { method = "GET", headers = {}, body, auth = true } = {}) {
  const token = auth ? localStorage.getItem("token") : null;

  const opts = {
    method,
    headers: {
      ...(body instanceof FormData ? {} : { "Content-Type": "application/json" }),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    credentials: "include", // útil si luego usas cookies con SameSite
  };

  if (body !== undefined) {
    opts.body = body instanceof FormData ? body : JSON.stringify(body);
  }

  const res = await fetch(`${baseURL}${path}`, opts);

  // Manejo simple de errores
  if (!res.ok) {
    // intenta leer JSON; si no, texto
    let errText = "";
    try { errText = await res.text(); } catch {}
    throw new Error(`HTTP ${res.status} ${res.statusText} — ${errText || "Error de red"}`);
  }

  // 204 No Content
  if (res.status === 204) return null;

  // intenta parsear JSON
  return res.json();
}
