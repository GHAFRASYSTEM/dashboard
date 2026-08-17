import { useState } from 'react';
import { Phone, Train, MapPin, Luggage, UserPlus, CheckCircle2, XCircle, MessageCircle, Mail, AlertTriangle, Clock, ZoomIn } from 'lucide-react';
import { StatusBadge } from './StatusBadge';
import { ImageLightbox } from './ImageLightbox';
import { whatsappUrl } from '../../../utils/phone';
import type { PickupRequest } from '../types/pickup';

type Props = {
  request:    PickupRequest;
  onAssign:   () => void;
  onComplete: () => void;
  onCancel:   () => void;
};

type Urgency = 'overdue' | 'soon' | null;

function getUrgency(request: PickupRequest): Urgency {
  // Only flag requests that still need action — completed/cancelled don't matter here.
  if (request.status !== 'pending' && request.status !== 'assigned') return null;

  const arrival = new Date(`${request.arrival_date}T${request.arrival_time}`);
  if (Number.isNaN(arrival.getTime())) return null;

  const diffMs = arrival.getTime() - Date.now();
  if (diffMs < 0) return 'overdue';
  if (diffMs <= 24 * 60 * 60 * 1000) return 'soon';
  return null;
}

function UrgencyBadge({ urgency }: { urgency: Urgency }) {
  if (urgency === 'overdue') {
    return (
      <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-destructive/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-destructive">
        <AlertTriangle className="size-3" /> Overdue
      </span>
    );
  }
  if (urgency === 'soon') {
    return (
      <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-600">
        <Clock className="size-3" /> Within 24h
      </span>
    );
  }
  return null;
}

