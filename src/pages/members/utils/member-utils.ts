import type { Member } from '../types/members';

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function formatPhone(phone: string | null): string {
  if (!phone) return '—';
  // Format: 233XXXXXXXXX → +233 XX XXX XXXX
  if (phone.startsWith('233') && phone.length === 12) {
    return `+233 ${phone.slice(3, 5)} ${phone.slice(5, 8)} ${phone.slice(8)}`;
  }
  if (phone.startsWith('33') && phone.length === 11) {
    return `+33 ${phone.slice(2, 3)} ${phone.slice(3, 5)} ${phone.slice(5, 7)} ${phone.slice(7, 9)} ${phone.slice(9)}`;
  }
  return phone;
}

export function getVerifiedConfig(is_verified: boolean) {
  return is_verified
    ? { label: 'Verified',   badge: 'text-emerald-600 border-emerald-200 bg-emerald-50 dark:bg-emerald-950 dark:border-emerald-800', dot: 'bg-emerald-500' }
    : { label: 'Unverified', badge: 'text-amber-600 border-amber-200 bg-amber-50 dark:bg-amber-950 dark:border-amber-800',     dot: 'bg-amber-500'   };
}

export function getCompleteConfig(is_complete: boolean) {
  return is_complete
    ? { label: 'Complete',   badge: 'text-blue-600 border-blue-200 bg-blue-50 dark:bg-blue-950 dark:border-blue-800' }
    : { label: 'Incomplete', badge: 'text-slate-600 border-slate-200 bg-slate-50 dark:bg-slate-950 dark:border-slate-800' };
}

export function getRoleConfig(role: Member['role']) {
  const map = {
    admin:     { label: 'Admin',     badge: 'text-purple-600 bg-purple-50 border-purple-200' },
    moderator: { label: 'Moderator', badge: 'text-blue-600 bg-blue-50 border-blue-200' },
    member:    { label: 'Member',    badge: 'text-slate-600 bg-slate-50 border-slate-200' },
  };
  return map[role] ?? map.member;
}

export function formatDate(iso: string | null | undefined): string {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'short', year: 'numeric',
  });
}

export function formatMemberSince(iso: string | null | undefined): string {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
}