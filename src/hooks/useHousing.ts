import { useState, useEffect, useCallback } from 'react';
import { housingApi } from '../api/housing';
import type { Housing, HousingFilters, HousingResponse, RoomRequest } from '../pages/housing/types/housing';

export function useHousingList(initial: HousingFilters = {}) {
  const [filters,  setFilters]  = useState<HousingFilters>({ page: 1, limit: 10, ...initial });
  const [data,     setData]     = useState<HousingResponse | null>(null);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState<string | null>(null);

  const fetch = useCallback(() => {
    setLoading(true);
    setError(null);
    housingApi.list(filters)
      .then(setData)
      .catch(e => setError(e?.data?.error?.message ?? 'Failed to load housing'))
      .finally(() => setLoading(false));
  }, [filters]);

  useEffect(() => { fetch(); }, [fetch]);

  return {
    data,
    loading,
    error,
    filters,
    setFilters: (f: Partial<HousingFilters>) => setFilters(p => ({ ...p, ...f, page: 1 })),
    setPage:    (page: number) => setFilters(p => ({ ...p, page })),
    refetch:    fetch,
  };
}

export function useHousing(id: string) {
  const [housing, setHousing] = useState<Housing | null>(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState<string | null>(null);

  const fetch = useCallback(() => {
    setLoading(true);
    housingApi.getOne(id)
      .then(setHousing)
      .catch(e => setError(e?.data?.error?.message ?? 'Not found'))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => { fetch(); }, [fetch]);

  return { housing, loading, error, refetch: fetch };
}

export function useRoomRequests(housingId?: string) {
  const [requests, setRequests] = useState<RoomRequest[]>([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState<string | null>(null);

  const fetch = useCallback(() => {
    setLoading(true);
    const call = housingId
      ? housingApi.getRequestsForHousing(housingId)
      : housingApi.getAllRequests();
    call
      .then(setRequests)
      .catch(e => setError(e?.data?.error?.message ?? 'Failed'))
      .finally(() => setLoading(false));
  }, [housingId]);

  useEffect(() => { fetch(); }, [fetch]);

  return { requests, loading, error, refetch: fetch };
}