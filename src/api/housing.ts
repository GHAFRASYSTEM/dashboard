import { apiFetch } from './api';
import type {
  Housing, HousingResponse, HousingFilters,
  RoomRequest, CreateHousingPayload,
} from '../pages/housing/types/housing';

function buildQuery(filters: HousingFilters): string {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([k, v]) => {
    if (v !== undefined && v !== '') params.set(k, String(v));
  });
  return params.toString() ? `?${params.toString()}` : '';
}

const unwrap = <T>(r: any): T => r?.data ?? r;

export const housingApi = {

  list: (filters: HousingFilters = {}) =>
    apiFetch<any>(`/housing${buildQuery(filters)}`).then(unwrap<HousingResponse>),

  getOne: (id: string) =>
    apiFetch<any>(`/housing/${id}`).then(unwrap<Housing>),

  create: (payload: CreateHousingPayload) =>
    apiFetch<any>('/housing', {
      method: 'POST',
      body:   JSON.stringify(payload),
    }).then(unwrap<Housing>),

  update: (id: string, payload: Partial<CreateHousingPayload> & {
    new_images?:     string[];
    removed_images?: string[];
  }) =>
    apiFetch<any>(`/housing/${id}`, {
      method: 'PATCH',
      body:   JSON.stringify(payload),
    }).then(unwrap<Housing>),

  remove: (id: string) =>
    apiFetch<any>(`/housing/${id}`, { method: 'DELETE' }).then(unwrap),

  // Room requests
  requestRoom: (housingId: string, message: string) =>
    apiFetch<any>(`/housing/${housingId}/request`, {
      method: 'POST',
      body:   JSON.stringify({ message }),
    }).then(unwrap<RoomRequest>),

  getRequestsForHousing: (housingId: string) =>
    apiFetch<any>(`/housing/${housingId}/requests`).then(unwrap<RoomRequest[]>),

  getAllRequests: (status?: string) =>
    apiFetch<any>(`/housing/requests/all${status ? `?status=${status}` : ''}`).then(unwrap<RoomRequest[]>),

  getMyRequests: () =>
    apiFetch<any>('/housing/requests/mine').then(unwrap<RoomRequest[]>),

  updateRequestStatus: (requestId: string, status: 'approved' | 'rejected') =>
    apiFetch<any>(`/housing/requests/${requestId}/status`, {
      method: 'PATCH',
      body:   JSON.stringify({ status }),
    }).then(unwrap<RoomRequest>),
};