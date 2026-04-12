import { useState }        from 'react';
import { Link }            from 'react-router-dom';
import { DashboardLayout } from '../../components/dashboard-layout';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { Badge }           from '../../components/ui/badge';
import { Button }          from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Check, X, MapPin, Home, Calendar } from 'lucide-react';
import { useRoomRequests } from '../../hooks/useHousing';
import { housingApi } from '../../api/housing';
import type { RoomRequest } from './types/housing';

const STATUS_COLORS: Record<string, string> = {
  pending:   'bg-amber-50 text-amber-700 border-amber-200',
  approved:  'bg-emerald-50 text-emerald-700 border-emerald-200',
  rejected:  'bg-red-50 text-red-700 border-red-200',
  withdrawn: 'bg-slate-50 text-slate-600 border-slate-200',
};

function getInitials(name: string) {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
}

export default function RoomRequestsPage() {
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const { requests, loading, error, refetch } = useRoomRequests();
  const [updating, setUpdating] = useState<string | null>(null);

  const filtered = statusFilter === 'all'
    ? requests
    : requests.filter(r => r.status === statusFilter);

  const handleStatus = async (req: RoomRequest, status: 'approved' | 'rejected') => {
    setUpdating(req.id);
    try {
      await housingApi.updateRequestStatus(req.id, status);
      refetch();
    } catch (e) {
      console.error(e);
    } finally {
      setUpdating(null);
    }
  };

  return (
    <DashboardLayout
      title="Room Requests"
      breadcrumbs={[{ label: 'Housing', href: '/housing' }, { label: 'Requests' }]}
    >
      {/* Filter + summary */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {['all', 'pending', 'approved', 'rejected', 'withdrawn'].map(s => (
            <Button
              key={s}
              variant={statusFilter === s ? 'default' : 'outline'}
              size="sm"
              onClick={() => setStatusFilter(s)}
              className="capitalize"
            >
              {s}
              {s === 'pending' && (
                <span className="ml-1.5 rounded-full bg-amber-500 px-1.5 py-0.5 text-xs text-white">
                  {requests.filter(r => r.status === 'pending').length}
                </span>
              )}
            </Button>
          ))}
        </div>
        <p className="text-sm text-muted-foreground">
          {filtered.length} request{filtered.length !== 1 ? 's' : ''}
        </p>
      </div>

      {loading ? (
        <div className="py-16 text-center text-muted-foreground">Loading requests…</div>
      ) : error ? (
        <div className="py-16 text-center text-destructive">{error}</div>
      ) : filtered.length === 0 ? (
        <div className="py-16 text-center">
          <Home className="mx-auto mb-4 size-12 text-muted-foreground" />
          <h3 className="mb-2 text-lg font-semibold">No requests</h3>
          <p className="text-muted-foreground">No {statusFilter !== 'all' ? statusFilter : ''} room requests yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map(req => (
            <Card key={req.id} className="border-border overflow-hidden">
              <CardContent className="p-0">
                <div className="grid md:grid-cols-[1fr_1fr_auto] gap-0">

                  {/* Member info */}
                  <div className="flex items-start gap-4 border-b md:border-b-0 md:border-r border-border p-5">
                    <Avatar className="size-12 shrink-0">
                      <AvatarImage src={req.user?.photo_url ?? ''} />
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                        {req.user?.name ? getInitials(req.user.name) : '?'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <p className="font-semibold truncate">{req.user?.name ?? '—'}</p>
                      <p className="text-sm text-muted-foreground truncate">{req.user?.email}</p>
                      <div className="mt-1.5 flex flex-wrap gap-1.5">
                        {req.user?.region && (
                          <span className="text-xs text-muted-foreground">{req.user.region}</span>
                        )}
                        {req.user?.occupation && (
                          <span className="text-xs text-muted-foreground">· {req.user.occupation}</span>
                        )}
                        {req.user?.is_verified && (
                          <Badge variant="outline" className="text-xs bg-emerald-50 text-emerald-700 border-emerald-200">
                            ✓ Verified
                          </Badge>
                        )}
                      </div>
                      {req.message && (
                        <p className="mt-2 text-sm text-muted-foreground italic line-clamp-2">
                          "{req.message}"
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Housing info */}
                  <div className="border-b md:border-b-0 md:border-r border-border p-5">
                    {req.housing?.images?.[0] && (
                      <img
                        src={req.housing.images[0]}
                        alt={req.housing.title}
                        className="mb-3 h-24 w-full rounded-lg object-cover"
                      />
                    )}
                    <Link
                      to={`/housing/${req.housing?.id}`}
                      className="font-semibold hover:text-primary transition-colors line-clamp-1"
                    >
                      {req.housing?.title ?? '—'}
                    </Link>
                    <div className="mt-1 space-y-1 text-xs text-muted-foreground">
                      <p className="flex items-center gap-1">
                        <MapPin className="size-3" />
                        {req.housing?.city}{req.housing?.address ? ` · ${req.housing.address}` : ''}
                      </p>
                      <p className="font-medium text-foreground">
                        €{req.housing?.price?.toLocaleString()}/month · {req.housing?.type}
                      </p>
                    </div>
                  </div>

                  {/* Status + actions */}
                  <div className="flex flex-col items-center justify-center gap-3 p-5 min-w-35">
                    <Badge
                      variant="outline"
                      className={STATUS_COLORS[req.status] ?? ''}
                    >
                      {req.status}
                    </Badge>

                    <p className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="size-3" />
                      {new Date(req.created_at).toLocaleDateString('en-GB', {
                        day: 'numeric', month: 'short', year: 'numeric',
                      })}
                    </p>

                    {req.status === 'pending' && (
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          className="bg-emerald-600 hover:bg-emerald-700 text-white h-8 px-3"
                          disabled={updating === req.id}
                          onClick={() => handleStatus(req, 'approved')}
                        >
                          <Check className="size-3.5 mr-1" />
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          className="h-8 px-3"
                          disabled={updating === req.id}
                          onClick={() => handleStatus(req, 'rejected')}
                        >
                          <X className="size-3.5 mr-1" />
                          Reject
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}