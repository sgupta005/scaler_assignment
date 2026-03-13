import { apiFetch, authHeaders } from './client';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  phone: string | null;
}

export interface AuthResponse {
  token: string;
  user: AuthUser;
}

export async function signup(data: {
  name: string;
  email: string;
  phone?: string;
  password: string;
}): Promise<AuthResponse> {
  const json = await apiFetch<{ data: AuthResponse }>('/api/auth/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return json.data;
}

export async function login(data: {
  identifier: string;
  password: string;
}): Promise<AuthResponse> {
  const json = await apiFetch<{ data: AuthResponse }>('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return json.data;
}

export async function fetchMe(): Promise<AuthUser> {
  const json = await apiFetch<{ data: { user: AuthUser } }>('/api/auth/me', {
    headers: authHeaders(),
  });
  return json.data.user;
}
