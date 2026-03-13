import { apiFetch, authHeaders } from './client';
import type { Address, AddAddressInput } from '../types/address';

export async function fetchAddresses(): Promise<Address[]> {
  const json = await apiFetch<{ data: { addresses: Address[] } }>('/api/addresses', {
    headers: authHeaders(),
  });
  return json.data.addresses;
}

export async function addAddress(input: AddAddressInput): Promise<Address> {
  const json = await apiFetch<{ data: { address: Address } }>('/api/addresses', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify(input),
  });
  return json.data.address;
}
