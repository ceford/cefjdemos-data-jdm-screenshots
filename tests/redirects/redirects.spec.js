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
    console.log(`\nTry command:\nURL=${testurl} LANGUAGE=${language} COUNTRY=${country} npx playwright test redirects --project firefox --reporter dot -g "${test.info().title}"\n`);
});

// First enable the Redirect System Plugin and create a test redirect:
// Expired URL: about-me.html; New URL: about-others.html
test('redirects', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 550,
    });
    await page.goto(testurl + 'option=com_redirect&view=links');

    // Wait for 3 seconds for the system message to appear.
    await page.waitForTimeout(3000);
    await page.screenshot({ path: grabs + language + '/images/redirects/redirects-links.png'});

    // Select the New button
    await page.locator('.button-new').first().click();
    await page.screenshot({ path: grabs + language + '/images/redirects/redirects-new.png', fullPage: true});
    // Close the page or it will be left checked out.
    await page.locator('.button-cancel').click();

    // Open the first item in the list
    const item_id = await page.locator('#cb0').inputValue();
    const url = testurl + 'option=com_redirect&task=link.edit&id=' + item_id;
    await page.goto(url);
    await page.screenshot({ path: grabs + language + '/images/redirects/redirects-edit.png', fullPage: true});

    // Close the page or it will be left checked out.
    await page.locator('.button-cancel').click();
});

test('redirects options', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 550,
    });
    await page.goto(testurl + 'option=com_config&view=component&component=com_redirect');
    await page.screenshot({ path: grabs + language + '/images/redirects/redirect-options-advanced-tab.png'});
});
