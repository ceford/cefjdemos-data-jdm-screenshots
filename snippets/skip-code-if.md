## If a selector does not exist skip some code

const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Navigate to your page
  await page.goto('https://example.com');

  // Check if the selector exists
  const selector = 'your-selector';
  const isPresent = await page.locator(selector).count() > 0;

  if (isPresent) {
    console.log('Selector exists. Running additional code...');
    // Your code if the selector exists
  } else {
    console.log('Selector does not exist. Skipping some code...');
    // Skip some code if the selector is missing
  }

  await browser.close();
})();

// This approach is non-blocking, and using locator().count() helps you check the
// number of elements matching the selector (returns 0 if the element is not found).
