"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, AlertCircle, Loader2, Send } from "lucide-react";
import { contactFormSchema, ContactFormValues } from "@/lib/contact/validation";
import { Button } from "@/components/ui/button";

export function ContactForm() {
  const [submissionStatus, setSubmissionStatus] = React.useState<
    "idle" | "success" | "error"
  >("idle");
  const [statusMessage, setStatusMessage] = React.useState<string>("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
      botcheck: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setSubmissionStatus("idle");
    setStatusMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmissionStatus("success");
        setStatusMessage(
          result.message ||
            "Your message has been sent successfully. Thank you for reaching out!"
        );
        reset(); // Clear form only upon confirmed success
      } else {
        setSubmissionStatus("error");
        setStatusMessage(
          result.message ||
            "Unable to transmit your message. Please verify your entries or try again."
        );
        // Note: data is preserved so user doesn't lose their typed message
      }
    } catch {
      setSubmissionStatus("error");
      setStatusMessage(
        "A network error occurred while sending your message. Please check your connection and try again."
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-6"
      aria-label="Contact inquiry form"
    >
      {/* Honeypot field for spam prevention */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="botcheck">Do not fill this out if you are human</label>
        <input
          id="botcheck"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("botcheck")}
        />
      </div>

      {/* Submission Feedback Banners */}
      {submissionStatus === "success" && (
        <div
          role="status"
          aria-live="polite"
          className="border-foreground/20 bg-muted/60 text-foreground flex items-start gap-3 rounded-md border p-4 text-sm"
        >
          <CheckCircle2 className="text-foreground mt-0.5 h-5 w-5 shrink-0" />
          <div className="space-y-1">
            <p className="font-semibold">Message Delivered</p>
            <p className="text-muted-foreground">{statusMessage}</p>
          </div>
        </div>
      )}

      {submissionStatus === "error" && (
        <div
          role="alert"
          aria-live="assertive"
          className="border-foreground/40 bg-muted/80 text-foreground flex items-start gap-3 rounded-md border p-4 text-sm"
        >
          <AlertCircle className="text-foreground mt-0.5 h-5 w-5 shrink-0" />
          <div className="space-y-1">
            <p className="font-semibold">Delivery Notice</p>
            <p className="text-muted-foreground">{statusMessage}</p>
          </div>
        </div>
      )}

      {/* Name Input */}
      <div className="space-y-2">
        <label
          htmlFor="name"
          className="text-foreground block font-mono text-xs font-medium tracking-wider uppercase"
        >
          Your Name <span className="text-foreground/70">*</span>
        </label>
        <input
          id="name"
          type="text"
          autoComplete="name"
          disabled={isSubmitting}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
          placeholder="e.g. Alex Morgan"
          className={`bg-card text-foreground placeholder:text-muted-foreground focus-visible:ring-ring flex h-11 w-full rounded-md border px-3 py-2 text-sm transition-colors focus-visible:ring-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${
            errors.name ? "border-foreground" : "border-border"
          }`}
          {...register("name")}
        />
        {errors.name && (
          <p
            id="name-error"
            role="alert"
            className="text-muted-foreground font-mono text-xs"
          >
            {errors.name.message}
          </p>
        )}
      </div>

      {/* Email Input */}
      <div className="space-y-2">
        <label
          htmlFor="email"
          className="text-foreground block font-mono text-xs font-medium tracking-wider uppercase"
        >
          Email Address <span className="text-foreground/70">*</span>
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          disabled={isSubmitting}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
          placeholder="alex@example.com"
          className={`bg-card text-foreground placeholder:text-muted-foreground focus-visible:ring-ring flex h-11 w-full rounded-md border px-3 py-2 text-sm transition-colors focus-visible:ring-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${
            errors.email ? "border-foreground" : "border-border"
          }`}
          {...register("email")}
        />
        {errors.email && (
          <p
            id="email-error"
            role="alert"
            className="text-muted-foreground font-mono text-xs"
          >
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Message Textarea */}
      <div className="space-y-2">
        <label
          htmlFor="message"
          className="text-foreground block font-mono text-xs font-medium tracking-wider uppercase"
        >
          Message <span className="text-foreground/70">*</span>
        </label>
        <textarea
          id="message"
          rows={5}
          disabled={isSubmitting}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          placeholder="Please describe your inquiry, engineering opportunity, or project details..."
          className={`bg-card text-foreground placeholder:text-muted-foreground focus-visible:ring-ring flex min-h-[140px] w-full rounded-md border p-3 text-sm transition-colors focus-visible:ring-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${
            errors.message ? "border-foreground" : "border-border"
          }`}
          {...register("message")}
        />
        {errors.message && (
          <p
            id="message-error"
            role="alert"
            className="text-muted-foreground font-mono text-xs"
          >
            {errors.message.message}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isSubmitting}
        size="lg"
        className="w-full gap-2 font-mono text-xs tracking-wider uppercase sm:w-auto"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            <span>Transmitting...</span>
          </>
        ) : (
          <>
            <Send className="h-4 w-4" aria-hidden="true" />
            <span>Send Message</span>
          </>
        )}
      </Button>
    </form>
  );
}
