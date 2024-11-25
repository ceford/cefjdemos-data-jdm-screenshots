// @ts-check
import { test } from '../jtest';

test.use({
    viewport: { width: 1440, height: 850 },
    testIdAttribute: 'data-type'
});

test.beforeAll(async ({language}) => {
    //console.log('Language: ' + language);
});

test.beforeEach(async ({ page, testurl, country, language, username, password }) => {
    if (language === 'en') {
        language = 'user';
    }
    // Backend page
    await page.goto(testurl + 'administrator/index.php?');
    await page.locator('#mod-login-username').fill(username);
    await page.locator('#mod-login-password').fill(password);
    await page.locator('#lang').selectOption(country);
    await page.locator('#btn-login-submit').click();
});

test.afterEach(async ({ testurl, language, country }) => {
    if (test.info().status !== test.info().expectedStatus)
    console.log(`\nTry command:\nURL=${testurl} LANGUAGE=${language} COUNTRY=${country} npx playwright test users --project firefox --reporter dot -g "${test.info().title}"\n`);
});

// It seems this can't be done - the login form is always in English
test('logout link', async ({ page, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 380,
    });

    await page.locator('.header-profile').first().click();

    // Locate the anchor (<a>) containing a span with the class 'icon-power-off'
    const logoutLink = await page.locator('a:has(span.icon-power-off)');
    await logoutLink.first().evaluate(element => element.style.border = '5px solid red');

    await page.screenshot({ path: grabs + language + '/images/getting-started/logging-in-to-joomla-logout-link.png'});
});
