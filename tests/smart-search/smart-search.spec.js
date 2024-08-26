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
    console.log(`\nTry command:\nURL=${testurl} LANGUAGE=${language} COUNTRY=${country} npx playwright test smart-search --project firefox --reporter dot -g "${test.info().title}"\n`);
});

test('smart search indexed content', async ({ page, testurl, grabs, language }) => {
    await page.goto(testurl + 'option=com_finder&view=index');
    await page.screenshot({ path: grabs + language + '/images/smart-search/smart-search-indexed-content.png', fullPage: true});
});

test('smart search content maps', async ({ page, testurl, grabs, language }) => {
    await page.goto(testurl + 'option=com_finder&view=maps');
    await page.screenshot({ path: grabs + language + '/images/smart-search/smart-search-content-maps.png', fullPage: true});
});

// Create a filter as a test Super User (superman) before running this test.
// Articles / Author: Joomla
test('smart search search filters', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 400,
    });
    await page.goto(testurl + 'option=com_finder&view=filters');
    await page.screenshot({ path: grabs + language + '/images/smart-search/smart-search-search-filters.png'});
});

test('smart search edit filter', async ({ page, testurl, grabs, language }) => {
    await page.goto(testurl + 'option=com_finder&view=filters');

    // Open the first item in the list
    const item_id = await page.locator('#cb0').inputValue();
    const url = testurl + 'option=com_finder&task=filter.edit&filter_id=' + item_id;
    await page.goto(url);

    // Expand the first accordion (having trouble with this).
    await page.locator('button[aria-controls="accordion-2"]').first().click();
    await page.screenshot({ path: grabs + language + '/images/smart-search/smart-search-edit-filter.png', fullPage: true});

    // Find the Options tab.
    await page.locator('button[aria-controls="publishing"]').first().click();
    await page.screenshot({ path: grabs + language + '/images/smart-search/smart-search-edit-filter-options-tab.png', fullPage: true});

    // Close the item or it will be left checked out.
    await page.locator('.button-cancel').click();
});

test('smart search search term analysis', async ({ page, testurl, grabs, language }) => {
    await page.goto(testurl + 'option=com_finder&view=searches');
    await page.screenshot({ path: grabs + language + '/images/smart-search/smart-search-search-term-analysis.png', fullPage: true});
});

test('smart search options', async ({ page, testurl, grabs, language }) => {
    await page.goto(testurl + 'option=com_config&view=component&component=com_finder');
    await page.screenshot({ path: grabs + language + '/images/smart-search/smart-search-options-smart-search-tab.png', fullPage: true});

    // Find the Index tab.
    await page.locator('button[aria-controls="index"]').first().click();
    await page.screenshot({ path: grabs + language + '/images/smart-search/smart-search-options-index-tab.png', fullPage: true});
});
