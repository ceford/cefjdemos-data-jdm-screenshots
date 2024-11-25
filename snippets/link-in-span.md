## Find a link using an enclosed span with a specific class

const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false }); // Launch browser
  const page = await browser.newPage(); // Create a new page
  await page.goto('https://example.com'); // Replace with your page URL

  // Locate the anchor (<a>) containing a span with the class 'icon-power-off'
  const logoutLink = await page.locator('a:has(span.icon-power-off)');

  // Click the logout link
  await logoutLink.click();

  // Close the browser after the operation
  await browser.close();
})();

