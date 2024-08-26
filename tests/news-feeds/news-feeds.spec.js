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
    // Set timeout for this hook.
    //test.setTimeout(5000);
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
    console.log(`\nTry command:\nURL=${testurl} LANGUAGE=${language} COUNTRY=${country} npx playwright test news-feeds --project firefox --reporter dot -g "${test.info().title}"\n`);
});

// First create a news feed for Joomla! Announcements / https://www.joomla.org/announcements.feed?type=rss
test('news feeds', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 550,
    });
    await page.goto(testurl + 'option=com_newsfeeds&view=newsfeeds');
    await page.screenshot({ path: grabs + language + '/images/news-feeds/news-feeds-list.png', fullPage: true});
});

test('news feeds edit', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 550,
    });
    await page.goto(testurl + 'option=com_newsfeeds&view=newsfeeds');

    // Open the first item in the list
    const item_id = await page.locator('#cb0').inputValue();
    const url = testurl + 'option=com_newsfeeds&task=newsfeed.edit&id=' + item_id;
    await page.goto(url);
    await page.screenshot({ path: grabs + language + '/images/news-feeds/news-feeds-edit-tab.png', fullPage: true});

    // Find the Options tab.
    await page.locator('button[aria-controls="images"]').first().click();
    await page.screenshot({ path: grabs + language + '/images/news-feeds/news-feeds-options-tab.png', fullPage: true});

    // Close the article or it will be left checked out.
    await page.locator('.button-cancel').click();
});

test('news feeds categories', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 550,
    });
    await page.goto(testurl + 'option=com_categories&view=categories&extension=com_newsfeeds');
    await page.screenshot({ path: grabs + language + '/images/news-feeds/news-feeds-categories.png', fullPage: true});

    // Open the first item in the list
    const item_id = await page.locator('#cb0').inputValue();
    const url = testurl + 'option=com_categories&task=category.edit&id=' + item_id + '&extension=com_newsfeeds';
    await page.goto(url);
    await page.screenshot({ path: grabs + language + '/images/news-feeds/news-feeds-edit-category-category-tab.png', fullPage: true});

    // Find the Options tab.
    await page.locator('button[aria-controls="attrib-options"]').first().click();
    await page.screenshot({ path: grabs + language + '/images/news-feeds/news-feeds-edit-category-options-tab.png', fullPage: true});

    // Close the article or it will be left checked out.
    await page.locator('.button-cancel').click();
});

test('news feeds options', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 550,
    });
    await page.goto(testurl + 'option=com_config&view=component&component=com_newsfeeds');
    await page.screenshot({ path: grabs + language + '/images/news-feeds/news-feeds-options-news-feed-tab.png', fullPage: true});

    // Find the Category tab.
    await page.locator('button[aria-controls="category"]').first().click();
    await page.screenshot({ path: grabs + language + '/images/news-feeds/news-feeds-options-category-tab.png', fullPage: true});

    // Find the Category tab.
    await page.locator('button[aria-controls="categories"]').first().click();
    await page.screenshot({ path: grabs + language + '/images/news-feeds/news-feeds-options-categories-tab.png', fullPage: true});

    // Find the List Layouts tab.
    await page.locator('button[aria-controls="listlayout"]').first().click();
    await page.screenshot({ path: grabs + language + '/images/news-feeds/news-feeds-options-list-layouts-tab.png', fullPage: true});

    // Find the Integration tab.
    await page.locator('button[aria-controls="integration"]').first().click();
    await page.screenshot({ path: grabs + language + '/images/news-feeds/news-feeds-options-integration-tab.png', fullPage: true});
});
