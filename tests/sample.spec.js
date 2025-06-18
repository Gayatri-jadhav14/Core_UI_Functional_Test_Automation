const { test, expect } = require("@playwright/test");

test("open dream portal home page", async ({ page }) => {
  await page.goto("https://arjitnigam.github.io/myDreams/");
  await expect(page).toHaveTitle(/Dream/i);
});
