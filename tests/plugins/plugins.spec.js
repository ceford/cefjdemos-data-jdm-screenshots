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
    console.log(`\nTry command:\nLANGUAGE=${language} COUNTRY=${country} npx playwright test plugins --project firefox --reporter dot -g "${test.info().title}"\n`);
});

test('plugins', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 550,
    });
    await page.goto(testurl + 'option=com_plugins&view=plugins');
    await page.screenshot({ path: grabs + language + '/images/plugins/plugins-list.png', fullPage: true});

    // Open the first item in the list
    const item_id = await page.locator('#cb0').inputValue();
    const url = testurl + 'option=com_plugins&task=plugin.edit&extension_id=' + item_id;
    await page.goto(url);
    await page.screenshot({ path: grabs + language + '/images/plugins/plugins-plugin-tab.png', fullPage: true});

    // Close the page or it will be left checked out.
    await page.locator('.button-cancel').click();
});
