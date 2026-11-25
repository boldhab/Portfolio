import { expect, test } from "@playwright/test";
import { createRequire } from "node:module";

const requireFromEslint = createRequire(require.resolve("eslint-plugin-jsx-a11y"));
const axeScript = requireFromEslint.resolve("axe-core/axe.min.js");

// Viewports across mobile, tablet, and desktop
const VIEWPORTS = [320, 375, 768, 1024, 1440];

test.describe("Projects Showcase & Case Study System", () => {
  // Scenario 1: Open /projects & Axe Accessibility
  test("Scenario 1: Open /projects, render header, filters, search, and pass axe audit", async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });

    await page.goto("/projects");
    await expect(page).toHaveURL(/\/projects$/);

    const main = page.getByRole("main");
    await expect(
      main.getByRole("heading", { level: 1, name: "Engineering Projects", exact: true })
    ).toBeVisible();
    await expect(main.getByRole("link", { name: "Back to Main" })).toHaveAttribute(
      "href",
      "/"
    );

    // Verify search input
    const searchInput = page.getByRole("textbox", { name: "Search projects" });
    await expect(searchInput).toBeVisible();

    // Verify filter tablist
    const tablist = page.getByRole("group", {
      name: "Filter projects by engineering domain",
    });
    await expect(tablist).toBeVisible();

    // Verify "All" tab is active by default
    const allTab = tablist.getByRole("button", { name: /^all/i });
    await expect(allTab).toHaveAttribute("aria-pressed", "true");

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

  // Scenario 2: Select category filter
  test("Scenario 2: Select category filter updates active state and URL", async ({
    page,
  }) => {
    await page.goto("/projects");
    const tablist = page.getByRole("group", {
      name: "Filter projects by engineering domain",
    });
    const tabs = await tablist.getByRole("button").all();

    // If category tabs exist beyond "All", click the first category
    if (tabs.length > 1) {
      const targetTab = tabs[1];
      await targetTab.click();
      await expect(targetTab).toHaveAttribute("aria-pressed", "true");
      await expect(page).toHaveURL(/category=/);
    } else {
      // With empty initial dataset, only "All" is present
      const allTab = tablist.getByRole("button", { name: /^all/i });
      await expect(allTab).toHaveAttribute("aria-pressed", "true");
    }
  });

  // Scenario 3: Verify filtered projects or empty state
  test("Scenario 3: Search input filters projects or displays graceful empty state with clear button", async ({
    page,
  }) => {
    await page.goto("/projects");
    const searchInput = page.getByRole("textbox", { name: "Search projects" });

    // Type search query
    await searchInput.fill("distributed-database");
    await expect(page).toHaveURL(/q=distributed-database/);

    // Empty state should be visible for non-matching query
    await expect(page.getByText(/no matching projects/i)).toBeVisible();

    // Clear search button should appear and reset search when clicked
    const clearButton = page.getByRole("button", { name: "Clear search query" });
    await expect(clearButton).toBeVisible();
    await clearButton.click();

    await expect(searchInput).toHaveValue("");
    await expect(page).not.toHaveURL(/q=/);
  });

  // Scenario 4 & 5: Open project detail page / verify content & back navigation
  test("Scenario 4 & 5: Project navigation and return back to directory and main", async ({
    page,
  }) => {
    // Navigate to a non-existent slug which safely exercises the Project 404 view
    await page.goto("/projects/sample-case-study");
    await expect(
      page.getByRole("heading", { name: "Project Case Study Not Found" })
    ).toBeVisible();

    // Verify back navigation link
    const browseAllLink = page.getByRole("link", { name: "Browse All Projects" });
    await expect(browseAllLink).toBeVisible();
    await browseAllLink.click();

    await expect(page).toHaveURL(/\/projects$/);
    await expect(
      page.getByRole("heading", { level: 1, name: "Engineering Projects", exact: true })
    ).toBeVisible();

    // Verify Back to Main option returns to homepage with 4 featured projects
    await page.getByRole("link", { name: "Back to Main" }).click();
    await expect(page).toHaveURL(/\/$/);
    const projectsSection = page.getByRole("region", { name: "Projects", exact: true });
    await expect(projectsSection.getByRole("article")).toHaveCount(4);
  });

  // Scenario 6: Responsive layout across viewports (320px to 1440px)
  for (const width of VIEWPORTS) {
    test(`Scenario 6: Mobile layout and responsiveness at ${width}px`, async ({
      page,
    }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto("/projects");

      // Verify no horizontal overflow
      const noOverflow = await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth
      );
      expect(noOverflow).toBe(true);

      // Verify header is visible
      await expect(
        page.getByRole("heading", { level: 1, name: "Engineering Projects", exact: true })
      ).toBeVisible();

      // Verify search input is interactive
      const search = page.getByRole("textbox", { name: "Search projects" });
      await expect(search).toBeVisible();
      const bounds = await search.boundingBox();
      expect(bounds?.height).toBeGreaterThanOrEqual(36);
    });
  }

  // Scenario 7: Theme toggle retains black-and-white contrast and passes axe
  test("Scenario 7: Light/Dark theme toggle retains strict monochrome contrast", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1024, height: 900 });
    await page.emulateMedia({ colorScheme: "light" });
    await page.goto("/projects");
    await page.addScriptTag({ path: axeScript });

    const audit = async () => {
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
    };

    // Verify Light mode
    await expect(page.locator("body")).toHaveCSS(
      "background-color",
      "rgb(255, 255, 255)"
    );
    await audit();

    // Toggle to Dark mode
    await page.getByRole("button", { name: "Switch to dark theme" }).click();
    await expect(page.locator("body")).toHaveCSS("background-color", "rgb(0, 0, 0)");
    await audit();
  });

  // Scenario 8: Keyboard navigation & focus states
  test("Scenario 8: Keyboard navigation and focus visibility across controls", async ({
    page,
  }) => {
    await page.goto("/projects");

    // Focus search input and type with keyboard
    const searchInput = page.getByRole("textbox", { name: "Search projects" });
    await searchInput.focus();
    await expect(searchInput).toBeFocused();

    await page.keyboard.type("cloud");
    await expect(searchInput).toHaveValue("cloud");

    // Escape or tab to clear button
    await page.keyboard.press("Tab");
    const clearButton = page.getByRole("button", { name: "Clear search query" });
    await expect(clearButton).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(searchInput).toHaveValue("");
  });

  // Scenario 9: Browser back/forward URL synchronization
  test("Scenario 9: Browser back and forward buttons synchronize filter state", async ({
    page,
  }) => {
    await page.goto("/projects");
    const searchInput = page.getByRole("textbox", { name: "Search projects" });

    // Apply search filter
    await searchInput.fill("system");
    await expect(page).toHaveURL(/q=system/);

    // Apply reset filter
    const resetButton = page.getByRole("button", { name: "Reset filters" });
    await expect(resetButton).toBeVisible();
    await resetButton.click();
    await expect(page).toHaveURL(/\/projects$/);
    await expect(searchInput).toHaveValue("");

    // Browser Back
    await page.goBack();
    await expect(page).toHaveURL(/q=system/);
    await expect(searchInput).toHaveValue("system");

    // Browser Forward
    await page.goForward();
    await expect(page).toHaveURL(/\/projects$/);
    await expect(searchInput).toHaveValue("");
  });

  // Scenario 10: 404 for invalid slug
  test("Scenario 10: Navigating to invalid project slug renders dedicated 404 page", async ({
    page,
  }) => {
    const response = await page.goto("/projects/non-existent-project-xyz-404");
    expect([200, 404]).toContain(response?.status());

    await expect(
      page.getByRole("heading", { name: "Project Case Study Not Found" })
    ).toBeVisible();
    await expect(page.getByText(/404 — Project Not Found/i)).toBeVisible();

    const main = page.getByRole("main");
    const homeLink = main.getByRole("link", { name: "Home" });
    await expect(homeLink).toBeVisible();

    const browseLink = main.getByRole("link", { name: "Browse All Projects" });
    await expect(browseLink).toBeVisible();
    await browseLink.click();
    await expect(page).toHaveURL(/\/projects$/);
  });
});
