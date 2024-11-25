import { test } from '../jtest';

test.use({
    viewport: { width: 1440, height: 850 },
});

test.beforeAll(async ({language}) => {
    //console.log('Language: ' + language);
});

test.beforeEach(async ({ page, testurl, country, username, password }) => {
    // Set timeout for this hook.
    // test.setTimeout(60000);
    // Runs before each test and signs in each page.
    await page.goto(testurl);
    await page.locator('#mod-login-username').fill(username);
    await page.locator('#mod-login-password').fill(password);
    await page.locator('#lang').selectOption(country);
    const loginBtn = await page.locator('#btn-login-submit');
    await loginBtn.click();
});

test.afterEach(async ({ testurl, language, country }) => {
    if (test.info().status !== test.info().expectedStatus)
    console.log(`\nTry command:\nURL=${testurl} LANGUAGE=${language} COUNTRY=${country} npx playwright test multilingual-associations --project firefox --reporter dot -g "${test.info().title}"\n`);
  });

test('multilingual associations list', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 575,
    });
    await page.goto(testurl + 'option=com_associations&view=associations');

    await page.selectOption('#itemtype', {value: 'com_content.article'});
    await page.waitForTimeout(1000);

    await page.selectOption('#language', {value: 'en-GB'});
    await page.waitForTimeout(1000);

    // The Multilingual Associations Screenshot
    await page.screenshot({ path: grabs + language + '/images/multilingual-associations/multilingual-associations-list.png'});
});

test('multilingual associations edit', async ({ page, testurl, grabs, language }) => {
    await page.goto(testurl + 'option=com_associations&view=associations');

    await page.selectOption('#itemtype', {value: 'com_content.article'});
    await page.waitForTimeout(3000);

    await page.selectOption('#language', {value: 'en-GB'});
    await page.waitForTimeout(3000);

    // Find a badge for the first available language
    const badge = page.locator('.bg-secondary');
    await badge.first().click();
    await page.waitForTimeout(5000);

    // The Multilingual Associations Edit Screenshot
    await page.screenshot({ path: grabs + language + '/images/multilingual-associations/multilingual-associations-edit.png'});

    // Close the article or it will be left checked out.
    await page.locator('.button-cancel').click();
});
