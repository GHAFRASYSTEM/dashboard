import { useState }  from 'react';
import { Button }    from '../../../components/ui/button';
import { Textarea }  from '../../../components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Home, CheckCircle2 } from 'lucide-react';
import { housingApi } from '../../../api/housing';
import type { Housing } from '../types/housing';

interface Props {
  housing:   Housing;
  onSuccess: () => void;
}

export function HousingRequestCard({ housing, onSuccess }: Props) {
  const [message,  setMessage]  = useState('');
  const [loading,  setLoading]  = useState(false);
  const [sent,     setSent]     = useState(false);
  const [error,    setError]    = useState<string | null>(null);

  if (!housing.available) return (
    <Card>
      <CardContent className="pt-6 text-center text-muted-foreground">
        This accommodation is no longer available.
      </CardContent>
    </Card>
  );

  if (sent) return (
    <Card className="border-emerald-200 bg-emerald-50 dark:bg-emerald-950">
      <CardContent className="pt-6 text-center space-y-2">
        <CheckCircle2 className="mx-auto size-10 text-emerald-500" />
        <p className="font-semibold text-emerald-700 dark:text-emerald-300">Request sent!</p>
        <p className="text-sm text-muted-foreground">
          The admin has been notified. You'll hear back soon.
        </p>
      </CardContent>
    </Card>
  );

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError(null);
      await housingApi.requestRoom(housing.id, message);
      setSent(true);
      onSuccess();
    } catch (e: any) {
      setError(e?.data?.error?.message ?? 'Request failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <Home className="size-4 text-primary" />
          Request this Room
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-lg bg-muted/50 p-3 text-sm space-y-1">
          <p className="font-semibold">{housing.title}</p>
          <p className="text-muted-foreground">€{housing.price.toLocaleString()}/month · {housing.city}</p>
        </div>

        <Textarea
          placeholder="Add a message (optional) — introduce yourself, ask questions…"
          value={message}
          onChange={e => setMessage(e.target.value)}
          className="min-h-25 bg-background border-border"
          maxLength={500}
        />
        <p className="text-xs text-muted-foreground text-right">{message.length}/500</p>

        {error && (
          <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">{error}</p>
        )}

        <Button className="w-full" onClick={handleSubmit} disabled={loading}>
          {loading ? 'Sending…' : 'Send Request'}
        </Button>
      </CardContent>
    </Card>
  );
}