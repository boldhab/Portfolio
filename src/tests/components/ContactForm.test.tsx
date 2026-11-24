import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { ContactForm } from "@/components/contact/ContactForm";

describe("ContactForm Component", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("renders all form fields, labels, and submit button", () => {
    render(<ContactForm />);

    expect(screen.getByLabelText(/your name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^message/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /send message/i })).toBeInTheDocument();
  });

  it("shows validation error messages when submitting empty form", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    const submitBtn = screen.getByRole("button", { name: /send message/i });
    await user.click(submitBtn);

    expect(
      await screen.findByText(/name must be at least 2 characters/i)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/please enter a valid email address/i)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/message must be at least 10 characters/i)
    ).toBeInTheDocument();
  });

  it("displays loading state and disables submit button during transmission", async () => {
    const user = userEvent.setup();

    // Hang fetch promise to inspect pending state
    let resolvePromise: (value: Response) => void;
    const fetchPromise = new Promise<Response>((resolve) => {
      resolvePromise = resolve;
    });
    global.fetch = vi.fn().mockReturnValue(fetchPromise);

    render(<ContactForm />);

    await user.type(screen.getByLabelText(/your name/i), "Alex Johnson");
    await user.type(screen.getByLabelText(/email address/i), "alex@example.com");
    await user.type(
      screen.getByLabelText(/^message/i),
      "Inquiring about backend systems architecture consultation."
    );

    const submitBtn = screen.getByRole("button", { name: /send message/i });
    await user.click(submitBtn);

    // Verify loading state
    expect(screen.getByText(/transmitting/i)).toBeInTheDocument();
    expect(submitBtn).toBeDisabled();

    // Clean up pending promise wrapped in act
    await act(async () => {
      resolvePromise!(
        new Response(JSON.stringify({ success: true, message: "Sent" }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        })
      );
    });
  });

  it("resets form and shows success banner when API returns success", async () => {
    const user = userEvent.setup();

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        success: true,
        message: "Your message has been delivered successfully.",
      }),
    });

    render(<ContactForm />);

    const nameInput = screen.getByLabelText(/your name/i);
    const emailInput = screen.getByLabelText(/email address/i);
    const messageInput = screen.getByLabelText(/^message/i);

    await user.type(nameInput, "Devin Vance");
    await user.type(emailInput, "devin@startup.io");
    await user.type(
      messageInput,
      "We are interested in discussing full-stack contract roles."
    );

    await user.click(screen.getByRole("button", { name: /send message/i }));

    expect(await screen.findByText(/message delivered/i)).toBeInTheDocument();
    expect(
      screen.getByText(/your message has been delivered successfully/i)
    ).toBeInTheDocument();

    // Verify form was reset
    expect(nameInput).toHaveValue("");
    expect(emailInput).toHaveValue("");
    expect(messageInput).toHaveValue("");
  });

  it("preserves typed input and displays error banner when API returns error", async () => {
    const user = userEvent.setup();

    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      json: async () => ({
        success: false,
        message: "Email delivery service is currently not configured.",
      }),
    });

    render(<ContactForm />);

    const nameInput = screen.getByLabelText(/your name/i);
    const emailInput = screen.getByLabelText(/email address/i);
    const messageInput = screen.getByLabelText(/^message/i);

    await user.type(nameInput, "Devin Vance");
    await user.type(emailInput, "devin@startup.io");
    await user.type(
      messageInput,
      "Important message that should not be lost if sending fails."
    );

    await user.click(screen.getByRole("button", { name: /send message/i }));

    expect(await screen.findByText(/delivery notice/i)).toBeInTheDocument();
    expect(
      screen.getByText(/email delivery service is currently not configured/i)
    ).toBeInTheDocument();

    // Verify inputs were preserved so user does not lose work
    expect(nameInput).toHaveValue("Devin Vance");
    expect(emailInput).toHaveValue("devin@startup.io");
    expect(messageInput).toHaveValue(
      "Important message that should not be lost if sending fails."
    );
  });
});
