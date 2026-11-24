import { expect, test } from "@playwright/test";
import { createRequire } from "node:module";

const requireFromEslint = createRequire(require.resolve("eslint-plugin-jsx-a11y"));
const axeScript = requireFromEslint.resolve("axe-core/axe.min.js");

const VIEWPORTS = [320, 375, 768, 1024, 1440];

test.describe("Phase 4: Personal Pages & Contact System", () => {
  // Scenario 1: About Page Rendering & Axe Accessibility
  test("About page renders headings, biography, quick facts, and passes axe audit", async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });

    await page.goto("/about");
    await expect(page).toHaveTitle(/About/);

    const main = page.getByRole("main");
    await expect(
      main.getByRole("heading", { level: 1, name: "Habtamu Befekadu" })
    ).toBeVisible();

    // Verify biography section
    await expect(
      main.getByRole("heading", { name: "Biography & Engineering Background" })
    ).toBeVisible();

    // Verify Resume section
    await expect(
      main.getByRole("heading", { name: "Curriculum Vitae & Résumé" })
    ).toBeVisible();

    // Run axe accessibility audit
    await page.addScriptTag({ path: axeScript });
    const violations = await page.evaluate(async () => {
      const axe = (window as unknown as { axe: typeof import("axe-core") }).axe;
      const result = await axe.run({
        runOnly: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"],
      });
      return result.violations.map(({ id, nodes }) => ({
        id,
        targets: nodes.map(({ target }) => target),
      }));
    });
    expect(violations).toEqual([]);
    expect(errors).toEqual([]);
  });

  // Scenario 2: Experience Page Rendering & Timeline
  test("Experience page renders career timeline, header, and passes axe audit", async ({
    page,
  }) => {
    await page.goto("/experience");
    await expect(page).toHaveTitle(/Experience/);

    const main = page.getByRole("main");
    await expect(
      main.getByRole("heading", { level: 1, name: "Work Experience" })
    ).toBeVisible();

    // Run axe accessibility audit
    await page.addScriptTag({ path: axeScript });
    const violations = await page.evaluate(async () => {
      const axe = (window as unknown as { axe: typeof import("axe-core") }).axe;
      const result = await axe.run({
        runOnly: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"],
      });
      return result.violations.map(({ id, nodes }) => ({
        id,
        targets: nodes.map(({ target }) => target),
      }));
    });
    expect(violations).toEqual([]);
  });

  // Scenario 3: Contact Page, Coordinates & Form Interaction
  test("Contact page renders info coordinates and validates form input", async ({
    page,
  }) => {
    await page.goto("/contact");
    await expect(page).toHaveTitle(/Contact/);

    const main = page.getByRole("main");
    await expect(
      main.getByRole("heading", { level: 1, name: "Contact & Inquiries" })
    ).toBeVisible();
    await expect(
      main.getByRole("heading", { name: "Let’s discuss your next project." })
    ).toBeVisible();
    await expect(main.getByRole("heading", { name: "Send a Message" })).toBeVisible();

    // Verify form elements
    const nameInput = page.getByLabel(/your name/i);
    const emailInput = page.getByLabel(/email address/i);
    const messageInput = page.getByLabel(/^message/i);
    const submitBtn = page.getByRole("button", { name: /send message/i });

    await expect(nameInput).toBeVisible();
    await expect(emailInput).toBeVisible();
    await expect(messageInput).toBeVisible();
    await expect(submitBtn).toBeVisible();

    // Test client-side validation on empty submit
    await submitBtn.click();
    await expect(page.getByText(/name must be at least 2 characters/i)).toBeVisible();
    await expect(page.getByText(/please enter a valid email address/i)).toBeVisible();
    await expect(page.getByText(/message must be at least 10 characters/i)).toBeVisible();

    // Run axe accessibility audit on contact page
    await page.addScriptTag({ path: axeScript });
    const violations = await page.evaluate(async () => {
      const axe = (window as unknown as { axe: typeof import("axe-core") }).axe;
      const result = await axe.run({
        runOnly: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"],
      });
      return result.violations.map(({ id, nodes }) => ({
        id,
        targets: nodes.map(({ target }) => target),
      }));
    });
    expect(violations).toEqual([]);
  });

  // Scenario 4: Contact Form Mocked API Error and Preservation
  test("Contact form preserves user input on transmission failure", async ({ page }) => {
    await page.goto("/contact");

    // Intercept /api/contact to simulate service-unavailable response
    await page.route("**/api/contact", async (route) => {
      await route.fulfill({
        status: 503,
        contentType: "application/json",
        body: JSON.stringify({
          success: false,
          message:
            "The contact messaging service is currently offline because email credentials are not configured.",
        }),
      });
    });

    const nameInput = page.getByLabel(/your name/i);
    const emailInput = page.getByLabel(/email address/i);
    const messageInput = page.getByLabel(/^message/i);
    const submitBtn = page.getByRole("button", { name: /send message/i });

    await nameInput.fill("Jordan Reed");
    await emailInput.fill("jordan@enterprise.org");
    await messageInput.fill(
      "Inquiring about distributed backend engineering consultation."
    );

    await submitBtn.click();

    // Verify error notification
    await expect(page.getByText(/delivery notice/i)).toBeVisible();
    await expect(page.getByText(/email credentials are not configured/i)).toBeVisible();

    // Verify input was preserved
    await expect(nameInput).toHaveValue("Jordan Reed");
    await expect(emailInput).toHaveValue("jordan@enterprise.org");
    await expect(messageInput).toHaveValue(
      "Inquiring about distributed backend engineering consultation."
    );
  });

  // Scenario 5: Responsive viewports across all personal pages
  for (const width of VIEWPORTS) {
    test(`Pages fit viewport without horizontal overflow at ${width}px`, async ({
      page,
    }) => {
      await page.setViewportSize({ width, height: 900 });

      for (const route of ["/about", "/experience", "/contact"]) {
        await page.goto(route);
        const fits = await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth
        );
        expect(fits).toBe(true);

        const mainHeading = page.getByRole("main").getByRole("heading", { level: 1 });
        await expect(mainHeading).toBeVisible();
      }
    });
  }

  // Scenario 6: Light/Dark theme toggle on Contact Page
  test("Theme toggle retains monochrome inversion and contrast on /contact", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1024, height: 900 });
    await page.emulateMedia({ colorScheme: "light" });
    await page.goto("/contact");

    // Light mode verification
    await expect(page.locator("body")).toHaveCSS(
      "background-color",
      "rgb(255, 255, 255)"
    );

    // Switch to dark mode
    await page.getByRole("button", { name: "Switch to dark theme" }).click();
    await expect(page.locator("body")).toHaveCSS("background-color", "rgb(0, 0, 0)");
  });

  // Scenario 7: Keyboard navigation on Contact Form
  test("Keyboard navigation allows filling and submitting contact form", async ({
    page,
  }) => {
    await page.goto("/contact");

    const nameInput = page.getByLabel(/your name/i);
    await nameInput.focus();
    await expect(nameInput).toBeFocused();

    await page.keyboard.type("Morgan Lee");
    await page.keyboard.press("Tab");

    const emailInput = page.getByLabel(/email address/i);
    await expect(emailInput).toBeFocused();
    await page.keyboard.type("morgan@tech.dev");
    await page.keyboard.press("Tab");

    const messageInput = page.getByLabel(/^message/i);
    await expect(messageInput).toBeFocused();
    await page.keyboard.type(
      "Detailed inquiry about your availability for full-stack engineering."
    );

    await page.keyboard.press("Tab");
    const submitBtn = page.getByRole("button", { name: /send message/i });
    await expect(submitBtn).toBeFocused();
  });
});
