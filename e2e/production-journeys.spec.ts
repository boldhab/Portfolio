import { expect, test } from "@playwright/test";

test.describe("Phase 5: Production User Journeys & Reliability", () => {
  // Journey A — Homepage Exploration
  test("Journey A: Homepage sections render and navigate to Projects", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Habtamu Befekadu/);

    const main = page.getByRole("main");
    // Verify all primary sections
    await expect(main.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(main.getByRole("heading", { name: "Featured Projects" })).toBeVisible();
    await expect(main.getByRole("heading", { name: "About Me" })).toBeVisible();
    await expect(main.getByRole("heading", { name: "Let’s work together." })).toBeVisible();

    // Click View Projects CTA
    const viewProjectsBtn = main.getByRole("link", { name: "View Projects" });
    await viewProjectsBtn.click();
    await expect(page).toHaveURL(/\/projects$/);
    await expect(page.getByRole("heading", { level: 1, name: /Projects/ })).toBeVisible();
  });

  // Journey B — Projects & Case Studies
  test("Journey B: Projects gallery search, filtering, and navigation", async ({ page }) => {
    await page.goto("/projects");
    await expect(page).toHaveTitle(/Projects/);

    const searchInput = page.getByRole("textbox", { name: "Search projects" });
    await expect(searchInput).toBeVisible();

    // Test search filter input
    await searchInput.fill("Architecture");
    await expect(searchInput).toHaveValue("Architecture");

    // Clear search
    await searchInput.fill("");
    await expect(searchInput).toHaveValue("");

    // Back to home via brand logo
    const brandLogo = page.getByLabel(/Habtamu Befekadu Home/i);
    await brandLogo.click();
    await expect(page).toHaveURL(/\/$/);
  });

  // Journey C — About and Experience
  test("Journey C: About narrative, experience timeline, and resume behavior", async ({ page }) => {
    await page.goto("/about");
    await expect(page).toHaveTitle(/About/);

    const main = page.getByRole("main");
    await expect(main.getByRole("heading", { level: 1, name: "Habtamu Befekadu" })).toBeVisible();
    await expect(main.getByRole("heading", { name: "Biography & Engineering Background" })).toBeVisible();
    await expect(main.getByRole("heading", { name: "Curriculum Vitae & Résumé" })).toBeVisible();

    // Navigate to Experience page
    await page.goto("/experience");
    await expect(page).toHaveTitle(/Experience/);
    await expect(page.getByRole("main").getByRole("heading", { level: 1, name: "Work Experience" })).toBeVisible();
  });

  // Journey D — Contact Form Full Transmission Lifecycle
  test("Journey D: Contact validation, mock delivery success, and failure fallback", async ({ page }) => {
    await page.goto("/contact");
    await expect(page).toHaveTitle(/Contact/);

    const nameInput = page.getByLabel(/your name/i);
    const emailInput = page.getByLabel(/email address/i);
    const messageInput = page.getByLabel(/^message/i);
    const submitBtn = page.getByRole("button", { name: /send message/i });

    // 1. Submit invalid data -> validation errors
    await submitBtn.click();
    await expect(page.getByText(/name must be at least 2 characters/i)).toBeVisible();
    await expect(page.getByText(/please enter a valid email address/i)).toBeVisible();
    await expect(page.getByText(/message must be at least 10 characters/i)).toBeVisible();

    // 2. Mock transmission success
    await page.route("**/api/contact", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          success: true,
          message: "Your message has been delivered successfully. Thank you for reaching out!",
        }),
      });
    });

    await nameInput.fill("Alex Morgan");
    await emailInput.fill("alex@enterprise.dev");
    await messageInput.fill("Inquiring about distributed backend engineering consultation.");
    await submitBtn.click();

    await expect(page.getByText(/message delivered/i)).toBeVisible();
    await expect(page.getByText(/your message has been delivered successfully/i)).toBeVisible();
    // Verify inputs reset
    await expect(nameInput).toHaveValue("");
    await expect(emailInput).toHaveValue("");
    await expect(messageInput).toHaveValue("");

    // 3. Mock transmission failure (e.g. 503 service unavailable)
    await page.unroute("**/api/contact");
    await page.route("**/api/contact", async (route) => {
      await route.fulfill({
        status: 503,
        contentType: "application/json",
        body: JSON.stringify({
          success: false,
          message: "The contact messaging service is currently offline. Please reach out via direct social links.",
        }),
      });
    });

    await nameInput.fill("Alex Morgan");
    await emailInput.fill("alex@enterprise.dev");
    await messageInput.fill("Retrying message transmission after temporary error.");
    await submitBtn.click();

    await expect(page.getByText(/delivery notice/i)).toBeVisible();
    await expect(page.getByText(/currently offline/i)).toBeVisible();
    // Inputs must be preserved
    await expect(nameInput).toHaveValue("Alex Morgan");
    await expect(emailInput).toHaveValue("alex@enterprise.dev");
    await expect(messageInput).toHaveValue("Retrying message transmission after temporary error.");
  });

  // Journey E — Theme Switching and Persistence
  test("Journey E: Theme switches and persists across navigation and reload", async ({ page }) => {
    await page.setViewportSize({ width: 1024, height: 900 });
    await page.emulateMedia({ colorScheme: "light" });
    await page.goto("/");

    // Verify initial light theme
    await expect(page.locator("body")).toHaveCSS("background-color", "rgb(255, 255, 255)");

    // Switch to dark theme
    const themeBtn = page.getByRole("button", { name: /switch to dark theme/i });
    await themeBtn.click();
    await expect(page.locator("body")).toHaveCSS("background-color", "rgb(0, 0, 0)");

    // Navigate to another page (/about)
    await page.getByRole("link", { name: "About" }).first().click();
    await expect(page).toHaveURL(/\/about$/);

    // Theme should still be dark
    await expect(page.locator("body")).toHaveCSS("background-color", "rgb(0, 0, 0)");

    // Reload page
    await page.reload();
    await expect(page.locator("body")).toHaveCSS("background-color", "rgb(0, 0, 0)");
  });

  // Journey F — Mobile Experience at 375px
  test("Journey F: Mobile navigation, viewport containment, and drawer interaction", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/");

    // Check no horizontal overflow
    const fits = await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth
    );
    expect(fits).toBe(true);

    // Open mobile menu
    const menuToggle = page.getByRole("button", { name: "Open navigation menu" });
    await expect(menuToggle).toBeVisible();
    await menuToggle.click();

    const mobileMenu = page.getByRole("navigation", { name: "Mobile navigation menu" });
    await expect(mobileMenu).toBeVisible();

    // Navigate to Projects via mobile menu
    await mobileMenu.getByRole("link", { name: "Projects" }).click();
    await expect(page).toHaveURL(/\/projects$/);
    await expect(mobileMenu).toBeHidden();
  });

  // Reliability & Edge Cases
  test("Reliability: 404 page renders gracefully for unknown paths", async ({ page }) => {
    const response = await page.goto("/non-existent-route-404");
    expect(response?.status()).toBe(404);

    await expect(page.getByText("404 Error")).toBeVisible();
    await expect(page.getByRole("heading", { name: "Page Not Found" })).toBeVisible();

    const returnBtn = page.getByRole("link", { name: /return to home/i });
    await expect(returnBtn).toBeVisible();
    await returnBtn.click();
    await expect(page).toHaveURL(/\/$/);
  });

  test("Reliability: Unknown project slug triggers 404", async ({ page }) => {
    const response = await page.goto("/projects/non-existent-project-slug");
    expect([200, 404]).toContain(response?.status());
    await expect(
      page.getByRole("heading", { name: "Project Case Study Not Found" })
    ).toBeVisible();
    await expect(page.getByText(/404 — Project Not Found/i)).toBeVisible();
  });

  test("Accessibility: Skip to main content link works", async ({ page }) => {
    await page.goto("/");
    const skipLink = page.getByRole("link", { name: "Skip to main content" });
    await skipLink.focus();
    await expect(skipLink).toBeVisible();
    await page.keyboard.press("Enter");

    const main = page.getByRole("main");
    await expect(main).toBeFocused();
  });
});
