const { Given, When, Then, AfterAll, BeforeAll } = require('@cucumber/cucumber');
const { chromium, firefox, webkit } = require('playwright');
const { expect } = require('chai');
const path = require('path');

let browser;
let context;
let page;
let headless = process.env.HEADLESS !== 'false';
const browserName = process.env.BROWSER || 'chromium';

BeforeAll(async () => {
  // Access the browser environment variable or use 'chromium' as default

  if (browserName === 'chromium') {
    browser = await chromium.launch({ headless });
  } else if (browserName === 'firefox') {
    browser = await firefox.launch({ headless });
  } else if (browserName === 'webkit') {
    browser = await webkit.launch({ headless });
  } else {
    throw new Error(`Invalid browser name: ${browserName}`);
  }

  context = await browser.newContext();
  page = await context.newPage();
});

Given('Open Mercedes-benz United Kingdom market', { timeout: 60000 }, async () => {

  await page.setViewportSize({ width: 1280, height: 820 }); // Set window size

  // Visit website
  await page.goto('https://www.mercedes-benz.co.uk/');

  const pageTitle = await page.title(); // Retrieve page title
  expect(pageTitle).to.equal('Mercedes-Benz Passenger Cars'); //Check the title

  // Wait for the Agree to all element to be available
  await page.waitForSelector('div > div > div.cmm-cookie-banner__content > cmm-buttons-wrapper > div > div > button.wb-button.wb-button--primary.wb-button--small.wb-button--accept-all', { timeout: 12000 });

  // Click on the Agree to all element
  await page.click('div > div > div.cmm-cookie-banner__content > cmm-buttons-wrapper > div > div > button.wb-button.wb-button--primary.wb-button--small.wb-button--accept-all');

});


When('Under “Our Models” - Select “Model: Hatchbacks”', { timeout: 60000 }, async () => {

  //Map and go to Hatchbacks button
  await page.$eval('button:has-text("Hatchbacks")', (element) => element.scrollIntoViewIfNeeded());

  // Click on the element
  await page.click('button:has-text("Hatchbacks")');

});


AfterAll(async () => {
  // Close the browser after the tests have completed
  await browser.close();
});