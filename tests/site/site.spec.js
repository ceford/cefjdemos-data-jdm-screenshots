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
    await page.goto(testurl);
    await page.locator('#mod-login-username').fill(username);
    await page.locator('#mod-login-password').fill(password);
    await page.locator('#lang').selectOption(country);
    const loginBtn = await page.locator('#btn-login-submit');
    await loginBtn.click();
});

test.afterEach(async ({ testurl, language, country }) => {
    if (test.info().status !== test.info().expectedStatus)
    console.log(`\nTry command:\nURL=${testurl} LANGUAGE=${language} COUNTRY=${country} npx playwright test site --project firefox --reporter dot -g "${test.info().title}"\n`);
});

test('home dashboard', async ({ page, testurl, grabs, language }) => {
    await page.goto(testurl + '');
    await page.screenshot({ path: grabs + language + '/images/site/home-dashboard.png'});
});

test('global configuration', async ({ page, testurl, grabs, language }) => {
    await page.goto(testurl + 'option=com_config');
    await page.screenshot({ path: grabs + language + '/images/site/global-configuration-site-tab.png'});

    // Find the System tab.
    await page.locator('button[aria-controls="page-system"]').first().click();
    await page.screenshot({ path: grabs + language + '/images/site/global-configuration-system-tab.png', fullPage: true});

    // Find the Server tab.
    await page.locator('button[aria-controls="page-server"]').first().click();
    await page.screenshot({ path: grabs + language + '/images/site/global-configuration-server-tab.png'});

    // Find the Logging tab.
    await page.locator('button[aria-controls="page-logging"]').first().click();
    await page.screenshot({ path: grabs + language + '/images/site/global-configuration-logging-tab.png'});

    // Find the Text Filters tab.
    await page.locator('button[aria-controls="page-filters"]').first().click();
    await page.screenshot({ path: grabs + language + '/images/site/global-configuration-text-filters-tab.png', fullPage: true});
});

test('system information', async ({ page, testurl, grabs, language }) => {
    await page.goto(testurl + 'option=com_admin&view=sysinfo');
    await page.screenshot({ path: grabs + language + '/images/site/system-information-tab.png'});

    // Find the PHP Settings tab.
    await page.locator('button[aria-controls="phpsettings"]').first().click();
    await page.screenshot({ path: grabs + language + '/images/site/php-settings-tab.png', fullPage: true});

    // Find the Configuration File tab.
    await page.locator('button[aria-controls="config"]').first().click();
    await page.screenshot({ path: grabs + language + '/images/site/configuration-file-tab.png'});

    // Find the Folder Permissions tab.
    await page.locator('button[aria-controls="directory"]').first().click();
    await page.screenshot({ path: grabs + language + '/images/site/folder-permissions-tab.png'});

    // Find the PHP Information tab.
    await page.locator('button[aria-controls="phpinfo"]').first().click();
    await page.screenshot({ path: grabs + language + '/images/site/php-information-tab.png'});
});
