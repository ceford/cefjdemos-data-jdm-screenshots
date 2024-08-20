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
    console.log(`\nTry command:\nLANGUAGE=${language} COUNTRY=${country} npx playwright test weblinks --project firefox --reporter dot -g "${test.info().title}"\n`);
});

test('web links list', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 400,
    });
    await page.goto(testurl + 'option=com_weblinks&view=weblinks');
    await page.screenshot({ path: grabs + language + '/images/weblinks/weblinks-list.png'});
});

test('web link edit', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 600,
    });
    await page.goto(testurl + 'option=com_weblinks&view=weblinks');

    // Open the first item in the list
    const link_id = await page.locator('#cb0').inputValue();
    await page.goto(testurl + 'option=com_weblinks&task=weblink.edit&id=' + link_id);
    await page.screenshot({ path: grabs + language + '/images/weblinks/web-link-edit-web-link-tab.png', fullPage: true});

    // Grab the Images tab
    await page.locator('button[aria-controls="images"]').first().click();
    await page.screenshot({ path: grabs + language + '/images/weblinks/web-link-edit-web-link-images-tab.png', fullPage: true});

    // Grab the Publishing tab
    await page.locator('button[aria-controls="publishing"]').first().click();
    await page.screenshot({ path: grabs + language + '/images/weblinks/web-link-edit-web-link-publishing-tab.png', fullPage: true});

    // Grab the Options tab
    await page.locator('button[aria-controls="attrib-jbasic"]').first().click();
    await page.screenshot({ path: grabs + language + '/images/weblinks/web-link-edit-web-link-options-tab.png', fullPage: true});

    // Grab the Association tab
    await page.locator('button[aria-controls="associations"]').first().click();
    await page.screenshot({ path: grabs + language + '/images/weblinks/web-link-edit-web-link-associations-tab.png'});

    // Close the item or it will be left checked out.
    await page.locator('.button-cancel').click();
});

test('weblinks categories list', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
      width: 1600,
      height: 780,
    });
    await page.goto(testurl + 'option=com_categories&view=categories&extension=com_weblinks');
    await page.screenshot({ path: grabs + language + '/images/weblinks/web-links-categories-list.png', fullPage: true});

    // Open the first item in the list
    const item_id = await page.locator('#cb0').inputValue();
    const url = testurl + 'option=com_categories&task=category.edit&id=' + item_id + '&extension=com_weblinks';
    await page.goto(url);
    await page.screenshot({ path: grabs + language + '/images/weblinks/web-links-edit-category-category-tab.png', fullPage: true});

    // Close the item or it will be left checked out.
    await page.locator('.button-cancel').click();
});

test('users options', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 600,
    });
    await page.goto(testurl + 'option=com_config&view=component&component=com_weblinks');

    // Grab the User Options tab
    await page.screenshot({ path: grabs + language + '/images/weblinks/weblinks-options-web-link-tab.png', fullPage: true});
});
