// src/utils/api.js
export async function apiJson(url, options = {}) {
  const res = await fetch(url, { credentials: 'include', ...options })
  const text = await res.text()
  if (!text) return { ok: res.ok, status: res.status, data: null }
  try {
    return { ok: res.ok, status: res.status, data: JSON.parse(text) }
  } catch {
    console.error('Respuesta no JSON:', text)
    return { ok: false, status: res.status, data: null }
  }
}
