class DreamTotalPage {
  constructor(page) {
    this.page = page;
  }

  async getStatCount(label) {
    return this.page.evaluate((label) => {
      const rows = document.querySelectorAll("#dreamsTotal tbody tr");
      for (let tr of rows) {
        if (tr.children[0].textContent.trim() === label) {
          return parseInt(tr.children[1].textContent.trim());
        }
      }
      return -1;
    }, label);
  }
}

export { DreamTotalPage };
