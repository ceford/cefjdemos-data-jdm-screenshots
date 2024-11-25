## Select iframe by id

Yes, you can select the TinyMCE iframe by its `id` or any other attribute like `name` or `class`. In Playwright, if the iframe does not have a URL, you can locate it using a selector, such as an `id`. Once you've identified the iframe, you can interact with its content.

Here’s how to modify the previous Playwright script to select the TinyMCE iframe using an `id` and then select a visible word inside the editor:

### Example with iframe `id`:

```javascript
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  // Navigate to the page with the TinyMCE editor
  await page.goto('https://example.com'); // Replace with your actual URL

  // Wait for the TinyMCE iframe to load by selecting it using the iframe's id
  await page.waitForSelector('#yourIframeId'); // Replace with the actual iframe id

  // Access the TinyMCE iframe by its id
  const frame = await page.frame({
    selector: '#yourIframeId' // Replace with your iframe's selector, here using id
  });

  // Now interact with TinyMCE inside the iframe
  await frame.evaluate(() => {
    const editor = tinymce.activeEditor;
    const textToSelect = "yourWord"; // Replace this with the word you want to select

    const content = editor.getContent({ format: 'text' });
    const wordIndex = content.indexOf(textToSelect);

    if (wordIndex !== -1) {
      const selection = editor.selection;
      selection.setCursorLocation(editor.getBody().firstChild, wordIndex);
      selection.extend(editor.getBody().firstChild, wordIndex + textToSelect.length);
    }
  });

  // Keep the browser open for a few seconds to see the result
  await page.waitForTimeout(5000);

  await browser.close();
})();
```

### Steps Breakdown:

1. **Locate the iframe by its `id`**: Use `await page.waitForSelector('#yourIframeId')` to ensure the iframe is available, replacing `#yourIframeId` with the actual ID of the TinyMCE iframe.

2. **Access the iframe**: Use `page.frame({ selector: '#yourIframeId' })` to interact with the content inside the TinyMCE iframe by specifying the `id` as the selector.

3. **Interact with TinyMCE API**:
   - Get the active editor with `tinymce.activeEditor`.
   - Use the `selection` API to find and select the word you want to highlight within the editor's content.

### Notes:
- Make sure you replace `#yourIframeId` with the actual `id` of the TinyMCE iframe on your page.
- You can also use other types of selectors if the iframe is identified by attributes like `name`, `class`, or other DOM properties.

