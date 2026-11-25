import { Resend } from "resend";

export interface SendEmailParams {
  name: string;
  email: string;
  message: string;
}

export interface SendEmailResult {
  success: boolean;
  status: "sent" | "missing_config" | "error";
  error?: string;
  id?: string;
}

/**
 * Dispatches verified contact inquiries via Resend.
 * Enforces server-side credentials and reply-to configuration.
 */
export async function sendContactEmail(
  params: SendEmailParams
): Promise<SendEmailResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail =
    process.env.CONTACT_FROM_EMAIL || "Portfolio Contact <onboarding@resend.dev>";

  // Explicit check for missing server configuration
  if (!apiKey || !toEmail) {
    return {
      success: false,
      status: "missing_config",
      error: "Email delivery service is currently not configured by the portfolio owner.",
    };
  }

  try {
    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: params.email,
      subject: "Portfolio inquiry",
      text: `Name: ${params.name}\nEmail: ${params.email}\n\nMessage:\n${params.message}`,
    });

    if (error || !data?.id) {
      return {
        success: false,
        status: "error",
        error: error?.message ?? "Provider did not return a message ID",
      };
    }

    return {
      success: true,
      status: "sent",
      id: data.id,
    };
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Unexpected email delivery exception.";
    return {
      success: false,
      status: "error",
      error: message,
    };
  }
}
