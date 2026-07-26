import { useEffect, useState } from 'react';
import { Search, X, Check, Loader2 } from 'lucide-react';
import { membersApi } from '../../../api/members';
import type { Member } from '../../members/types/members';

type Props = {
  open:            boolean;
  currentMemberId: string | null;
  onClose:         () => void;
  onConfirm:       (memberId: string, note: string) => void;
  submitting:      boolean;
};

export function AssignMemberModal({ open, currentMemberId, onClose, onConfirm, submitting }: Props) {
  const [query, setQuery]     = useState('');
  const [results, setResults] = useState<Member[]>([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<Member | null>(null);
  const [note, setNote]       = useState('');

  // Reset on open
  useEffect(() => {
    if (open) {
      setQuery('');
      setResults([]);
      setSelected(null);
      setNote('');
    }
  }, [open]);

  // Debounced search
  useEffect(() => {
    if (!open) return;
    const handle = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await membersApi.list({
          search: query || undefined,
          is_verified: true,
          limit: 15,
          sort_by: 'name',
          sort_order: 'asc',
        });
        setResults(res.members);
      } catch (err) {
        console.error('[pickups] member search failed', err);
      } finally {
        setLoading(false);
      }
    }, 250);
    return () => clearTimeout(handle);
  }, [query, open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card shadow-xl">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="text-sm font-semibold text-foreground">
            {currentMemberId ? 'Reassign buddy' : 'Pair with a member'}
          </h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="size-4" />
          </button>
        </div>

        <div className="px-5 py-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              autoFocus
              value={query}
              onChange={e => { setQuery(e.target.value); setSelected(null); }}
              placeholder="Search by name or email…"
              className="w-full rounded-lg border border-border bg-background py-2 pl-9 pr-3 text-sm text-foreground outline-none focus:border-primary"
            />
          </div>

          <div className="mt-3 max-h-64 overflow-y-auto rounded-lg border border-border">
            {loading ? (
              <div className="flex items-center justify-center gap-2 py-6 text-sm text-muted-foreground">
                <Loader2 className="size-4 animate-spin" /> Searching…
              </div>
            ) : results.length === 0 ? (
              <div className="py-6 text-center text-sm text-muted-foreground">
                No verified members found.
              </div>
            ) : (
              results.map(m => {
                const active = selected?.id === m.id;
                return (
                  <button
                    key={m.id}
                    onClick={() => setSelected(m)}
                    className={`flex w-full items-center justify-between gap-3 px-3 py-2.5 text-left text-sm transition-colors ${
                      active ? 'bg-primary/10' : 'hover:bg-accent'
                    }`}
                  >
                    <div className="min-w-0">
                      <p className="truncate font-medium text-foreground">{m.name || '(no name)'}</p>
                      <p className="truncate text-xs text-muted-foreground">
                        {m.email}{m.region ? ` · ${m.region}` : ''}
                      </p>
                    </div>
                    {active && <Check className="size-4 shrink-0 text-primary" />}
                  </button>
                );
              })
            )}
          </div>

          <textarea
            value={note}
            onChange={e => setNote(e.target.value)}
            placeholder="Optional note (e.g. pickup instructions for the volunteer)"
            rows={2}
            className="mt-3 w-full resize-none rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
          />
        </div>

        <div className="flex justify-end gap-2 border-t border-border px-5 py-4">
          <button
            onClick={onClose}
            className="rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-accent"
          >
            Cancel
          </button>
          <button
            disabled={!selected || submitting}
            onClick={() => selected && onConfirm(selected.id, note.trim())}
            className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50"
          >
            {submitting && <Loader2 className="size-4 animate-spin" />}
            Confirm pairing
          </button>
        </div>
      </div>
    </div>
  );
}