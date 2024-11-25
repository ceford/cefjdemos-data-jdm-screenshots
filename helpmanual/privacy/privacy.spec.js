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
    console.log(`\nTry command:\nURL=${testurl} LANGUAGE=${language} COUNTRY=${country} npx playwright test privacy --project firefox --reporter dot -g "${test.info().title}"\n`);
});

test('privacy dashboard', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 550,
    });
    await page.goto(testurl + 'option=com_cpanel&view=cpanel&dashboard=privacy');
    await page.screenshot({ path: grabs + language + '/images/privacy/privacy-dashboard.png', fullPage: true});
});

// Create a user and privacy information request before using this test, using
// Super User: Superman / superman.
// John Doe johndoe johndoe@example.com
test('privacy information requests', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 450,
    });
    await page.goto(testurl + 'option=com_privacy&view=requests');
    await page.screenshot({ path: grabs + language + '/images/privacy/privacy-information-requests.png'});

    // Open the first item in the list
    const url = testurl + 'option=com_privacy&view=request&id=1';
    await page.goto(url);
    await page.screenshot({ path: grabs + language + '/images/privacy/privacy-review-information-request.png', fullPage: true});
});

test('privacy new information request', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 550,
    });
    await page.goto(testurl + 'option=com_privacy&view=requests');

    // Select the New button
    await page.locator('.button-new').first().click();
    await page.screenshot({ path: grabs + language + '/images/privacy/privacy-new-information-request.png', fullPage: true});
});

// Enable the System - Privacy Consent plugin and make sure that user johndoe
// has consented to the Privacy policy.
test('privacy consents', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 550,
    });
    await page.goto(testurl + 'option=com_privacy&view=consents');
    await page.screenshot({ path: grabs + language + '/images/privacy/privacy-consents.png', fullPage: true});
});

test('privacy capabilities', async ({ page, testurl, grabs, language }) => {
    await page.goto(testurl + 'option=com_privacy&view=capabilities');

    // Get each of the details tabs.
    await page.locator('details').first().click();
    await page.screenshot({ path: grabs + language + '/images/privacy/privacy-capabilities.png', fullPage: true});
});

test('privacy options', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 550,
    });
    await page.goto(testurl + 'option=com_config&view=component&component=com_privacy');
    await page.screenshot({ path: grabs + language + '/images/privacy/privacy-options.png'});
});
