import { z } from "zod";

/**
 * Zod validation schema for contact messages.
 * Enforces strict character limits, trimming, and email formatting.
 */
export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Name must be at least 2 characters." })
    .max(100, { message: "Name cannot exceed 100 characters." }),
  email: z
    .string()
    .trim()
    .email({ message: "Please enter a valid email address." })
    .max(254, { message: "Email cannot exceed 254 characters." }),
  message: z
    .string()
    .trim()
    .min(10, { message: "Message must be at least 10 characters." })
    .max(5000, { message: "Message cannot exceed 5,000 characters." }),
  botcheck: z.string().optional(),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
