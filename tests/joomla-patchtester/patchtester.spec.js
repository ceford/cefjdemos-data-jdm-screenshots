// @ts-check
import { test } from '../jtest';
import { expect } from '@playwright/test';

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
    console.log(`\nTry command:\nURL=${testurl} LANGUAGE=${language} COUNTRY=${country} npx playwright test patchtester --project firefox --reporter dot -g "${test.info().title}"\n`);
});

test('joomla patchtester options short', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 550,
    });
    await page.goto(testurl + 'option=com_config&view=component&component=com_patchtester');

    // If Patchtester is not installed there will be no GitHub Repository tab
    await expect(page.locator('button[aria-controls="repositories"]').first()).toBeVisible();

    // Grab the GitHub Repository tab
    await page.screenshot({ path: grabs + language + '/images/joomla-patchtester/patchtester-options-github-repository-tab.png'});

    // Grab the CI Server Settings tab
    await page.locator('button[aria-controls="ci_settings"]').first().click();
    await page.screenshot({ path: grabs + language + '/images/joomla-patchtester/patchtester-options-ci-server-settings-tab.png'});

    // Close the item or it will be left checked out.
    await page.locator('.button-cancel').click();
});

test('joomla patchtester options long', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 850,
    });
    await page.goto(testurl + 'option=com_config&view=component&component=com_patchtester');

    // If Patchtester is not installed there will be no GitHub Repository tab
    await expect(page.locator('button[aria-controls="repositories"]').first()).toBeVisible();

    // Grab the GitHub Authentication tab
    await page.locator('button[aria-controls="authentication"]').first().click();
    await page.screenshot({ path: grabs + language + '/images/joomla-patchtester/patchtester-options-github-authentication-tab.png'});

    // Close the item or it will be left checked out.
    await page.locator('.button-cancel').click();
});
