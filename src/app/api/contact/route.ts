import { NextRequest, NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/contact/validation";
import { checkRateLimit } from "@/lib/contact/rate-limit";
import { sendContactEmail } from "@/lib/contact/send-email";
import { ContactApiResponse } from "@/types";

const MAX_PAYLOAD_BYTES = 64 * 1024; // 64 KB limit

export async function POST(req: NextRequest): Promise<NextResponse<ContactApiResponse>> {
  try {
    if (
      req.headers.get("content-type")?.split(";")[0].trim().toLowerCase() !==
      "application/json"
    ) {
      return NextResponse.json(
        { success: false, message: "Submit the form as JSON." },
        { status: 415 }
      );
    }

    const reader = req.body?.getReader();
    const decoder = new TextDecoder("utf-8", { fatal: true });
    let bodyText = "";
    let bytes = 0;
    try {
      while (reader) {
        const { done, value } = await reader.read();
        if (done) break;
        bytes += value.byteLength;
        if (bytes > MAX_PAYLOAD_BYTES) {
          void reader.cancel().catch(() => {});
          return NextResponse.json(
            {
              success: false,
              message: "Request payload exceeds maximum allowed size (64KB).",
            },
            { status: 413 }
          );
        }
        bodyText += decoder.decode(value, { stream: true });
      }
      bodyText += decoder.decode();
    } catch {
      return NextResponse.json(
        { success: false, message: "Unable to read request stream." },
        { status: 400 }
      );
    } finally {
      reader?.releaseLock();
    }

    let parsedJson: unknown;
    try {
      parsedJson = JSON.parse(bodyText);
    } catch {
      return NextResponse.json(
        { success: false, message: "Malformed JSON payload in request body." },
        { status: 400 }
      );
    }

    // 3. Server-side schema validation
    const validation = contactFormSchema.safeParse(parsedJson);
    if (!validation.success) {
      const fieldErrors = validation.error.flatten().fieldErrors;
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed. Please verify your submitted information.",
          errors: fieldErrors,
        },
        { status: 400 }
      );
    }

    const { name, email, message, botcheck } = validation.data;

    // 4. Honeypot spam defense
    if (botcheck) {
      // Discard before any provider call.
      return NextResponse.json(
        {
          success: false,
          message: "Unable to accept this submission.",
        },
        { status: 400 }
      );
    }

    if (process.env.VERCEL === "1" && process.env.CONTACT_WAF_CONFIGURED !== "true") {
      return NextResponse.json(
        {
          success: false,
          message: "The contact messaging service is currently offline.",
        },
        { status: 503 }
      );
    }

    // 5. Rate limiting by IP address
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "127.0.0.1";

    const rateLimit = checkRateLimit(ip);
    if (!rateLimit.success) {
      const retryAfterSeconds = Math.ceil((rateLimit.resetTime - Date.now()) / 1000);
      return NextResponse.json(
        {
          success: false,
          message: "Too many contact requests from this address. Please try again later.",
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(Math.max(1, retryAfterSeconds)),
          },
        }
      );
    }

    // 6. Email dispatch via Resend
    const emailResult = await sendContactEmail({ name, email, message });

    if (emailResult.status === "missing_config") {
      return NextResponse.json(
        {
          success: false,
          message:
            "The contact messaging service is currently offline. Please reach out via direct social links.",
        },
        { status: 503 }
      );
    }

    if (!emailResult.success) {
      console.error("Contact email provider rejected submission");
      return NextResponse.json(
        {
          success: false,
          message:
            "An error occurred while transmitting your message. Please try again or use direct contact channels.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Your message was accepted for delivery. Thank you for reaching out!",
      },
      { status: 200 }
    );
  } catch {
    console.error("Unexpected contact handler failure");

    return NextResponse.json(
      {
        success: false,
        message: "An internal server error occurred while processing your inquiry.",
      },
      { status: 500 }
    );
  }
}

export async function GET(): Promise<NextResponse<ContactApiResponse>> {
  return NextResponse.json(
    {
      success: false,
      message: "Method Not Allowed. Submissions must be sent via POST.",
    },
    { status: 405, headers: { Allow: "POST" } }
  );
}
