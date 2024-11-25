In Playwright, you can select a button by its text content using the `text` selector. Here’s a basic example of how to do it:

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=False)
    page = browser.new_page()

    # Navigate to the desired page
    page.goto("https://example.com")

    # Click a button by its text content
    page.click("text='Button Text'")

    # Close the browser
    browser.close()
```

### Explanation
- **`page.click("text='Button Text'")`**: The `text=` selector is a Playwright-specific selector that finds elements based on the text content. Replace `'Button Text'` with the actual text of the button you want to click.

### Additional Tips
- **Partial Text**: You can also match partial text by simply using a substring. For instance, `page.click("text='utton Tex'")` would still match `"Button Text"`.
- **Case Sensitivity**: The `text=` selector is case-insensitive by default.

### Alternative: Using CSS + Text
If you want to make sure it’s specifically a `<button>`, you can combine the `text=` selector with a CSS selector:
```python
page.click("button:has-text('Button Text')")
```

This will only match buttons with the specified text content.