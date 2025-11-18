const BACKEND_URL = "https://bckendpkmn.onrender.comL";

function authHeaders() {
  const token = localStorage.getItem("token");
  return token ? { "Authorization": `Bearer ${token}` } : {};
}

async function apiFetch(path, opts = {}) {
  const headers = opts.headers || {};
  if (!headers["Content-Type"] && !(opts.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }
  opts.headers = { ...headers, ...authHeaders() };
  const res = await fetch(`${BACKEND_URL}${path}`, opts);
  const text = await res.text();
  try { return { ok: res.ok, status: res.status, data: text ? JSON.parse(text) : null }; }
  catch(e) { return { ok: res.ok, status: res.status, data: text }; }
}
