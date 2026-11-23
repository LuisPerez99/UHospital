export type RegisterFieldErrors = {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};

export const MIN_PASSWORD_LENGTH = 8;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(value: string): boolean {
  return EMAIL_PATTERN.test(value.trim());
}

export function todayISO(): string {
  const now = new Date();
  const offset = now.getTimezoneOffset() * 60000;
  return new Date(now.getTime() - offset).toISOString().slice(0, 10);
}

export function isFutureDate(value: string): boolean {
  if (!value) return false;
  return value > todayISO();
}

export function inputClass(hasError?: boolean): string {
  return `w-full px-3 py-2 border rounded ${
    hasError ? "border-red-500" : "border-gray-300"
  }`;
}
