import { test, expect } from "@playwright/test";
import { DreamDiaryPage } from "../pages/DreamDiaryPage";

test("dreams-diary.html: verify dream log table content", async ({ page }) => {
  await page.goto("https://arjitnigam.github.io/myDreams/dreams-diary.html");
  const diaryPage = new DreamDiaryPage(page);

  // 1. Check 10 rows
  const rowCount = await diaryPage.getRowCount();
  expect(rowCount).toBe(10);

  // 2. Check each row's data
  const dreams = await diaryPage.getAllDreams();
  for (const dream of dreams) {
    expect(dream.dreamName).not.toBe("");
    expect(dream.daysAgo).not.toBe("");
    expect(dream.dreamType).toMatch(/Good|Bad/);
  }
});
