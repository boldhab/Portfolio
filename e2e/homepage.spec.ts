import { expect, test } from "@playwright/test";
import { createRequire } from "node:module";

const requireFromEslint = createRequire(require.resolve("eslint-plugin-jsx-a11y"));
const axeScript = requireFromEslint.resolve("axe-core/axe.min.js");

for (const width of [320, 375, 768, 1024, 1440]) {
  test(`homepage fits and its CTAs remain usable at ${width}px`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });

    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    const main = page.getByRole("main");
    await expect(main.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(
      main.getByRole("heading", { name: "Engineering Projects", exact: true })
    ).toBeVisible();
    await expect(main.getByRole("heading", { name: "About Me" })).toBeVisible();
    await expect(
      main.getByRole("heading", { name: "Contact", exact: true })
    ).toBeVisible();
    const fits = await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth
    );
    expect(fits).toBe(true);
    const projects = main.getByRole("link", { name: "View Projects" });
    expect((await projects.boundingBox())?.height).toBeGreaterThanOrEqual(44);
    await projects.click();
    await expect(page).toHaveURL(/\/projects$/);
    await expect(
      page.getByRole("heading", { level: 1, name: "Engineering Projects", exact: true })
    ).toBeVisible();
    expect(errors).toEqual([]);
  });
}

test("theme changes retain inversion and pass the axe audit", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 900 });
  await page.emulateMedia({ colorScheme: "light", reducedMotion: "reduce" });
  await page.goto("/");
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

  await expect(page.locator("body")).toHaveCSS("background-color", "rgb(255, 255, 255)");
  await audit();
  await page.getByRole("button", { name: "Switch to dark theme" }).click();
  await expect(page.locator("body")).toHaveCSS("background-color", "rgb(0, 0, 0)");
  await audit();
});

test("mobile menu supports keyboard navigation and escape", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 640 });
  await page.goto("/");
  const toggle = page.getByRole("button", { name: "Open navigation menu" });
  await toggle.focus();
  await page.keyboard.press("Enter");
  const menu = page.getByRole("navigation", { name: "Mobile navigation menu" });
  await expect(menu).toBeVisible();
  await page.keyboard.press("Tab");
  const home = menu.getByRole("link", { name: "Home" });
  await expect(home).toBeFocused();
  await expect(home).toHaveCSS("outline-style", "solid");
  await page.keyboard.press("Escape");
  await expect(menu).toBeHidden();
  await expect(toggle).toBeFocused();
  await page.keyboard.press("Enter");
  await menu.getByRole("link", { name: "About" }).click();
  await expect(page).toHaveURL(/\/#about$/);
  await expect(menu).toBeHidden();
  const response = await page.goto("/experience");
  expect(response?.ok()).toBe(true);
  await expect(page.getByRole("main").getByRole("heading", { level: 1 })).toBeVisible();

  await page.goto("/");
  await page.getByRole("link", { name: "Contact Me" }).click();
  await expect(page).toHaveURL(/\/#contact$/);
  await expect(
    page.getByRole("heading", { name: "Contact", exact: true, level: 2 })
  ).toBeVisible();
});

test("homepage sections follow the menu order and featured projects open the full list", async ({
  page,
}) => {
  await page.goto("/");
  const sections = await page
    .locator("main > div > section[id]")
    .evaluateAll((elements) => elements.map(({ id }) => id));
  expect(sections).toEqual(["experience", "technology", "projects", "about", "contact"]);
  const menu = page.getByRole("navigation", { name: "Main Navigation" });
  await expect(menu.getByRole("link")).toHaveText([
    "Home",
    "Experience",
    "Technology",
    "Projects",
    "About",
    "Contact",
  ]);

  const projects = page.getByRole("region", { name: "Projects", exact: true });
  await expect(projects.getByRole("article")).toHaveCount(4);
  await expect(projects.getByRole("textbox", { name: "Search projects" })).toHaveCount(0);
  await projects.getByRole("link", { name: "View all projects" }).click();
  await expect(page).toHaveURL(/\/projects$/);
  await expect(page.getByRole("textbox", { name: "Search projects" })).toBeVisible();
  await expect.poll(() => page.getByRole("article").count()).toBeGreaterThan(4);
  await page.getByRole("link", { name: "Back to Main" }).click();
  await expect(page).toHaveURL(/\/$/);
  await expect(projects.getByRole("article")).toHaveCount(4);
});
