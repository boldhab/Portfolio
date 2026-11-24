import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { EmptyState } from "@/components/shared/EmptyState";

describe("EmptyState Component", () => {
  it("renders title and description properly", () => {
    render(
      <EmptyState
        title="No items found"
        description="Try adjusting your search criteria."
      />
    );
    expect(screen.getByText("No items found")).toBeInTheDocument();
    expect(screen.getByText("Try adjusting your search criteria.")).toBeInTheDocument();
  });

  it("renders an action link when actionLabel and actionHref are provided", () => {
    render(<EmptyState title="Empty Projects" actionLabel="Go Home" actionHref="/" />);
    const link = screen.getByRole("link", { name: "Go Home" });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/");
  });

  it("triggers callback when action button is clicked", () => {
    const handleAction = vi.fn();
    render(
      <EmptyState title="Empty" actionLabel="Retry Action" onAction={handleAction} />
    );
    const button = screen.getByRole("button", { name: "Retry Action" });
    fireEvent.click(button);
    expect(handleAction).toHaveBeenCalledTimes(1);
  });
});
