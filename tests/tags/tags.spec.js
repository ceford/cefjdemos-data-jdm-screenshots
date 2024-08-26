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
    console.log(`\nTry command:\nURL=${testurl} LANGUAGE=${language} COUNTRY=${country} npx playwright test tags --project firefox --reporter dot -g "${test.info().title}"\n`);
});

test('tags list', async ({ page, testurl, grabs, language }) => {
    await page.goto(testurl + 'option=com_tags&view=tags');
    await page.screenshot({ path: grabs + language + '/images/tags/tags-list.png', fullPage: true});
});

test('tags edit', async ({ page, testurl, grabs, language }) => {
    await page.goto(testurl + 'option=com_tags&view=tags');

    // Open the first item in the list
    const item_id = await page.locator('#cb0').inputValue();
    const url = testurl + 'option=com_tags&task=tag.edit&id=' + item_id;
    await page.goto(url);

    // The Details tab
    await page.screenshot({ path: grabs + language + '/images/tags/tags-edit-tag-details-tab.png', fullPage: true});

    // Find the Options tab.
    await page.locator('button[aria-controls="attrib-basic"]').first().click();
    await page.screenshot({ path: grabs + language + '/images/tags/tags-edit-options-tab.png', fullPage: true});

    // Find the Publishing tab.
    await page.locator('button[aria-controls="publishing"]').first().click();
    await page.screenshot({ path: grabs + language + '/images/tags/tags-edit-publishing-tab.png', fullPage: true});

    // Close the item or it will be left checked out.
    await page.locator('.button-cancel').click();
});

test('tags options tagged items', async ({ page, testurl, grabs, language }) => {
    await page.goto(testurl + 'option=com_config&view=component&component=com_tags');
    await page.screenshot({ path: grabs + language + '/images/tags/tags-options-tagged-items-tab.png', fullPage: true});
});

test('tags options item selection', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 820,
    });
    await page.goto(testurl + 'option=com_config&view=component&component=com_tags');

    // Find the Item Selection tab.
    await page.locator('button[aria-controls="tagselection"]').first().click();
    await page.screenshot({ path: grabs + language + '/images/tags/tags-options-item-selection-tab.png'});
});

test('tags options list all tags', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 830,
    });
    await page.goto(testurl + 'option=com_config&view=component&component=com_tags');

    // Find the List All Tags tab.
    await page.locator('button[aria-controls="alltags"]').first().click();
    await page.screenshot({ path: grabs + language + '/images/tags/tags-options-list-all-tags-tab.png'});
});

test('tags options shared layout', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 720,
    });
    await page.goto(testurl + 'option=com_config&view=component&component=com_tags');

    // Find the Shared Layout tab.
    await page.locator('button[aria-controls="shared"]').first().click();
    await page.screenshot({ path: grabs + language + '/images/tags/tags-options-shared-layout-tab.png'});
});

test('tags options data entry', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 480,
    });
    await page.goto(testurl + 'option=com_config&view=component&component=com_tags');

    // Find the Data Entry tab.
    await page.locator('button[aria-controls="data_entry"]').first().click();
    await page.screenshot({ path: grabs + language + '/images/tags/tags-options-data-entry-tab.png'});
});

test('tags options integration', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 480,
    });
    await page.goto(testurl + 'option=com_config&view=component&component=com_tags');

    // Find the Integration tab.
    await page.locator('button[aria-controls="integration"]').first().click();
    await page.screenshot({ path: grabs + language + '/images/tags/tags-options-integration-tab.png'});
});
