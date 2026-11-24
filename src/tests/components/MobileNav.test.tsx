import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MobileNav } from "@/components/layout/MobileNav";

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

describe("MobileNav Component", () => {
  it("opens mobile navigation menu when button is clicked", () => {
    render(<MobileNav />);

    const openButton = screen.getByRole("button", { name: /Open navigation menu/i });
    expect(openButton).toBeInTheDocument();
    expect(
      screen.queryByRole("navigation", { name: "Mobile navigation menu" })
    ).not.toBeInTheDocument();

    fireEvent.click(openButton);

    const menu = screen.getByRole("navigation", { name: "Mobile navigation menu" });
    expect(menu).toBeInTheDocument();

    const closeButton = screen.getByRole("button", { name: /Close navigation menu/i });
    expect(closeButton).toBeInTheDocument();
  });

  it("closes mobile menu when escape key is pressed", () => {
    render(<MobileNav />);

    const button = screen.getByRole("button", { name: /Open navigation menu/i });
    fireEvent.click(button);
    expect(
      screen.getByRole("navigation", { name: "Mobile navigation menu" })
    ).toBeInTheDocument();

    fireEvent.keyDown(button, { key: "Escape" });
    expect(button).toHaveFocus();
    expect(
      screen.queryByRole("navigation", { name: "Mobile navigation menu" })
    ).not.toBeInTheDocument();
  });
});
