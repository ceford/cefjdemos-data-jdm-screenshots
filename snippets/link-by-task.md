## To find a link containing a specific task

const link = await page.locator('a[href*="task=article.edit"]');
await link.click();

const link = await page.locator('//a[contains(@href, "task=article.edit")]');
await link.click();

// To Check if a selector exists

const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Navigate to your page
  await page.goto('https://example.com');

  // Check if the selector exists
  const selector = 'your-selector';
  const element = await page.$(selector); // or use page.locator(selector)

  if (element) {
    console.log('Selector exists. Running additional code...');
    // Your code if the selector exists
  } else {
    console.log('Selector does not exist. Skipping some code...');
    // Skip some code if the selector is missing
  }

  await browser.close();
})();

Explanation:

    page.$(selector) is used to check if the element matching the selector exists.
    If the selector is found, it returns the first matching element, otherwise, it returns null.
    If the element exists (if (element)), you can execute the code that depends on the selector being present.
    If the selector is not found (else), the code inside the else block will be skipped.

Alternatively, you can use the page.locator() method, which is a more powerful
and recommended way to handle elements, especially when you need to wait for
specific conditions like visibility or attachment to the DOM.

