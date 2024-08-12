// @ts-check
import { test } from '../jtest';

test.use({
    viewport: { width: 1440, height: 850 },
    testIdAttribute: 'data-type'
});

test.beforeAll(async ({language}) => {
    console.log('Language: ' + language);
});

test.beforeEach(async ({ page, testurl, country, username, password }) => {
    // Set timeout for this hook.
    //test.setTimeout(5000);
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

test.afterEach(async ({ language, country }) => {
    if (test.info().status !== test.info().expectedStatus)
    console.log(`\nTry command:\nLANGUAGE=${language} COUNTRY=${country} npx playwright test menu-items --project firefox --reporter dot -g "${test.info().title}"\n`);
});

test('smart search search', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 715,
      });

    const fr = page.frameLocator('.iframe-content');
    let btn = fr.locator('button[aria-controls="collapse5"]');
    await btn.first().click();
    // Wait for 3 seconds
    await page.waitForTimeout(3000);

    // Select the link for Search (data-type="xxx")
    let btn2 = await fr.getByTestId('COM_FINDER_MENU_SEARCH_VIEW_DEFAULT_TITLE');
    await btn2.first().click();
    // Wait for 3 seconds
    await page.waitForTimeout(3000);
    await page.screenshot({ path: grabs + language + '/images/menu-items/smart-search-search-details-tab.png'});

    // Find the Options tab.
    let btn3 = await page.locator('button[aria-controls="attrib-basic"]');
    await btn3.first().click();
    await page.screenshot({ path: grabs + language + '/images/menu-items/smart-search-search-options-tab.png', fullPage: true });

    // Find the Advanced tab.
    let btn4 = await page.locator('button[aria-controls="attrib-advanced"]');
    await btn4.first().click();
    await page.screenshot({ path: grabs + language + '/images/menu-items/smart-search-search-advanced-tab.png', fullPage: true });
});

