## Select a word in a page

const { chromium } = require('playwright');

(async () => {
  // Launch browser
  const browser = await chromium.launch({ headless: false }); // Set headless to false if you want to see the browser
  const context = await browser.newContext();
  const page = await context.newPage();

  // Navigate to the webpage
  await page.goto('https://example.com');

  // Ensure the element is visible and contains the word you want
  const visibleTextElement = await page.waitForSelector('css=selector-for-element:visible');

  // Select a specific word within the element
  await page.evaluate(() => {
    const element = document.querySelector('css=selector-for-element');
    const textToSelect = "word"; // Specify the word you want to select

    if (element && element.innerText.includes(textToSelect)) {
      const range = document.createRange();
      const textNode = [...element.childNodes].find(node => node.nodeType === Node.TEXT_NODE && node.nodeValue.includes(textToSelect));

      if (textNode) {
        const wordIndex = textNode.nodeValue.indexOf(textToSelect);
        range.setStart(textNode, wordIndex);
        range.setEnd(textNode, wordIndex + textToSelect.length);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
  });

  // Close browser after a delay (optional, for demo purposes)
  await page.waitForTimeout(5000);
  await browser.close();
})();

Explanation:

    Launch Playwright: Start a browser and navigate to the webpage.
    Wait for the visible element: Use waitForSelector to find the visible element containing the word you want to select.
    Select the word: In the page.evaluate block, run JavaScript within the browser context. It uses the document.createRange() method to create a range object, which selects the word specified.
    Visible check: :visible ensures you only select from visible elements.

Notes:

    Replace 'css=selector-for-element' with the actual CSS selector for the element containing the text.
    Replace "word" with the specific word you are trying to select from the element's text.

