export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date?: string;          // e.g. "2026-03" — omit if unconfirmed
  badgeImage?: string;     // path in public/certifications/
  verifyUrl?: string;
}
