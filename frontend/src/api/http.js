const base = process.env.REACT_APP_API_URL?.replace(/\/+$/, '') || '';

export async function httpGet(path) {
  const url = `${base}${path}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
  return res.json();
}
