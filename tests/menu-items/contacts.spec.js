// @ts-check
import { test } from '../jtest';

test.use({
    viewport: { width: 1440, height: 850 },
    testIdAttribute: 'data-type'
});

test.beforeAll(async ({language}) => {
    //console.log('Language: ' + language);
});

test.beforeEach(async ({ page, testurl, country, username, password }) => {
    // Set timeout for this hook.
    test.setTimeout(60000);
    // Runs before each test and signs in each page.
    await page.goto(testurl);
    await page.locator('#mod-login-username').fill(username);
    await page.locator('#mod-login-password').fill(password);
    await page.locator('#lang').selectOption(country);
    const loginBtn = await page.locator('#btn-login-submit');
    await loginBtn.click();

    // Open the main menu.
    await page.goto(testurl + 'option=com_menus&view=items&menutype=mainmenu');

    // Select the New button
    await page.locator('.button-new').first().click();

    // Select the Menu Item Type Select button
    await page.locator('.btn-primary').first().click();
    // Wait for 3 seconds
    await page.waitForTimeout(3000);
});

test.afterEach(async ({ testurl, language, country }) => {
    if (test.info().status !== test.info().expectedStatus)
    console.log(`\nTry command:\nURL=${testurl} LANGUAGE=${language} COUNTRY=${country} npx playwright test menu-items --project firefox --reporter dot -g "${test.info().title}"\n`);
  });

test('create contact', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 715,
    });

    const fr = page.frameLocator('.iframe-content');

    // Find all of the accordion buttons and expand them.
    const buttons = fr.locator('.accordion-button');
    const count = await buttons.count();
    for (let i = 0; i < count; ++i)
    await buttons.nth(i).click();

    // Wait for 3 seconds
    await page.waitForTimeout(3000);

    // Select the link for Create Contact (data-type="xxx")
    await fr.getByTestId('COM_CONTACT_FORM_VIEW_DEFAULT_TITLE').first().click();

    // Wait for 3 seconds
    await page.waitForTimeout(3000);

    await page.screenshot({ path: grabs + language + '/images/menu-items/contacts-create-contact-details-tab.png'});

    // Close the article or it will be left checked out.
    await page.locator('.button-cancel').click();
});

test('featured contacts', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 715,
    });

    const fr = page.frameLocator('.iframe-content');

    // Find all of the accordion buttons and expand them.
    const buttons = fr.locator('.accordion-button');
    const count = await buttons.count();
    for (let i = 0; i < count; ++i)
    await buttons.nth(i).click();

    // Wait for 3 seconds
    await page.waitForTimeout(3000);

    // Select the link for Featured Contacts (data-type="xxx")
    await fr.getByTestId('COM_CONTACT_FEATURED_VIEW_DEFAULT_TITLE').first().click();

    // Wait for 3 seconds
    await page.waitForTimeout(3000);
    await page.screenshot({ path: grabs + language + '/images/menu-items/contacts-featured-contacts-details-tab.png'});

    // Find the List Layouts tab.
    await page.locator('button[aria-controls="attrib-advanced"]').first().click();
    await page.screenshot({ path: grabs + language + '/images/menu-items/contacts-featured-contacts-list-layouts-tab.png', fullPage: true });

    // Find the Form tab.
    await page.locator('button[aria-controls="attrib-contact"]').first().click();
    await page.screenshot({ path: grabs + language + '/images/menu-items/contacts-featured-contacts-form-tab.png', fullPage: true });

    // Find the Mail Options tab.
    await page.locator('button[aria-controls="attrib-Contact_Form"]').first().click();
    await page.screenshot({ path: grabs + language + '/images/menu-items/contacts-featured-contacts-mail-options-tab.png', fullPage: true });

    // Close the article or it will be left checked out.
    await page.locator('.button-cancel').click();
});

