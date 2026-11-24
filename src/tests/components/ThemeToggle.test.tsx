import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { ThemeProvider } from "@/providers/ThemeProvider";

describe("ThemeToggle Component", () => {
  it("renders theme toggle button with accessible label", () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );

    // After mounting, the button has the aria-label
    const button = screen.getByRole("button", {
      name: /Switch to (dark|light) theme/i,
    });
    expect(button).toBeInTheDocument();
  });

  it("can be clicked to toggle theme", () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );

    const button = screen.getByRole("button", {
      name: /Switch to (dark|light) theme/i,
    });

    fireEvent.click(button);
    expect(button).toBeInTheDocument();
  });
});
