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
});

test.afterEach(async ({ language, country }) => {
    if (test.info().status !== test.info().expectedStatus)
    console.log(`\nTry command:\nLANGUAGE=${language} COUNTRY=${country} npx playwright test menus --project firefox --reporter dot -g "${test.info().title}"\n`);
  });

test('menus list', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 715,
    });
    await page.goto(testurl + 'option=com_menus&view=menus');

    await page.screenshot({ path: grabs + language + '/images/menus/menus-list.png', fullPage: true});

    // Select the New button
    await page.locator('.button-new').first().click();

    await page.screenshot({ path: grabs + language + '/images/menus/menus-edit-menu-details-tab.png', fullPage: true});
});

test('menus all menu items', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 715,
    });
    await page.goto(testurl + 'option=com_menus&view=items');

    await page.screenshot({ path: grabs + language + '/images/menus/menus-all-menu-items-list.png', fullPage: true});

});

test('menus options', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 550,
    });
    await page.goto(testurl + 'option=com_config&view=component&component=com_menus');

    await page.screenshot({ path: grabs + language + '/images/menus/menu-options-page-display-tab.png'});
});