test('list all categories in a contact category tree', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 715,
    });

    const fr = page.frameLocator('.iframe-content');

    // Find all of the accordion buttons and expand them.
    const buttons = fr.locator('.accordion-button');
    const count = await buttons.count();
    for (let i = 0; i < count; ++i)
    await buttons.nth(i).click();

    // Wait for 3 seconds
    await page.waitForTimeout(3000);

    // Select the link for Featured Contacts (data-type="xxx")
    await fr.getByTestId('COM_CONTACT_CATEGORIES_VIEW_DEFAULT_TITLE').first().click();

    // Wait for 3 seconds
    await page.waitForTimeout(3000);
    await page.screenshot({ path: grabs + language + '/images/menu-items/contacts-list-all-categories-tree-details-tab.png'});

    // Find the Categories tab.
    await page.locator('button[aria-controls="attrib-basic"]').first().click();
    await page.screenshot({ path: grabs + language + '/images/menu-items/contacts-list-all-categories-tree-categories-tab.png', fullPage: true });

    // Find the Category tab.
    await page.locator('button[aria-controls="attrib-category"]').first().click();
    await page.screenshot({ path: grabs + language + '/images/menu-items/contacts-list-all-categories-tree-category-tab.png', fullPage: true });

    // Find the List Layouts tab.
    await page.locator('button[aria-controls="attrib-advanced"]').first().click();
    await page.screenshot({ path: grabs + language + '/images/menu-items/contacts-list-all-categories-tree-list-layouts-tab.png', fullPage: true });

    // Find the Contact Display Options tab.
    await page.locator('button[aria-controls="attrib-contact"]').first().click();
    await page.screenshot({ path: grabs + language + '/images/menu-items/contacts-list-all-categories-tree-contact-display-options.png', fullPage: true });

    // Find the Mail Options tab.
    await page.locator('button[aria-controls="attrib-Contact_Form"]').first().click();
    await page.screenshot({ path: grabs + language + '/images/menu-items/contacts-list-all-categories-tree-mail-options-tab.png', fullPage: true });

    // Close the article or it will be left checked out.
    await page.locator('.button-cancel').click();
});

test('list contacts in a category', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 715,
    });

    const fr = page.frameLocator('.iframe-content');

    // Find all of the accordion buttons and expand them.
    const buttons = fr.locator('.accordion-button');
    const count = await buttons.count();
    for (let i = 0; i < count; ++i)
    await buttons.nth(i).click();

    // Wait for 3 seconds
    await page.waitForTimeout(3000);

    // Select the link for Featured Contacts (data-type="xxx")
    await fr.getByTestId('COM_CONTACT_CATEGORIES_VIEW_DEFAULT_TITLE').first().click();

    // Wait for 3 seconds
    await page.waitForTimeout(3000);
    await page.screenshot({ path: grabs + language + '/images/menu-items/contacts-list-contacts-in-a-category-details-tab.png'});

    // Find the Category tab.
    await page.locator('button[aria-controls="attrib-basic"]').first().click();
    await page.screenshot({ path: grabs + language + '/images/menu-items/contacts-list-contacts-in-a-category-category-tab.png', fullPage: true });

    // Close the article or it will be left checked out.
    await page.locator('.button-cancel').click();
});

test('single contact', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 715,
    });

    const fr = page.frameLocator('.iframe-content');

    // Find all of the accordion buttons and expand them.
    const buttons = fr.locator('.accordion-button');
    const count = await buttons.count();
    for (let i = 0; i < count; ++i)
    await buttons.nth(i).click();

    // Wait for 3 seconds
    await page.waitForTimeout(3000);

    // Select the link for Single Contact (data-type="xxx")
    await fr.getByTestId('COM_CONTACT_CONTACT_VIEW_DEFAULT_TITLE').first().click();

    // Wait for 3 seconds
    await page.waitForTimeout(3000);
    await page.screenshot({ path: grabs + language + '/images/menu-items/contacts-single-contact-details-tab.png'});

    // Find the Contact Display Options tab.
    await page.locator('button[aria-controls="attrib-params"]').first().click();
    await page.screenshot({ path: grabs + language + '/images/menu-items/contacts-single-contact-contact-display-options-tab.png', fullPage: true });

    // Find the Mail Options tab.
    await page.locator('button[aria-controls="attrib-Contact_Form"]').first().click();
    await page.screenshot({ path: grabs + language + '/images/menu-items/contacts-single-contact-mail-options-tab.png', fullPage: true });

    // Close the article or it will be left checked out.
    await page.locator('.button-cancel').click();
});
