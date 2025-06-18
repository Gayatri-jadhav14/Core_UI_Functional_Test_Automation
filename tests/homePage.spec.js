const { test, expect } = require("@playwright/test");
const { HomePage } = require("../pages/HomePage");

test("index.html: verify loading, visibility and new tabs", async ({
  page,
  context,
}) => {
  const homePage = new HomePage(page);

  await homePage.navigate();

  // Check loader appears and disappears
  await homePage.waitForLoaderToDisappear();

  // Check main content is visible
  expect(await homePage.isMyDreamsButtonVisible()).toBeTruthy();

  const initialPages = context.pages();

  await homePage.clickMyDreams();

  // Wait for both pages to open (wait until we have 3 total)
  await expect
    .poll(() => context.pages().length, {
      timeout: 5000,
    })
    .toBeGreaterThanOrEqual(3);

  const allPages = context.pages();
  const urls = allPages.map((p) => p.url());

  expect(urls.some((url) => url.includes("dreams-diary.html"))).toBeTruthy();
  expect(urls.some((url) => url.includes("dreams-total.html"))).toBeTruthy();
});