export function PickupCard({ request, onAssign, onComplete, onCancel }: Props) {
  const student   = request.student;
  const volunteer = request.volunteer;
  const urgency   = getUrgency(request);

  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const [lightboxAlt, setLightboxAlt] = useState<string | undefined>(undefined);

  const openLightbox = (src: string, alt: string) => {
    setLightboxSrc(src);
    setLightboxAlt(alt);
  };

  return (
    <div
      className={`rounded-2xl border p-5 transition-colors ${
        urgency === 'overdue'
          ? 'border-destructive/30 bg-destructive/5'
          : urgency === 'soon'
          ? 'border-amber-500/30 bg-amber-500/5'
          : 'border-border bg-card'
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => student?.photo_url && openLightbox(student.photo_url, student.name)}
            className={`group relative flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary/10 text-sm font-semibold text-primary ${
              student?.photo_url ? 'cursor-pointer' : 'cursor-default'
            }`}
            title={student?.photo_url ? 'View photo' : undefined}
          >
            {student?.photo_url
              ? (
                <>
                  <img src={student.photo_url} alt={student.name} className="size-full object-cover" />
                  <span className="absolute inset-0 hidden items-center justify-center bg-black/40 group-hover:flex">
                    <ZoomIn className="size-3.5 text-white" />
                  </span>
                </>
              )
              : (student?.name?.[0] ?? '?').toUpperCase()
            }
          </button>
          <div>
            <p className="text-sm font-semibold text-foreground">{student?.name ?? 'Unknown member'}</p>
            <p className="text-xs text-muted-foreground">{student?.email}</p>
          </div>
        </div>
        <StatusBadge status={request.status} />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <InfoRow icon={<Train className="size-3.5" />} label={`${request.train_number} · ${request.gare}`} />
        {whatsappUrl(request.phone, 'GH') ? (
          <a
            href={whatsappUrl(request.phone, 'GH')!}
            target="_blank" rel="noreferrer"
            title="Message on WhatsApp"
            className="flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-[#1DA851]"
          >
            <Phone className="size-3.5" />
            <span className="truncate text-foreground/80 underline decoration-dotted underline-offset-2">
              {request.phone}
            </span>
          </a>
        ) : (
          <InfoRow icon={<Phone className="size-3.5" />} label={request.phone} />
        )}
        <InfoRow icon={<MapPin className="size-3.5" />} label={request.house_address} span />
        {request.expected_luggage && (
          <InfoRow icon={<Luggage className="size-3.5" />} label={request.expected_luggage} />
        )}
      </div>

      <div className="mt-3 flex items-center justify-between gap-2">
        <p className="text-xs font-medium text-muted-foreground">
          Arriving {request.arrival_date} at {request.arrival_time}
        </p>
        <UrgencyBadge urgency={urgency} />
      </div>

      {(request.photo_signed_url || request.ticket_signed_url) && (
        <div className="mt-3 flex gap-2">
          {request.photo_signed_url && (
            <button
              type="button"
              onClick={() => openLightbox(request.photo_signed_url!, 'Student photo')}
              className="group relative h-16 w-16 overflow-hidden rounded-lg border border-border"
              title="View photo"
            >
              <img src={request.photo_signed_url} alt="Student" className="size-full object-cover" />
              <span className="absolute inset-0 hidden items-center justify-center bg-black/40 group-hover:flex">
                <ZoomIn className="size-4 text-white" />
              </span>
            </button>
          )}
          {request.ticket_signed_url && (
            <button
              type="button"
              onClick={() => openLightbox(request.ticket_signed_url!, 'Ticket')}
              className="group relative h-16 w-16 overflow-hidden rounded-lg border border-border"
              title="View ticket"
            >
              <img src={request.ticket_signed_url} alt="Ticket" className="size-full object-cover" />
              <span className="absolute inset-0 hidden items-center justify-center bg-black/40 group-hover:flex">
                <ZoomIn className="size-4 text-white" />
              </span>
            </button>
          )}
        </div>
      )}

      {/* Volunteer contact — visible to the admin the moment one is assigned */}
      {volunteer && (
        <div className="mt-4 rounded-xl border border-primary/20 bg-primary/5 p-3">
          <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wide text-primary">Volunteer</p>
          <div className="flex items-center justify-between gap-2">
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-foreground">{volunteer.name}</p>
              <p className="truncate text-xs text-muted-foreground">{volunteer.email}</p>
            </div>
            <div className="flex shrink-0 gap-1.5">
              {whatsappUrl(volunteer.ghana_phone, 'GH') && (
                <a
                  href={whatsappUrl(volunteer.ghana_phone, 'GH')!}
                  target="_blank" rel="noreferrer"
                  title="WhatsApp (Ghana)"
                  className="flex size-7 items-center justify-center rounded-full bg-[#25D366]/15 text-[#1DA851] hover:bg-[#25D366]/25"
                >
                  <MessageCircle className="size-3.5" />
                </a>
              )}
              {whatsappUrl(volunteer.french_phone, 'FR') && (
                <a
                  href={whatsappUrl(volunteer.french_phone, 'FR')!}
                  target="_blank" rel="noreferrer"
                  title="WhatsApp (France)"
                  className="flex size-7 items-center justify-center rounded-full bg-[#25D366]/15 text-[#1DA851] hover:bg-[#25D366]/25"
                >
                  <MessageCircle className="size-3.5" />
                </a>
              )}
              <a
                href={`mailto:${volunteer.email}`}
                title="Email"
                className="flex size-7 items-center justify-center rounded-full bg-muted text-muted-foreground hover:bg-accent"
              >
                <Mail className="size-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}

      {request.admin_notes && (
        <p className="mt-3 rounded-lg bg-muted px-3 py-2 text-xs text-muted-foreground">
          {request.admin_notes}
        </p>
      )}

      <div className="mt-4 flex flex-wrap gap-2 border-t border-border pt-4">
        {(request.status === 'pending' || request.status === 'assigned') && (
          <button
            onClick={onAssign}
            className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-foreground hover:bg-accent"
          >
            <UserPlus className="size-3.5" />
            {request.status === 'assigned' ? 'Reassign buddy' : 'Assign buddy'}
          </button>
        )}
        {request.status === 'assigned' && (
          <button
            onClick={onComplete}
            className="flex items-center gap-1.5 rounded-lg border border-emerald-500/30 px-3 py-1.5 text-xs font-medium text-emerald-600 hover:bg-emerald-500/10"
          >
            <CheckCircle2 className="size-3.5" />
            Mark completed
          </button>
        )}
        {(request.status === 'pending' || request.status === 'assigned') && (
          <button
            onClick={onCancel}
            className="flex items-center gap-1.5 rounded-lg border border-destructive/30 px-3 py-1.5 text-xs font-medium text-destructive hover:bg-destructive/10"
          >
            <XCircle className="size-3.5" />
            Cancel
          </button>
        )}
      </div>

      <ImageLightbox src={lightboxSrc} alt={lightboxAlt} onClose={() => setLightboxSrc(null)} />
    </div>
  );
}

function InfoRow({ icon, label, span }: { icon: React.ReactNode; label: string; span?: boolean }) {
  return (
    <div className={`flex items-center gap-1.5 text-muted-foreground ${span ? 'col-span-2' : ''}`}>
      {icon}
      <span className="truncate text-foreground/80">{label}</span>
    </div>
  );
}