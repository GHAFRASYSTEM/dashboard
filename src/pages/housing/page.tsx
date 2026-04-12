import { useState }        from 'react';
import { DashboardLayout } from '../../components/dashboard-layout';
import { Input }           from '../../components/ui/input';
import { Button }          from '../../components/ui/button';
import {
  Select, SelectContent, SelectItem,
  SelectTrigger, SelectValue,
} from '../../components/ui/select';
import { Home, Search, Plus } from 'lucide-react';
import { useHousingList }     from '../../hooks/useHousing';
import { HousingCard }        from './components/housing-card';
import { CreateHousingModal } from './components/CreateHousingModal';
import type { HousingType }   from './types/housing';

export default function HousingPage() {
  const { data, loading, error, filters, setFilters, setPage, refetch } = useHousingList();

  const [search,      setSearch]      = useState('');
  const [showCreate,  setShowCreate]  = useState(false);

  const housing = data?.housing ?? [];

  return (
    <DashboardLayout title="Housing Listings" breadcrumbs={[{ label: 'Housing' }]}>

      {/* Top bar: filters + optional admin action */}
      <div className="mb-6 flex flex-wrap items-center gap-3">

        {/* Search */}
        <div className="relative flex-1 min-w-50 max-w-xs">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by city…"
            value={search}
            onChange={e => { setSearch(e.target.value); setFilters({ city: e.target.value || undefined }); }}
            className="pl-10 bg-card border-border"
          />
        </div>

        {/* Type filter */}
        <Select
          value={filters.type ?? 'all'}
          onValueChange={v => setFilters({ type: v === 'all' ? undefined : v as HousingType })}
        >
          <SelectTrigger className="w-36 bg-card border-border">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            {(['Studio', 'Apartment', 'Room', 'Colocation'] as HousingType[]).map(t => (
              <SelectItem key={t} value={t}>{t}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Availability filter */}
        <Select
          value={filters.available === undefined ? 'all' : String(filters.available)}
          onValueChange={v => setFilters({ available: v === 'all' ? undefined : v === 'true' })}
        >
          <SelectTrigger className="w-36 bg-card border-border">
            <SelectValue placeholder="Availability" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="true">Available</SelectItem>
            <SelectItem value="false">Unavailable</SelectItem>
          </SelectContent>
        </Select>

        {/* Sort */}
        <Select
          value={`${filters.sort_by ?? 'created_at'}_${filters.sort_order ?? 'desc'}`}
          onValueChange={v => {
            const [sort_by, sort_order] = v.split('_');
            setFilters({ sort_by: sort_by as any, sort_order: sort_order as any });
          }}
        >
          <SelectTrigger className="w-40 bg-card border-border">
            <SelectValue placeholder="Sort" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="created_at_desc">Newest first</SelectItem>
            <SelectItem value="created_at_asc">Oldest first</SelectItem>
            <SelectItem value="price_asc">Price ↑</SelectItem>
            <SelectItem value="price_desc">Price ↓</SelectItem>
            <SelectItem value="size_desc">Largest first</SelectItem>
          </SelectContent>
        </Select>

        {/* Admin: create button — pushed to the right */}
       
          <Button
            className="ml-auto flex items-center gap-2"
            onClick={() => setShowCreate(true)}
          >
            <Plus className="size-4" />
            Add listing
          </Button>
        
      </div>

      {/* Listings grid */}
      {loading ? (
        <div className="py-16 text-center text-muted-foreground">Loading listings…</div>
      ) : error ? (
        <div className="py-16 text-center text-destructive">{error}</div>
      ) : housing.length === 0 ? (
        <div className="py-16 text-center">
          <Home className="mx-auto mb-4 size-12 text-muted-foreground" />
          <h3 className="mb-2 text-lg font-semibold">No listings found</h3>
          <p className="text-muted-foreground">Try adjusting your filters</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {housing.map(h => <HousingCard key={h.id} housing={h} />)}
        </div>
      )}

      {/* Pagination */}
      {data && data.pages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-3">
          <Button
            variant="outline" size="sm"
            disabled={data.page <= 1}
            onClick={() => setPage(data.page - 1)}
          >
            Previous
          </Button>
          <span className="text-sm text-muted-foreground">
            {data.page} / {data.pages}
          </span>
          <Button
            variant="outline" size="sm"
            disabled={data.page >= data.pages}
            onClick={() => setPage(data.page + 1)}
          >
            Next
          </Button>
        </div>
      )}

      {/* Create modal — rendered at the end so it's always on top */}
      {showCreate && (
        <CreateHousingModal
          onClose={()   => setShowCreate(false)}
          onCreated={() => { setShowCreate(false); refetch(); }}
        />
      )}

    </DashboardLayout>
  );
}