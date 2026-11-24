/**
 * Contact form schema and payload types.
 */

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
  botcheck?: string; // Honeypot field
}

export interface ContactApiResponse {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
}
