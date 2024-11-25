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
    if (language === 'en') {
        language = 'user';
    }
    // This test requires https and the default language set
    await page.goto('https://localhost/jcms6' + language + '/administrator/');
    await page.locator('#mod-login-username').fill(username);
    await page.locator('#mod-login-password').fill(password);
    await page.locator('#lang').selectOption(country);
    const loginBtn = await page.locator('#btn-login-submit');
    //await loginBtn.click();
});

test.afterEach(async ({ testurl, language, country }) => {
    if (test.info().status !== test.info().expectedStatus)
    console.log(`\nTry command:\nURL=${testurl} LANGUAGE=${language} COUNTRY=${country} npx playwright test users --project firefox --reporter dot -g "${test.info().title}"\n`);
});

// It seems this can't be done - the login form is always in English
test('login form', async ({ page, grabs, language }) => {
    await page.screenshot({ path: grabs + language + '/images/getting-started/logging-in-to-joomla-administrator-login-form.png'});
});
