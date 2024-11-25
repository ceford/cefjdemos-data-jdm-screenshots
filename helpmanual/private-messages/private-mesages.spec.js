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
    console.log(`\nTry command:\nURL=${testurl} LANGUAGE=${language} COUNTRY=${country} npx playwright test private-messages --project firefox --reporter dot -g "${test.info().title}"\n`);
});

// First create a private message from Superman to Playwright:
// Subject: Demonstration; Text: This is a demonstration Private Message.
test('private messages', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 550,
    });
    await page.goto(testurl + 'option=com_messages&view=messages');
    await page.screenshot({ path: grabs + language + '/images/private-messages/private-messages.png'});

    // Select the New button
    await page.locator('.button-new').first().click();
    await page.screenshot({ path: grabs + language + '/images/private-messages/private-messages-write.png', fullPage: true});
    // Close the page or it will be left checked out.
    await page.locator('.button-cancel').click();

    // Open the first item in the list
    const item_id = await page.locator('#cb0').inputValue();
    const url = testurl + 'option=com_messages&view=message&message_id=' + item_id;
    await page.goto(url);
    await page.screenshot({ path: grabs + language + '/images/private-messages/private-messages-view.png', fullPage: true});

    // Close the page or it will be left checked out.
    await page.locator('.button-cancel').click();
});

