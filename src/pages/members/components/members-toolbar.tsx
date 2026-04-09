import { Input }    from '../../../components/ui/input';
import { Button }   from '../../../components/ui/button';
import {
  Select, SelectContent, SelectItem,
  SelectTrigger, SelectValue,
} from '../../../components/ui/select';
import { Grid, List, Search } from 'lucide-react';
import { cn } from '../../../lib/utils';
import type { MemberFilters } from '../types/members';

interface Props {
  filters:          MemberFilters;
  onFilterChange:   (f: Partial<MemberFilters>) => void;
  viewMode:         'grid' | 'list';
  onViewModeChange: (v: 'grid' | 'list') => void;
}

export function MembersToolbar({ filters, onFilterChange, viewMode, onViewModeChange }: Props) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-1 flex-wrap items-center gap-3">

        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search name or email…"
            value={filters.search ?? ''}
            onChange={e => onFilterChange({ search: e.target.value })}
            className="pl-10 bg-card border-border"
          />
        </div>

        {/* Region */}
        <Select
          value={filters.region ?? 'all'}
          onValueChange={v => onFilterChange({ region: v === 'all' ? undefined : v as any })}
        >
          <SelectTrigger className="w-36 bg-card border-border">
            <SelectValue placeholder="Region" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Regions</SelectItem>
            {['Accra', 'Kumasi', 'Tamale', 'Sunyani'].map(r => (
              <SelectItem key={r} value={r}>{r}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Verified */}
        <Select
          value={filters.is_verified === undefined ? 'all' : String(filters.is_verified)}
          onValueChange={v => onFilterChange({ is_verified: v === 'all' ? undefined : v === 'true' })}
        >
          <SelectTrigger className="w-36 bg-card border-border">
            <SelectValue placeholder="Verified" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="true">Verified</SelectItem>
            <SelectItem value="false">Unverified</SelectItem>
          </SelectContent>
        </Select>

        {/* Gender */}
        <Select
          value={filters.gender ?? 'all'}
          onValueChange={v => onFilterChange({ gender: v === 'all' ? undefined : v as any })}
        >
          <SelectTrigger className="w-32 bg-card border-border">
            <SelectValue placeholder="Gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="male">Male</SelectItem>
            <SelectItem value="female">Female</SelectItem>
            <SelectItem value="prefer_not_to_say">Other</SelectItem>
          </SelectContent>
        </Select>

        {/* Sort */}
        <Select
          value={`${filters.sort_by ?? 'created_at'}_${filters.sort_order ?? 'desc'}`}
          onValueChange={v => {
            const [sort_by, sort_order] = v.split('_');
            onFilterChange({ sort_by, sort_order: sort_order as 'asc' | 'desc' });
          }}
        >
          <SelectTrigger className="w-44 bg-card border-border">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="created_at_desc">Newest first</SelectItem>
            <SelectItem value="created_at_asc">Oldest first</SelectItem>
            <SelectItem value="name_asc">Name A–Z</SelectItem>
            <SelectItem value="name_desc">Name Z–A</SelectItem>
            <SelectItem value="member_since_desc">Member since (newest)</SelectItem>
            <SelectItem value="is_verified_asc">Unverified first</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* View toggle */}
      <div className="flex overflow-hidden rounded-lg border border-border">
        <Button
          variant="ghost" size="icon"
          className={cn('size-9 rounded-none', viewMode === 'grid' && 'bg-secondary')}
          onClick={() => onViewModeChange('grid')}
        >
          <Grid className="size-4" />
        </Button>
        <Button
          variant="ghost" size="icon"
          className={cn('size-9 rounded-none', viewMode === 'list' && 'bg-secondary')}
          onClick={() => onViewModeChange('list')}
        >
          <List className="size-4" />
        </Button>
      </div>
    </div>
  );
}