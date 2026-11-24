import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Navbar } from "@/components/layout/Navbar";
import { ThemeProvider } from "@/providers/ThemeProvider";

// Mock next/navigation
vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

describe("Navbar Component", () => {
  it("renders the personal logo 'HB.'", () => {
    render(
      <ThemeProvider>
        <Navbar />
      </ThemeProvider>
    );
    expect(screen.getByLabelText(/Habtamu Befekadu Home/i)).toBeInTheDocument();
  });

  it("renders desktop navigation links pointing to valid routes", () => {
    render(
      <ThemeProvider>
        <Navbar />
      </ThemeProvider>
    );

    const desktopNav = screen.getByLabelText("Main Navigation");
    expect(desktopNav).toBeInTheDocument();

    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: "Projects" })).toHaveAttribute(
      "href",
      "/projects"
    );
    expect(screen.getByRole("link", { name: "About" })).toHaveAttribute("href", "/about");
    expect(screen.getByRole("link", { name: "Experience" })).toHaveAttribute(
      "href",
      "/experience"
    );
    expect(screen.getByRole("link", { name: "Contact" })).toHaveAttribute(
      "href",
      "/contact"
    );
  });
});
