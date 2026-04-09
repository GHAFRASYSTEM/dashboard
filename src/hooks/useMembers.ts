import { useState, useEffect, useCallback } from 'react';
import { membersApi }  from '../api/members';
import type { Member, MembersResponse, MemberStats, MemberFilters } from '../pages/members/types/members';

export function useMemberStats() {
  const [stats,    setStats]    = useState<MemberStats | null>(null);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState<string | null>(null);

  useEffect(() => {
    membersApi.stats()
      .then(setStats)
      .catch(e => setError(e?.data?.error?.message ?? 'Failed to load stats'))
      .finally(() => setLoading(false));
  }, []);

  return { stats, loading, error };
}

export function useMembers(initialFilters: MemberFilters = {}) {
  const [filters,  setFilters]  = useState<MemberFilters>({ page: 1, limit: 20, ...initialFilters });
  const [data,     setData]     = useState<MembersResponse | null>(null);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState<string | null>(null);

  const fetch = useCallback(() => {
    setLoading(true);
    setError(null);
    membersApi.list(filters)
      .then(setData)
      .catch(e => setError(e?.data?.error?.message ?? 'Failed to load members'))
      .finally(() => setLoading(false));
  }, [filters]);

  useEffect(() => { fetch(); }, [fetch]);

  const updateFilters = (next: Partial<MemberFilters>) =>
    setFilters(prev => ({ ...prev, ...next, page: 1 }));

  const setPage = (page: number) =>
    setFilters(prev => ({ ...prev, page }));

  return { data, loading, error, filters, updateFilters, setPage, refetch: fetch };
}

export function useMember(id: string) {
  const [member,  setMember]  = useState<Member | null>(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState<string | null>(null);

  const fetch = useCallback(() => {
    if (!id) return;
    setLoading(true);
    membersApi.getOne(id)
      .then(setMember)
      .catch(e => setError(e?.data?.error?.message ?? 'Member not found'))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => { fetch(); }, [fetch]);

  const update = async (payload: Partial<Member>) => {
    const updated = await membersApi.update(id, payload as any);
    setMember(updated);
    return updated;
  };

  const toggleVerify = async (is_verified: boolean) => {
    const updated = await membersApi.toggleVerify(id, is_verified);
    setMember(updated);
    return updated;
  };

  return { member, loading, error, update, toggleVerify, refetch: fetch };
}