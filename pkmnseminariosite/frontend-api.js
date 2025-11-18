const BACKEND_URL = "https://bckendpkmn.onrender.com";

function authHeaders() {
  const token = localStorage.getItem("token");
  return token ? { "Authorization": `Bearer ${token}` } : {};
}

async function apiFetch(path, opts = {}) {
  const headers = opts.headers || {};
  if (!headers["Content-Type"] && !(opts.body instanceof FormData)) headers["Content-Type"] = "application/json";
  opts.headers = { ...headers, ...authHeaders() };
  let res;
  try { res = await fetch(`${BACKEND_URL}${path}`, opts); }
  catch (e) { return { ok: false, status: 0, data: { error: "Falha ao conectar ao servidor." } }; }
  const text = await res.text();
  let json = null;
  try { json = text ? JSON.parse(text) : null; } catch { json = text; }
  return { ok: res.ok, status: res.status, data: json };
}
