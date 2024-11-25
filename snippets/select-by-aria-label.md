## Select by aria-label

Absolutely! In Playwright, if the button has an `aria-label` attribute, you can select it using the `aria` selector provided by Playwright. This is perfect for cases where the button text is an SVG icon, as the `aria-label` attribute is often used for accessibility.

Here's an example of how you can do this:

```javascript
// Using the aria-label selector
await page.click('button[aria-label="Your aria label text"]');
```

If you prefer using the Playwright's more semantic `getByRole` function, you can do it like this:

```javascript
// Using getByRole to select by aria-label
await page.getByRole('button', { name: 'Your aria label text' }).click();
```

Both methods will help you select the button by its `aria-label`. Just replace `"Your aria label text"` with the actual text from your button's `aria-label` attribute.

