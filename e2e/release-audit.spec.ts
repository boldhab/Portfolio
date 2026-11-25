import { expect, test } from "@playwright/test";

const paths = ["/", "/about", "/projects", "/experience", "/contact"];
const widths = [320, 375, 390, 768, 1024, 1280, 1440, 1920];

test.describe("Release audit", () => {
  test.skip(({ browserName, isMobile }) => browserName !== "chromium" || isMobile);

  for (const width of widths) {
    test(`public routes fit at ${width}px in both themes`, async ({ page }, testInfo) => {
      await page.setViewportSize({ width, height: 900 });
      for (const colorScheme of ["light", "dark"] as const) {
        await page.emulateMedia({ colorScheme, reducedMotion: "reduce" });
        for (const path of paths) {
          expect((await page.goto(path))?.status()).toBe(200);
          await expect(
            page.getByRole("main").getByRole("heading", { level: 1 })
          ).toBeVisible();
          await expect(page.locator("html")).toHaveClass(
            new RegExp(`\\b${colorScheme}\\b`)
          );
          expect(
            await page.evaluate(() => document.documentElement.scrollWidth)
          ).toBeLessThanOrEqual(width);
          if ([375, 1440].includes(width)) {
            await page.screenshot({
              path: testInfo.outputPath(`${path.slice(1) || "home"}-${colorScheme}.png`),
              fullPage: true,
            });
          }
        }
      }
    });
  }

  test("mobile menu supports keyboard entry and Escape focus return", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/");
    await page.keyboard.press("Tab");
    await expect(page.getByRole("link", { name: "Skip to main content" })).toBeFocused();
    const toggle = page.getByRole("button", { name: "Open navigation menu" });
    await toggle.focus();
    await page.keyboard.press("Enter");
    await page.keyboard.press("Tab");
    await expect(
      page
        .getByRole("navigation", { name: "Mobile navigation menu" })
        .getByRole("link")
        .first()
    ).toBeFocused();
    await page.keyboard.press("Escape");
    await expect(toggle).toBeFocused();
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
  });

  test("social preview and security headers are served", async ({ request }) => {
    const response = await request.get("/");
    expect(response.headers()["x-content-type-options"]).toBe("nosniff");
    expect(response.headers()["content-security-policy"]).toContain(
      "frame-ancestors 'none'"
    );
    expect(await response.text()).toMatch(
      /property="og:image" content="[^"]+\/social-image"/
    );
    const social = await request.get("/social-image");
    expect(social.ok()).toBe(true);
    expect(social.headers()["content-type"]).toContain("image/png");
  });
});
