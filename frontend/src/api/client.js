// src/api/client.js
const API_BASE = (process.env.REACT_APP_API_URL || "http://localhost:9090")
  .replace(/\/+$/, "");

function buildHeaders(extra = {}) {
  const token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    ...extra,
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
}

async function handleResponse(res, method, path) {
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(
      `${method} ${path} failed: ${res.status} ${res.statusText} - ${text}`
    );
  }
  // si no hay cuerpo (204), devolvemos null
  if (res.status === 204) return null;
  return res.json();
}

export async function apiGet(path) {
  const url = `${API_BASE}${path}`;
  const res = await fetch(url, {
    method: "GET",
    headers: buildHeaders(),
  });
  return handleResponse(res, "GET", path);
}

export async function apiPost(path, body) {
  const url = `${API_BASE}${path}`;
  const res = await fetch(url, {
    method: "POST",
    headers: buildHeaders(),
    body: JSON.stringify(body),
  });
  return handleResponse(res, "POST", path);
}

export async function apiPut(path, body) {
  const url = `${API_BASE}${path}`;
  const res = await fetch(url, {
    method: "PUT",
    headers: buildHeaders(),
    body: JSON.stringify(body),
  });
  return handleResponse(res, "PUT", path);
}

export async function apiPatch(path, body) {
  const url = `${API_BASE}${path}`;
  const res = await fetch(url, {
    method: "PATCH",
    headers: buildHeaders(),
    body: JSON.stringify(body),
  });
  return handleResponse(res, "PATCH", path);
}

export async function apiDelete(path) {
  const url = `${API_BASE}${path}`;
  const res = await fetch(url, {
    method: "DELETE",
    headers: buildHeaders(),
  });
  return handleResponse(res, "DELETE", path);
}
