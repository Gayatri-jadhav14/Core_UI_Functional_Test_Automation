export class DreamDiaryPage {
  constructor(page) {
    this.page = page;
    this.tableRows = "tbody tr"; // Adjust if different
  }

  async getRowCount() {
    return await this.page.locator(this.tableRows).count();
  }

  async getAllDreams() {
    const rows = await this.page.locator(this.tableRows);
    const data = [];
    const count = await rows.count();

    for (let i = 0; i < count; i++) {
      const row = rows.nth(i);
      const dreamName = await row.locator("td").nth(0).innerText();
      const daysAgo = await row.locator("td").nth(1).innerText();
      const dreamType = await row.locator("td").nth(2).innerText();
      data.push({ dreamName, daysAgo, dreamType });
    }

    return data;
  }
}
