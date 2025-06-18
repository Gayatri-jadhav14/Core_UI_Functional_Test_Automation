class HomePage {
  constructor(page) {
    this.page = page;
    this.loader = "#loadingAnimation"; // ✅ Correct
    this.myDreamsButton = "#dreamButton";
  }

  async navigate() {
    await this.page.goto("https://arjitnigam.github.io/myDreams/");
  }

  async waitForLoaderToDisappear() {
    await this.page.waitForFunction(
      () => {
        const el = document.querySelector("#loadingAnimation");
        return el && el.classList.contains("hidden");
      },
      null,
      { timeout: 5000 }
    );
  }
  async isMyDreamsButtonVisible() {
    return await this.page.isVisible(this.myDreamsButton);
  }

  async clickMyDreams() {
    await this.page.click(this.myDreamsButton);
  }
}

module.exports = { HomePage };
