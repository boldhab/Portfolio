/**
 * Certification schema definitions for verified licenses and professional achievements.
 */

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  expirationDate?: string | null;
  credentialUrl?: string;
  credentialId?: string;
  description?: string;
}
