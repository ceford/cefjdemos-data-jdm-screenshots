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
});

test.afterEach(async ({ testurl, language, country }) => {
    if (test.info().status !== test.info().expectedStatus)
    console.log(`\nTry command:\nURL=${testurl} LANGUAGE=${language} COUNTRY=${country} npx playwright test menu-items --project firefox --reporter dot -g "${test.info().title}"\n`);
  });

test('menu item weblinks list all web link categories', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 715,
    });
    await page.goto(testurl + 'option=com_menus&view=items&menutype=mainmenu');

    // Select the New button
    await page.locator('.button-new').first().click();

    // Select the Menu Item Type Select button
    await page.locator('.btn-primary').first().click();

    // Wait for 3 seconds
    await page.waitForTimeout(3000);

    const fr = page.frameLocator('.iframe-content');

    // Find all of the accordion buttons and expand them.
    const buttons = fr.locator('.accordion-button');
    const count = await buttons.count();
    for (let i = 0; i < count; ++i)
    await buttons.nth(i).click();

    // Wait for 3 seconds
    await page.waitForTimeout(3000);

    // Select the List All Web Link Categories link
    await fr.getByTestId('COM_WEBLINKS_CATEGORIES_VIEW_DEFAULT_TITLE').first().click();

    // Wait for 3 seconds
    await page.waitForTimeout(3000);
    await page.screenshot({ path: grabs + language + '/images/menu-items/weblinks-list-all-web-link-categories-details-tab.png'});

    // Find the Categories tab.
    await page.locator('button[aria-controls="attrib-basic"]').first().click();
    await page.screenshot({ path: grabs + language + '/images/menu-items/weblinks-list-all-web-link-categories-categories-tab.png', fullPage: true });

    // Find the Category tab.
    await page.locator('button[aria-controls="attrib-category"]').first().click();
    await page.screenshot({ path: grabs + language + '/images/menu-items/weblinks-list-all-web-link-categories-category-tab.png', fullPage: true });

    // Find the List Layout tab.
    await page.locator('button[aria-controls="attrib-advanced"]').first().click();
    await page.screenshot({ path: grabs + language + '/images/menu-items/weblinks-list-all-web-link-categories-list-layouts-tab.png', fullPage: true });

    // Close the article or it will be left checked out.
    await page.locator('.button-cancel').click();
});

test('menu item list web links in a category', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 715,
    });
    await page.goto(testurl + 'option=com_menus&view=items&menutype=mainmenu');

    // Select the New button
    await page.locator('.button-new').first().click();

    // Select the Menu Item Type Select button
    await page.locator('.btn-primary').first().click();

    // Wait for 3 seconds
    await page.waitForTimeout(3000);

    const fr = page.frameLocator('.iframe-content');

    // Find all of the accordion buttons and expand them.
    const buttons = fr.locator('.accordion-button');
    const count = await buttons.count();
    for (let i = 0; i < count; ++i)
    await buttons.nth(i).click();

    // Wait for 3 seconds
    await page.waitForTimeout(3000);

    // Select the List All Web Link Categories link
    await fr.getByTestId('COM_WEBLINKS_CATEGORY_VIEW_DEFAULT_TITLE').first().click();

    // Wait for 3 seconds
    await page.waitForTimeout(3000);
    await page.screenshot({ path: grabs + language + '/images/menu-items/weblinks-list-web-links-in-a-category-details-tab.png'});

    // Find the Category tab.
    await page.locator('button[aria-controls="attrib-basic"]').first().click();
    await page.screenshot({ path: grabs + language + '/images/menu-items/weblinks-list-web-links-in-a-category-category-tab.png', fullPage: true });

    // Find the List Layouts tab.
    await page.locator('button[aria-controls="attrib-advanced"]').first().click();
    await page.screenshot({ path: grabs + language + '/images/menu-items/weblinks-list-web-links-in-a-category-list-layouts-tab.png', fullPage: true });

    // Close the article or it will be left checked out.
    await page.locator('.button-cancel').click();
});

test('menu item submit a web link', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 715,
    });
    await page.goto(testurl + 'option=com_menus&view=items&menutype=mainmenu');

    // Select the New button
    await page.locator('.button-new').first().click();

    // Select the Menu Item Type Select button
    await page.locator('.btn-primary').first().click();

    // Wait for 3 seconds
    await page.waitForTimeout(3000);

    const fr = page.frameLocator('.iframe-content');

    // Find all of the accordion buttons and expand them.
    const buttons = fr.locator('.accordion-button');
    const count = await buttons.count();
    for (let i = 0; i < count; ++i)
    await buttons.nth(i).click();

    // Wait for 3 seconds
    await page.waitForTimeout(3000);

    // Select the List All Web Link Categories link
    await fr.getByTestId('COM_WEBLINKS_WEBLINK_VIEW_DEFAULT_TITLE').first().click();

    // Wait for 3 seconds
    await page.waitForTimeout(3000);
    await page.screenshot({ path: grabs + language + '/images/menu-items/weblinks-submit-a-web-link-details-tab.png'});

    // Close the article or it will be left checked out.
    await page.locator('.button-cancel').click();
});
