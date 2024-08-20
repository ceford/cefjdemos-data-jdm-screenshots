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
    await page.goto(testurl);
    await page.locator('#mod-login-username').fill(username);
    await page.locator('#mod-login-password').fill(password);
    await page.locator('#lang').selectOption(country);
    const loginBtn = await page.locator('#btn-login-submit');
    await loginBtn.click();
});

test.afterEach(async ({ language, country }) => {
    if (test.info().status !== test.info().expectedStatus)
    console.log(`\nTry command:\nLANGUAGE=${language} COUNTRY=${country} npx playwright test update-sites --project firefox --reporter dot -g "${test.info().title}"\n`);
});

test('update sites list', async ({ page, testurl, grabs, language }) => {
    await page.goto(testurl + 'option=com_installer&view=updatesites');
    await page.screenshot({ path: grabs + language + '/images/update-sites/update-sites-list.png', fullPage: true});
});

test('edit update site', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 500,
    });
    await page.goto(testurl + 'option=com_installer&view=updatesites');

    // Open the first item in the list
    await page.locator('[href*="option=com_installer&task=updatesite.edit&update_site_id="]').first().click();

    // No tabs!
    await page.screenshot({ path: grabs + language + '/images/update-sites/update-sites-edit-update-site.png'});

    // Close the item or it will be left checked out.
    await page.locator('.button-cancel').click();
});
