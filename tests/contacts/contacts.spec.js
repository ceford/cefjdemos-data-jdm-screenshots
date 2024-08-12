// @ts-check
import { test } from '../jtest';

test.use({
    viewport: { width: 1440, height: 850 },
});

test.beforeAll(async ({language}) => {
    console.log('Language: ' + language);
});

test.beforeEach(async ({ page, testurl, country, username, password }) => {
    // Set timeout for this hook.
    // test.setTimeout(60000);
    // Runs before each test and signs in each page.
    await page.goto(testurl);
    await page.locator('#mod-login-username').fill(username);
    await page.locator('#mod-login-password').fill(password);
    await page.locator('#lang').selectOption(country);
    const loginBtn = await page.locator('#btn-login-submit');
    await loginBtn.click();
});

test.afterEach(async ({ language, country }) => {
    if (test.info().status !== test.info().expectedStatus)
    console.log(`\nTry command:\nLANGUAGE=${language} COUNTRY=${country} npx playwright test contacts --project firefox --reporter dot -g "${test.info().title}"\n`);
  });

test('contacts list', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 480,
      });
  await page.goto(testurl + 'option=com_contact&view=contacts');

  await page.screenshot({ path: grabs + language + '/images/contacts/contacts-list.png'});
});

test('contacts edit contact tab', async ({ page, testurl, grabs, language }) => {
    // Open the list page.
    await page.goto(testurl + 'option=com_contact&view=contacts');

    // Open the first item in the list
    const contact_id = await page.locator('#cb0').inputValue();
    const url = testurl + 'option=com_contact&task=contact.edit&id=' + contact_id;
    await page.goto(url);

    await page.screenshot({ path: grabs + language + '/images/contacts/contacts-edit-contact-tab.png', fullPage: true });

    // Close the contact or it will be left checked out.
    await page.locator('.button-cancel').click();
});

test('contacts edit miscellaneous tab', async ({ page, testurl, grabs, language }) => {
    // Open the list page.
    await page.goto(testurl + 'option=com_contact&view=contacts');

    // Open the first item in the list
    const contact_id = await page.locator('#cb0').inputValue();
    const url = testurl + 'option=com_contact&task=contact.edit&id=' + contact_id;
    await page.goto(url);

    // Find the Miscellaneous Information tab.
    let btn = await page.locator('button[aria-controls="misc"]');
    await btn.nth(0).click();

    await page.screenshot({ path: grabs + language + '/images/contacts/contacts-edit-miscellaneous-tab.png', fullPage: true });

    // Close the contact or it will be left checked out.
    await page.locator('.button-cancel').click();
});

test('contacts edit display tab', async ({ page, testurl, grabs, language }) => {
    // Open the list page.
    await page.goto(testurl + 'option=com_contact&view=contacts');

    // Open the first item in the list
    const contact_id = await page.locator('#cb0').inputValue();
    const url = testurl + 'option=com_contact&task=contact.edit&id=' + contact_id;
    await page.goto(url);

    // Find the Miscellaneous Information tab.
    let btn = await page.locator('button[aria-controls="attrib-display"]');
    await btn.nth(0).click();

    // This is a long page with lots of obvious fields - so show only viewport.
    await page.screenshot({ path: grabs + language + '/images/contacts/contacts-edit-display-tab.png'});

    // Close the contact or it will be left checked out.
    await page.locator('.button-cancel').click();
});

test('contacts edit form tab', async ({ page, testurl, grabs, language }) => {
    // Open the list page.
    await page.goto(testurl + 'option=com_contact&view=contacts');

    // Open the first item in the list
    const contact_id = await page.locator('#cb0').inputValue();
    const url = testurl + 'option=com_contact&task=contact.edit&id=' + contact_id;
    await page.goto(url);

    // Find the Form tab.
    let btn = await page.locator('button[aria-controls="attrib-email"]');
    await btn.nth(0).click();

    await page.screenshot({ path: grabs + language + '/images/contacts/contacts-edit-form-tab.png', fullPage: true });

    // Close the contact or it will be left checked out.
    await page.locator('.button-cancel').click();
});

test('contacts edit category category tab', async ({ page, testurl, grabs, language, country }) => {
    // Open the list page.
    await page.goto(testurl + 'option=com_categories&view=categories&extension=com_contact');

    // Open the first item in the list
    const contact_id = await page.locator('#cb0').inputValue();
    const url = testurl + 'option=com_categories&task=category.edit&id=' + contact_id +'&extension=com_contact';
    await page.goto(url);

    await page.screenshot({ path: grabs + language + '/images/contacts/contacts-edit-category-category-tab.png', fullPage: true });

    // Close the contact or it will be left checked out.
    await page.locator('.button-cancel').click();
});
