export const CONTACT_FORM_LIMITS = {
  nameMinLength: 2,
  nameMaxLength: 80,
  messageMaxLength: 400,
} as const;

export const CONTACT_EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
