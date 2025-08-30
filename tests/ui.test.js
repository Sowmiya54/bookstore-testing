const { Builder, By, until } = require("selenium-webdriver");
require("chromedriver");
const { expect } = require("chai");

describe("UI - Bookstore Frontend", function () {
  this.timeout(60000); // 60 seconds timeout

  let driver;
  const frontendURL = "http://localhost:5173";

  before(async function () {
    console.log("🚀 Starting Selenium...");
    driver = await new Builder().forBrowser("chrome").build();
    await driver.get(frontendURL);

    const title = await driver.getTitle();
    console.log("🌍 Page loaded, title:", title);
  });

  after(async function () {
    if (driver) {
      await driver.quit();
    }
  });

  it("should display books when 'Show Available Books' is clicked", async function () {
    console.log("🔎 Looking for #show-books button...");

    // Wait for the button to appear in the DOM
    const showBooksButton = await driver.wait(
      until.elementLocated(By.id("show-books")),
      10000
    );

    console.log("✅ Found 'Show Available Books' button, clicking...");
    await showBooksButton.click();

    // Wait for the grid of books to appear
    const bookGrid = await driver.wait(
      until.elementLocated(By.css(".book-grid")), // ✅ updated selector
      10000
    );

    console.log("📚 Book grid appeared!");

    // Check that at least one book-card exists
    const books = await driver.findElements(By.css(".book-card"));
    console.log(`📚 Found ${books.length} book(s).`);

    expect(books.length).to.be.greaterThan(0);
  });
});
