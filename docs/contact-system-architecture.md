# Contact System Architecture

This document outlines the software engineering architecture, data flow, validation pipeline, and email dispatch mechanisms powering the Contact System in Habtamu Befekadu's developer portfolio.

---

## 1. System Overview

The Contact System provides a direct, secure communication channel between visitors and Habtamu Befekadu. The system consists of:

- **Client Presentation (`src/components/contact/ContactForm.tsx`):** Built with React Hook Form and Zod resolvers.
- **Coordinates Presentation (`src/components/contact/ContactInformation.tsx`):** Displays direct channels, location, current availability, and verified professional links.
- **Route Handler API (`src/app/api/contact/route.ts`):** Edge-compatible server endpoint enforcing payload limits, server-side validation, anti-bot honeypots, rate limiting, and email dispatch.
- **Email Delivery Service (`src/lib/contact/send-email.ts`):** Integration with Resend.

---

## 2. Request Lifecycle & Data Flow

```
[Visitor Browser]
       │
       ▼ (1. Client Zod Validation)
[ContactForm Component]
       │
       ▼ (2. HTTP POST JSON /api/contact)
[Route Handler (route.ts)]
       ├── (3. Size Check: Content-Length <= 64KB)
       ├── (4. JSON Parser with Error Boundary)
       ├── (5. Server-side Zod Schema Validation)
       ├── (6. Honeypot Evaluation: botcheck field)
       ├── (7. Sliding-Window IP Rate Limiter)
       └── (8. Resend Email Dispatch via sendContactEmail)
                 │
                 ├── [Missing Credentials] ──► Returns HTTP 503 (Service Unavailable)
                 ├── [Resend Failure]     ──► Returns HTTP 500 (Delivery Error)
                 └── [Accepted by Resend] ──► Returns HTTP 200 (Success)
```

---

## 3. Component Boundaries

| Component / Module                          | Execution Context        | Responsibility                                                                                 |
| :------------------------------------------ | :----------------------- | :--------------------------------------------------------------------------------------------- |
| `ContactPage` (`src/app/contact/page.tsx`)  | Server (`RSC`)           | Renders page shell, metadata, and two-column layout.                                           |
| `ContactInformation`                        | Server (`RSC`)           | Renders verified coordinates, location, and social links.                                      |
| `ContactForm`                               | Client (`"use client"`)  | Controlled form state, client validation, submission loading state, and error handling.        |
| `route.ts` (`src/app/api/contact/route.ts`) | Server (Node / Edge API) | Secure endpoint processing submissions, applying security filters, and calling email provider. |
| `validation.ts`                             | Universal                | Zod validation rules shared by client and server.                                              |
| `rate-limit.ts`                             | Server                   | Sliding-window IP rate limiter.                                                                |
| `send-email.ts`                             | Server                   | Encapsulated Resend email client.                                                              |

---

## 4. Error Preservation & Form State

- **On Transmission Failure (HTTP 4xx / 5xx):** The client displays a prominent warning banner with the server-supplied message while **strictly preserving** all user input (`name`, `email`, `message`). The user never loses their typed inquiry.
- **On Success (HTTP 200):** The form triggers `reset()`, wiping the inputs and displaying a clear confirmation banner.
- **Button Lock:** While `isSubmitting` is active, the submit button is disabled and renders an animated spinner to prevent duplicate transmissions.
