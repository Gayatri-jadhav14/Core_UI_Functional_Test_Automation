import { test, expect } from "@playwright/test";
import { DreamTotalPage } from "../pages/DreamTotalPage";

test("dreams-total.html: verify summary stats and recurring dreams via diary", async ({
  page,
}) => {
  // Go to diary page and extract recurring names
  await page.goto("https://arjitnigam.github.io/myDreams/dreams-diary.html");
  const rows = await page.locator("table tbody tr").all();
  const names = await Promise.all(
    rows.map((r) => r.locator("td").nth(0).innerText())
  );
  const counts = names.reduce(
    (m, name) => ((m[name] = (m[name] || 0) + 1), m),
    {}
  );
  const recurring = Object.entries(counts)
    .filter(([, c]) => c > 1)
    .map(([name]) => name);

  // Validate expected recurring dreams
  expect(recurring).toContain("Flying over mountains");
  expect(recurring).toContain("Lost in maze");

  // Now validate summary stats as usual
  await page.goto("https://arjitnigam.github.io/myDreams/dreams-total.html");
  const totalPage = new DreamTotalPage(page);

  expect(await totalPage.getStatCount("Good Dreams")).toBe(6);
  expect(await totalPage.getStatCount("Bad Dreams")).toBe(4);
  expect(await totalPage.getStatCount("Total Dreams")).toBe(10);
  expect(await totalPage.getStatCount("Recurring Dreams")).toBe(
    recurring.length
  );
});
