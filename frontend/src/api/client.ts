const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000';

export async function apiFetch<T = unknown>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, init);
  if (!res.ok) {
    const body = await res.json().catch(() => null);
    const message = body?.message ?? `API error ${res.status}: ${path}`;
    throw new Error(message);
  }
  return res.json() as Promise<T>;
}

export function authHeaders(): HeadersInit {
  const token = localStorage.getItem('fk_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}
