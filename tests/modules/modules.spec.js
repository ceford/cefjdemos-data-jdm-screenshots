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

// Example common tabs for all modules
test('modules custom', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 550,
    });
    // Custom module (Modules, Menu Assignment, Options, Advanced and Permissions tabs)
    await page.goto(testurl + 'option=com_modules&task=module.add&client_id=0&eid=44');
    await page.screenshot({ path: grabs + language + '/images/modules/modules-custom-module-tab.png', fullPage: true});

    // Find the Menu Assignment tab and save it in the (common) modules.
    await page.locator('button[aria-controls="assignment"]').first().click();
    // Select the Only on the pages selected option
    await page.locator('#jform_assignment').selectOption('1');
    await page.screenshot({ path: grabs + language + '/images/modules/modules-custom-menu-assignment-tab.png', fullPage: true });

    // Find the Options tab and save it in the (common) modules.
    await page.locator('button[aria-controls="attrib-options"]').first().click();
    await page.screenshot({ path: grabs + language + '/images/modules/modules-custom-options-tab.png', fullPage: true });

    // Find the Advanced tab and save it in the (common) modules.
    await page.locator('button[aria-controls="attrib-advanced"]').first().click();
    await page.screenshot({ path: grabs + language + '/images/modules/modules-custom-advanced-tab.png', fullPage: true });

    // Find the Permissions tab and save it in the (common) modules.
    await page.locator('button[aria-controls="permissions"]').first().click();
    await page.screenshot({ path: grabs + language + '/images/modules/modules-custom-permissions-tab.png', fullPage: true });
});

test('modules options', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 450,
    });
    await page.goto(testurl + 'option=com_config&view=component&component=com_modules');

    await page.screenshot({ path: grabs + language + '/images/modules/module-options-general-tab.png'});

    // Find the Administrator Modules parameters tab.
    let btn3 = await page.locator('button[aria-controls="admin_modules"]');
    await btn3.first().click();
    await page.screenshot({ path: grabs + language + '/images/modules/module-options-administrator-modules-tab.png'});
});

