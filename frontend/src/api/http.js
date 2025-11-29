// src/api/http.js
const base = (process.env.REACT_APP_API_URL || 'http://localhost:9090')
  .replace(/\/+$/, ''); // quita / al final

function getAuthHeaders() {
  const token = localStorage.getItem('token'); // luego lo guardaremos aquí
  if (!token) return {};
  return { Authorization: `Bearer ${token}` };
}

async function request(path, options = {}) {
  const url = `${base}${path}`;

  const res = await fetch(url, {
    // método por defecto GET si no viene en options
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
      ...getAuthHeaders(),
    },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`HTTP ${res.status} ${res.statusText} - ${text}`);
  }

  // si no hay cuerpo (204, etc.), devolvemos null
  if (res.status === 204) return null;

  return res.json();
}

export function httpGet(path) {
  return request(path, { method: 'GET' });
}

export function httpPost(path, body) {
  return request(path, {
    method: 'POST',
    body: JSON.stringify(body),
  });
}

export function httpPut(path, body) {
  return request(path, {
    method: 'PUT',
    body: JSON.stringify(body),
  });
}

export function httpPatch(path, body) {
  return request(path, {
    method: 'PATCH',
    body: JSON.stringify(body),
  });
}

export function httpDelete(path) {
  return request(path, { method: 'DELETE' });
}
