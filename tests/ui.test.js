// tests/ui.test.js
const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const chromedriver = require("chromedriver");
const { expect } = require("chai");
const fs = require("fs");

describe("UI Test - Saucedemo Login", function () {
  this.timeout(60000);
  let driver;

  before(async function () {
    // Setup Chrome Service correctly
    const service = new chrome.ServiceBuilder(chromedriver.path);

    // Launch Chrome in guest mode to skip profile selection
    const options = new chrome.Options().addArguments("--guest");

    driver = await new Builder()
      .forBrowser("chrome")
      .setChromeOptions(options)
      .setChromeService(service) // ✅ ServiceBuilder, not .build()
      .build();

    await driver.get("https://www.saucedemo.com/");
  });

  after(async function () {
    if (driver) {
      await driver.quit();
    }
  });

  it("should login successfully", async function () {
    // Enter username & password
    await driver.findElement(By.id("user-name")).sendKeys("standard_user");
    await driver.findElement(By.id("password")).sendKeys("secret_sauce");
    await driver.findElement(By.id("login-button")).click();

    // Wait for redirect to inventory page
    await driver.wait(until.urlContains("inventory"), 10000);

    // Assert URL contains 'inventory'
    const currentUrl = await driver.getCurrentUrl();
    expect(currentUrl).to.include("inventory");

    // Take screenshot for confirmation
    const screenshot = await driver.takeScreenshot();
    fs.writeFileSync("saucedemo-login.png", screenshot, "base64");
    console.log("📸 Screenshot saved: saucedemo-login.png");
  });
});
