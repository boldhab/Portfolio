import { NextRequest, NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/contact/validation";
import { checkRateLimit } from "@/lib/contact/rate-limit";
import { sendContactEmail } from "@/lib/contact/send-email";
import { ContactApiResponse } from "@/types";

const MAX_PAYLOAD_BYTES = 64 * 1024; // 64 KB limit

export async function POST(req: NextRequest): Promise<NextResponse<ContactApiResponse>> {
  try {
    // 1. Enforce payload size limits
    const contentLength = req.headers.get("content-length");
    if (contentLength && parseInt(contentLength, 10) > MAX_PAYLOAD_BYTES) {
      return NextResponse.json(
        {
          success: false,
          message: "Request payload exceeds maximum allowed size (64KB).",
        },
        { status: 413 }
      );
    }

    // 2. Safe JSON parsing
    let bodyText: string;
    try {
      bodyText = await req.text();
    } catch {
      return NextResponse.json(
        { success: false, message: "Unable to read request stream." },
        { status: 400 }
      );
    }

    if (bodyText.length > MAX_PAYLOAD_BYTES) {
      return NextResponse.json(
        {
          success: false,
          message: "Request payload exceeds maximum allowed size (64KB).",
        },
        { status: 413 }
      );
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
      // Silently discard bot submission with generic success response
      return NextResponse.json(
        {
          success: true,
          message: "Thank you for your message.",
        },
        { status: 200 }
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
            "The contact messaging service is currently offline because email credentials are not configured by the portfolio owner. Please reach out via direct social links.",
        },
        { status: 503 }
      );
    }

    if (!emailResult.success) {
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
        message:
          "Your message has been delivered successfully. Thank you for reaching out!",
      },
      { status: 200 }
    );
  } catch (err: unknown) {
    const errorMsg =
      err instanceof Error ? err.message : "Internal unexpected error occurred.";
    console.error("Contact API Handler Error:", errorMsg);

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
    { status: 405 }
  );
}
