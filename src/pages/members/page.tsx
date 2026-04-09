import { useState }         from 'react';
import { DashboardLayout }  from '../../components/dashboard-layout';
import { Users }            from 'lucide-react';
import { useMembers, useMemberStats } from '../../hooks/useMembers';
import { membersApi } from '../../api/members';
import type { Member }      from './types/members';
import { MemberStats } from './components/member-stats';
import { MembersToolbar } from './components/members-toolbar';
import { MembersGrid } from './components/members-grid';
import { MembersList } from './components/members-list';
import { DeleteMemberDialog } from './components/delete-member-dialog';


export default function MembersPage() {
  const { stats, loading: statsLoading } = useMemberStats();
  const { data, loading, filters, updateFilters, setPage, refetch } = useMembers();

  const [viewMode,       setViewMode]       = useState<'grid' | 'list'>('grid');
  const [deletingMember, setDeletingMember] = useState<Member | null>(null);

  const handleDelete = async () => {
    if (!deletingMember) return;
    await membersApi.remove(deletingMember.id);
    setDeletingMember(null);
    refetch();
  };

  const members = data?.members ?? [];

  return (
    <DashboardLayout title="Members" breadcrumbs={[{ label: 'Members' }]}>

      <MemberStats stats={stats} loading={statsLoading} />

      <MembersToolbar
        filters={filters}
        onFilterChange={updateFilters}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      {loading ? (
        <div className="py-16 text-center text-muted-foreground">Loading members…</div>
      ) : members.length === 0 ? (
        <div className="py-16 text-center">
          <Users className="mx-auto mb-4 size-12 text-muted-foreground" />
          <h3 className="mb-2 text-lg font-semibold">No members found</h3>
          <p className="text-muted-foreground">Try adjusting your filters</p>
        </div>
      ) : viewMode === 'grid' ? (
        <MembersGrid
          members={members}
          onEdit={m => window.location.href = `/members/${m.id}`}
          onDelete={setDeletingMember}
        />
      ) : (
        <MembersList
          members={members}
          onEdit={m => window.location.href = `/members/${m.id}`}
          onDelete={setDeletingMember}
        />
      )}

      {/* Pagination */}
      {data && data.pages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-2">
          <button
            disabled={data.page <= 1}
            onClick={() => setPage(data.page - 1)}
            className="rounded-lg border border-border px-4 py-2 text-sm disabled:opacity-40 hover:bg-muted/30"
          >
            Previous
          </button>
          <span className="text-sm text-muted-foreground">
            Page {data.page} of {data.pages} ({data.total} members)
          </span>
          <button
            disabled={data.page >= data.pages}
            onClick={() => setPage(data.page + 1)}
            className="rounded-lg border border-border px-4 py-2 text-sm disabled:opacity-40 hover:bg-muted/30"
          >
            Next
          </button>
        </div>
      )}

      <DeleteMemberDialog
        member={deletingMember}
        onClose={() => setDeletingMember(null)}
        onConfirm={handleDelete}
      />
    </DashboardLayout>
  );
}