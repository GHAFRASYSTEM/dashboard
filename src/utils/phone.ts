// Web equivalent of the mobile util — turns a stored phone number into a
// wa.me link with the correct country code, so admins can click straight
// into a WhatsApp chat with a volunteer or student.

export type PhoneCountry = 'GH' | 'FR';

const COUNTRY_CODES: Record<PhoneCountry, string> = {
  GH: '233',
  FR: '33',
};

export function formatWhatsAppNumber(phone: string | null | undefined, country: PhoneCountry): string | null {
  if (!phone) return null;

  let digits = phone.replace(/\D/g, '');
  if (!digits) return null;

  const code = COUNTRY_CODES[country];

  if (digits.startsWith(code)) return digits;
  if (digits.startsWith('0')) digits = digits.slice(1);

  return `${code}${digits}`;
}

export function whatsappUrl(phone: string | null | undefined, country: PhoneCountry): string | null {
  const formatted = formatWhatsAppNumber(phone, country);
  return formatted ? `https://wa.me/${formatted}` : null;
}