import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Container } from "@/components/layout/Container";
import { PageContainer } from "@/components/layout/PageContainer";

describe("Container Components", () => {
  it("renders Container with children and default max width class", () => {
    render(<Container>Test Content</Container>);
    const element = screen.getByText("Test Content");
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass("max-w-6xl");
  });

  it("supports semantic elements via the 'as' prop", () => {
    render(
      <Container as="section" data-testid="container-section">
        Section Content
      </Container>
    );
    const element = screen.getByTestId("container-section");
    expect(element.tagName).toBe("SECTION");
  });

  it("renders PageContainer as semantic main by default", () => {
    render(<PageContainer data-testid="page-container">Page Content</PageContainer>);
    const element = screen.getByTestId("page-container");
    expect(element.tagName).toBe("MAIN");
    expect(screen.getByText("Page Content")).toBeInTheDocument();
  });
});
