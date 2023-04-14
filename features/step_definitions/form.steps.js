const { Given, When, Then, AfterAll, BeforeAll } = require('@cucumber/cucumber');
const { chromium, firefox, webkit } = require('playwright');
const { expect } = require('chai');
const path = require('path');

let browser;
let context;
let page;
let headless = process.env.HEADLESS !== 'false';
const browserName = process.env.BROWSER || 'chromium';
const fs = require('fs');

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


When('Under “Our Models” - Select “Model: Hatchbacks”', { timeout: 15000 }, async () => {

  //Map and go to Hatchbacks button
  await page.$eval('button:has-text("Hatchbacks")', (element) => element.scrollIntoViewIfNeeded());

  // Click on the element
  await page.click('button:has-text("Hatchbacks")');

});

When('Mouse over the “A Class” model available and proceed to “Build your car”', async () => {

  // Wait for the element A-Class to appear
  await page.waitForSelector('.dh-io-vmos_2pz0m');

  // Get the element handle
  const elementHandle = await page.$('.dh-io-vmos_2pz0m');

  await elementHandle.scrollIntoViewIfNeeded();

  // Hover over the element
  await elementHandle.hover();

  //Map Build your car button

  //getByRole('menuitem', { name: 'Build your car' }).getByRole('link', { name: 'Build your car' })
  await page.getByRole('menuitem', { name: 'Build your car' }).getByRole('link', { name: 'Build your car' }).click();

  //It was necessary to do it, I don't know why, I will ask it on interview
  if (browserName === 'webkit') {
    await page.getByRole('menuitem', { name: 'Build your car' }).getByRole('link', { name: 'Build your car' }).click();
  }

  // wait until the A-Class page is loaded
  await page.waitForURL('**/A-KLASSE/**', { timeout: 60000 });

});

When('Filter by Fuel type “Diesel”', async () => {

  // Wait for the fuel selector element to appear
  await page.waitForSelector('#cc-app-container-main > div.cc-app-container__main-frame.cc-grid-container > div.cc-grid-container.ng-star-inserted > div > div:nth-child(2) > cc-motorization > cc-motorization-filters > cc-motorization-filters-form > form > div > div.cc-motorization-filters-form__primary > div > cc-motorization-filters-primary-filters > div > fieldset > div > ccwb-multi-select');

  // Get the fuel selector element handle
  const elementHandlefuel = await page.$('#cc-app-container-main > div.cc-app-container__main-frame.cc-grid-container > div.cc-grid-container.ng-star-inserted > div > div:nth-child(2) > cc-motorization > cc-motorization-filters > cc-motorization-filters-form > form > div > div.cc-motorization-filters-form__primary > div > cc-motorization-filters-primary-filters > div > fieldset > div > ccwb-multi-select');

  // Scroll to the fuel selector element (if needed)
  await elementHandlefuel.scrollIntoViewIfNeeded();

  // Click on the fuel selector element
  await elementHandlefuel.click({ force: true });

  // Find the checkbox element with text "Diesel"
  const checkbox = await page.locator('ccwb-checkbox').filter({ hasText: 'Diesel' }).locator('path');

  // Wait for the checkbox element to appear
  await checkbox.waitFor();

  // Click on the checkbox element
  await checkbox.click({ force: true });

  //Click to close fuel selector element
  await elementHandlefuel.click({ force: true });

});

When('Take and save a screenshot of the results', async () => {

  // Find the motorization-comparison element
  const element = await page.$('cc-motorization-comparison');

  // Scroll to the element to be better to take a screenshot
  await element.scrollIntoViewIfNeeded();
  await element.click({ force: true });
  await page.waitForTimeout(2000);

  //Take the screenshot
  await page.screenshot({ path: 'screenshot.png' });

  //Wait the fuel selector element to be fully closed
  await page.waitForTimeout(2000);

});


When('Save the value “£” of the highest and lowest price results in a text file', async () => {

  await page.waitForSelector('[class="cc-motorization-header__price--with-environmental-hint"]'); // Wait for the selector to be visible
  const items = await page.$$('[class="cc-motorization-header__price--with-environmental-hint"]'); // Find all elements matching the selector

  console.log('Number of elements:', items.length); // Log the number of elements found

  let highestPrice = Number.NEGATIVE_INFINITY; // Initialize highest price to negative infinity
  let lowestPrice = Number.POSITIVE_INFINITY; // Initialize lowest price to positive infinity

  for (const item of items) {
    const text = await item.evaluate(el => el.textContent); // Get the text content of the element
    const price = parseFloat(text.replace(/[^\d.]/g, '')); // Extract numeric value from text
    if (!isNaN(price)) { // Check if extracted value is a valid number
      if (price > highestPrice) { // Update highest price if necessary
        highestPrice = price;
      }
      if (price < lowestPrice) { // Update lowest price if necessary
        lowestPrice = price;
      }
    }
  }

  const prices = [highestPrice, lowestPrice]; // Create an array with highest and lowest prices
  console.log('Highest Price:', highestPrice); // Log the highest price
  console.log('Lowest Price:', lowestPrice); // Log the lowest price

  // Write prices to file using writeFileSync

  fs.writeFileSync('prices.txt', prices.join('\n'));

});


AfterAll(async () => {
  // Close the browser after the tests have completed
  await browser.close();
});