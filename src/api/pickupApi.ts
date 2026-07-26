import { apiFetch } from './api';
import type {
  PickupRequest, PickupFilters, AssignPickupPayload,
} from '../pages/pickups/types/pickup';

function buildQuery(filters: PickupFilters): string {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([k, v]) => {
    if (v !== undefined && v !== '') params.set(k, String(v));
  });
  return params.toString() ? `?${params.toString()}` : '';
}

export const pickupApi = {

  list(filters: PickupFilters = {}) {
    return apiFetch<{ data: PickupRequest[] }>(
      `/pickup${buildQuery(filters)}`
    ).then(r => (r as any).data as PickupRequest[]);
  },

  updateStatus(id: string, payload: AssignPickupPayload) {
    return apiFetch<{ data: PickupRequest }>(`/pickup/${id}/status`, {
      method: 'PATCH',
      body:   JSON.stringify(payload),
    }).then(r => (r as any).data as PickupRequest);
  },
};