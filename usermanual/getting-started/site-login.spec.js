// @ts-check
import { test } from '../jtest';

test.use({
    ignoreHTTPSErrors: true,
});

test.use({
    viewport: { width: 1440, height: 850 },
    testIdAttribute: 'data-type'
});

test.beforeAll(async ({language}) => {
    //console.log('Language: ' + language);
});

test.beforeEach(async ({ page, testurl, country, language, username, password }) => {

});

test.afterEach(async ({ testurl, language, country }) => {
    if (test.info().status !== test.info().expectedStatus)
    console.log(`\nTry command:\nURL=${testurl} LANGUAGE=${language} COUNTRY=${country} npx playwright test users --project firefox --reporter dot -g "${test.info().title}"\n`);
});

// This test requires https to show the login form Sign in with Passkey button
test('login form', async ({ page, grabs, language, username, password }) => {
    await page.goto('https://localhost/jcms6user/index.php/en/sample-layouts/articles');

    // Locate the anchor (<a>) containing a span with the class 'icon-power-off'
    const loginForm = await page.locator('div.sidebar-right:has(form.mod-login)');
    await loginForm.first().evaluate(element => element.style.border = '5px solid red');

    await page.screenshot({ path: grabs + language + '/images/getting-started/logging-in-to-joomla-site-login-form.png'});

    await page.locator('input[name="username"]').fill(username);
    await page.locator('input[name="password"]').fill(password);

    await page.locator('button[name="Submit"]').click();

    const logoutForm = await page.locator('div.sidebar-right:has(form.mod-login-logout)');
    await logoutForm.first().evaluate(element => element.style.border = '5px solid red');

    await page.screenshot({ path: grabs + language + '/images/getting-started/logging-in-to-joomla-site-logout-form.png'});
});
