import { apiFetch } from './api';
import type {
  Member, MembersResponse, MemberStats,
  MemberFilters, UpdateMemberPayload,
} from '../pages/members/types/members';

function buildQuery(filters: MemberFilters): string {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([k, v]) => {
    if (v !== undefined && v !== '') params.set(k, String(v));
  });
  return params.toString() ? `?${params.toString()}` : '';
}

export const membersApi = {

  list(filters: MemberFilters = {}) {
    return apiFetch<{ data: MembersResponse }>(
      `/members${buildQuery(filters)}`
    ).then(r => (r as any).data as MembersResponse);
  },

  stats() {
    return apiFetch<{ data: MemberStats }>('/members/stats')
      .then(r => (r as any).data as MemberStats);
  },

  getOne(id: string) {
    return apiFetch<{ data: Member }>(`/members/${id}`)
      .then(r => (r as any).data as Member);
  },

  update(id: string, payload: UpdateMemberPayload) {
    return apiFetch<{ data: Member }>(`/members/${id}`, {
      method: 'PATCH',
      body:   JSON.stringify(payload),
    }).then(r => (r as any).data as Member);
  },

  toggleVerify(id: string, is_verified: boolean) {
    return apiFetch<{ data: Member }>(`/members/${id}/verify`, {
      method: 'PATCH',
      body:   JSON.stringify({ is_verified }),
    }).then(r => (r as any).data as Member);
  },

  remove(id: string) {
    return apiFetch<{ data: { deleted: boolean } }>(`/members/${id}`, {
      method: 'DELETE',
    }).then(r => (r as any).data);
  },
};