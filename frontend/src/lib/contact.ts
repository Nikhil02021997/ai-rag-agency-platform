/**
 * Single source of truth for the contact channels shown on the website.
 * The phone numbers are no longer displayed anywhere — visitors tap a
 * WhatsApp button and pick a line (see components/WhatsAppChooser.tsx).
 */
export const CONTACT_EMAIL = "enquiries@nisuvmarketing.com";

export const WHATSAPP_LINES = [
  { id: "line-1", label: "WhatsApp 1", hint: "Fastest reply", number: "919217122561" },
  { id: "line-2", label: "WhatsApp 2", hint: "Either line works", number: "917982842348" },
] as const;

export const WHATSAPP_MESSAGE = "Hi! I'd like to know more about NISUV Marketing's services.";

export function whatsappUrl(number: string): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
}
