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

test('system links menu heading', async ({ page, testurl, grabs, language }) => {
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

    // Select the link that has data-type="heading"
    let btn2 = await fr.getByTestId('heading');
    await btn2.first().click();
    // Wait for 3 seconds
    await page.waitForTimeout(3000);

    await page.screenshot({ path: grabs + language + '/images/menu-items/system-links-menu-heading-details-tab.png'});
});

test('system links menu item alias', async ({ page, testurl, grabs, language }) => {
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

    // Select the link that has data-type="alias"
    await fr.getByTestId('alias').first().click();

    // Wait for 3 seconds
    await page.waitForTimeout(3000);
    await page.screenshot({ path: grabs + language + '/images/menu-items/system-links-menu-item-alias-details-tab.png'});

    // Close the article or it will be left checked out.
    await page.locator('.button-cancel').click();
});

test('system links separator', async ({ page, testurl, grabs, language }) => {
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

    // Select the link that has data-type="separator"
    await fr.getByTestId('separator').first().click();

    // Wait for 3 seconds
    await page.waitForTimeout(3000);

    await page.screenshot({ path: grabs + language + '/images/menu-items/system-links-separator-details-tab.png'});

    // Close the article or it will be left checked out.
    await page.locator('.button-cancel').click();
});

test('system links url', async ({ page, testurl, grabs, language }) => {
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

    // Select the link that has data-type="url"
    await fr.getByTestId('url').first().click();

    // Wait for 3 seconds
    await page.waitForTimeout(3000);
    await page.screenshot({ path: grabs + language + '/images/menu-items/system-links-url-details-tab.png'});

    // Close the article or it will be left checked out.
    await page.locator('.button-cancel').click();
});
