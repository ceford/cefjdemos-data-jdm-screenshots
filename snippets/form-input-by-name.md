## Find a form input element by name:

const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false }); // Launch browser
  const page = await browser.newPage(); // Create a new page
  await page.goto('https://example.com'); // Replace with your page URL

  // Select the input field by its "name" attribute and type a username
  await page.locator('input[name="username"]').fill('your-username-here');

  // Close the browser after the operation
  await browser.close();
})();
