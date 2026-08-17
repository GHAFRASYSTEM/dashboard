import { useEffect, useState, useCallback, useMemo } from 'react';
import { Loader2 } from 'lucide-react';
import { DashboardLayout } from '../../components/dashboard-layout';
import { pickupApi } from '../../api/pickupApi';
import { PickupCard } from './components/PickupCard';
import { PickupFiltersBar, type SortDir } from './components/PickupFiltersBar';
import { AssignMemberModal } from './components/AssignMemberModal';
import type { PickupRequest, PickupStatus, Gare } from './types/pickup';

export default function PickupsPage() {
  const [requests, setRequests] = useState<PickupRequest[]>([]);
  const [loading, setLoading]   = useState(true);
  const [status, setStatus]     = useState<PickupStatus | 'all'>('pending');
  const [gare, setGare]         = useState<Gare | 'all'>('all');
  const [sortDir, setSortDir]   = useState<SortDir>('asc');

  const [assignTarget, setAssignTarget] = useState<PickupRequest | null>(null);
  const [submitting, setSubmitting]     = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await pickupApi.list({
        status: status === 'all' ? undefined : status,
        gare:   gare === 'all'   ? undefined : gare,
      });
      setRequests(data);
    } catch (err) {
      console.error('[pickups] failed to load', err);
    } finally {
      setLoading(false);
    }
  }, [status, gare]);

  useEffect(() => { load(); }, [load]);

  const sortedRequests = useMemo(() => {
    const withTime = (r: PickupRequest) => new Date(`${r.arrival_date}T${r.arrival_time}`).getTime();
    return [...requests].sort((a, b) =>
      sortDir === 'asc' ? withTime(a) - withTime(b) : withTime(b) - withTime(a)
    );
  }, [requests, sortDir]);

  const handleConfirmAssign = async (memberId: string, note: string) => {
    if (!assignTarget) return;
    setSubmitting(true);
    try {
      await pickupApi.updateStatus(assignTarget.id, {
        status: 'assigned',
        assigned_to: memberId,
        admin_notes: note || undefined,
      });
      setAssignTarget(null);
      load();
    } catch (err) {
      console.error('[pickups] assign failed', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleComplete = async (request: PickupRequest) => {
    try {
      await pickupApi.updateStatus(request.id, { status: 'completed' });
      load();
    } catch (err) {
      console.error('[pickups] complete failed', err);
    }
  };

  const handleCancel = async (request: PickupRequest) => {
    if (!confirm('Cancel this pickup request?')) return;
    try {
      await pickupApi.updateStatus(request.id, { status: 'cancelled' });
      load();
    } catch (err) {
      console.error('[pickups] cancel failed', err);
    }
  };

  return (
    <DashboardLayout title="Pickup Matching" breadcrumbs={[{ label: 'Pickup Matching' }]}>
      <p className="mb-5 text-sm text-muted-foreground">
        Pair arriving students with an existing member to meet them at the station.
      </p>

      <div className="mb-5">
        <PickupFiltersBar
          status={status}
          gare={gare}
          sortDir={sortDir}
          onStatus={setStatus}
          onGare={setGare}
          onSort={setSortDir}
        />
      </div>

      {loading ? (
        <div className="flex items-center justify-center gap-2 py-16 text-sm text-muted-foreground">
          <Loader2 className="size-4 animate-spin" /> Loading requests…
        </div>
      ) : sortedRequests.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border py-16 text-center text-sm text-muted-foreground">
          No pickup requests match these filters.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
          {sortedRequests.map(r => (
            <PickupCard
              key={r.id}
              request={r}
              onAssign={() => setAssignTarget(r)}
              onComplete={() => handleComplete(r)}
              onCancel={() => handleCancel(r)}
            />
          ))}
        </div>
      )}

      <AssignMemberModal
        open={!!assignTarget}
        currentMemberId={assignTarget?.assigned_to ?? null}
        submitting={submitting}
        onClose={() => setAssignTarget(null)}
        onConfirm={handleConfirmAssign}
      />
    </DashboardLayout>
  );
}