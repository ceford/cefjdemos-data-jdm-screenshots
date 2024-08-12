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
    // Set timeout for this hook.
    //test.setTimeout(5000);
    // Runs before each test and signs in each page.
    await page.goto(testurl);
    await page.locator('#mod-login-username').fill(username);
    await page.locator('#mod-login-password').fill(password);
    await page.locator('#lang').selectOption(country);
    const loginBtn = await page.locator('#btn-login-submit');
    await loginBtn.click();

    // Open the main menu.
    await page.goto(testurl + 'option=com_menus&view=items&menutype=mainmenu');

    // Select the New button
    await page.locator('.button-new').first().click();

    // Select the Menu Item Type Select button
    await page.locator('.btn-primary').first().click();
    // Wait for 3 seconds
    await page.waitForTimeout(3000);
});

test.afterEach(async ({ language, country }) => {
    if (test.info().status !== test.info().expectedStatus)
    console.log(`\nTry command:\nLANGUAGE=${language} COUNTRY=${country} npx playwright test menu-items --project firefox --reporter dot -g "${test.info().title}"\n`);
});

test('menu item archived articles', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 715,
    });

    const fr = page.frameLocator('.iframe-content');
    let btn = fr.locator('button[aria-controls="collapse0"]');
    await btn.first().click();
    // Wait for 3 seconds
    await page.waitForTimeout(3000);

    // Select the link that has data-type="COM_CONTENT_ARCHIVE_VIEW_DEFAULT_TITLE"
    let btn2 = fr.getByTestId('COM_CONTENT_ARCHIVE_VIEW_DEFAULT_TITLE');
    await btn2.first().click();
    // Wait for 3 seconds
    await page.waitForTimeout(3000);

    await page.screenshot({ path: grabs + language + '/images/menu-items/articles-archived-articles-details-tab.png'});

    // Find the Link Type tab.
    let btn3 = await page.locator('button[aria-controls="attrib-basic"]');
    await btn3.first().click();

    await page.screenshot({ path: grabs + language + '/images/menu-items/articles-archived-articles-archive-tab.png', fullPage: true });

    // Find the Options tab to store in menu-items-common.
    let btn4 = await page.locator('button[aria-controls="attrib-articles"]');
    await btn4.first().click();

    await page.screenshot({ path: grabs + language + '/images/menu-items-common/articles-article-options.png', fullPage: true });

});

test('menu item category blog', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 715,
      });

    // Select the Articles accordion button
    const fr = page.frameLocator('.iframe-content');
    let btn = fr.locator('button[aria-controls="collapse0"]');
    await btn.first().click();
    // Wait for 3 seconds
    await page.waitForTimeout(3000);

    // Select the link that has data-type="COM_CONTENT_CATEGORY_VIEW_BLOG_TITLE"
    let btn2 = fr.getByTestId('COM_CONTENT_CATEGORY_VIEW_BLOG_TITLE');
    await btn2.first().click();
    // Wait for 3 seconds
    await page.waitForTimeout(3000);

    await page.screenshot({ path: grabs + language + '/images/menu-items/articles-category-blog-details-tab.png'});

    // Find the Category tab.
    let btn3 = await page.locator('button[aria-controls="attrib-basic"]');
    await btn3.first().click();

    await page.screenshot({ path: grabs + language + '/images/menu-items/articles-category-blog-category-tab.png', fullPage: true });

    // Find the Blog Layout.
    let btn4 = await page.locator('button[aria-controls="attrib-advanced"]');
    await btn4.first().click();

    await page.screenshot({ path: grabs + language + '/images/menu-items/articles-category-blog-blog-layout-tab.png', fullPage: true });

    // Find the Integration tab to store in menu-items-common.
    let btn5 = await page.locator('button[aria-controls="attrib-integration"]');
    await btn5.first().click();

    await page.screenshot({ path: grabs + language + '/images/menu-items-common/articles-category-blog-integration.png', fullPage: true });
});

test('menu item category list', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 715,
      });

    // Select the Articles accordion button
    const fr = page.frameLocator('.iframe-content');
    let btn = fr.locator('button[aria-controls="collapse0"]');
    await btn.first().click();
    // Wait for 3 seconds
    await page.waitForTimeout(3000);

    // Select the link that has data-type="COM_CONTENT_CATEGORY_VIEW_DEFAULT_TITLE"
    let btn2 = fr.getByTestId('COM_CONTENT_CATEGORY_VIEW_DEFAULT_TITLE');
    await btn2.first().click();
    // Wait for 3 seconds
    await page.waitForTimeout(3000);

    await page.screenshot({ path: grabs + language + '/images/menu-items/articles-category-list-details-tab.png'});

    // Find the Category tab.
    let btn3 = await page.locator('button[aria-controls="attrib-basic"]');
    await btn3.first().click();

    await page.screenshot({ path: grabs + language + '/images/menu-items/articles-category-list-category-tab.png', fullPage: true });

    // Find the List Layout.
    let btn4 = await page.locator('button[aria-controls="attrib-advanced"]');
    await btn4.first().click();

    await page.screenshot({ path: grabs + language + '/images/menu-items/articles-category-list-list-layouts-tab.png', fullPage: true });
});

test('menu item create article', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 715,
      });

    // Select the Articles accordion button
    const fr = page.frameLocator('.iframe-content');
    let btn = fr.locator('button[aria-controls="collapse0"]');
    await btn.first().click();
    // Wait for 3 seconds
    await page.waitForTimeout(3000);

    // Select the link that has data-type="COM_CONTENT_FORM_VIEW_DEFAULT_TITLE"
    let btn2 = fr.getByTestId('COM_CONTENT_FORM_VIEW_DEFAULT_TITLE');
    await btn2.first().click();
    // Wait for 3 seconds
    await page.waitForTimeout(3000);

    await page.screenshot({ path: grabs + language + '/images/menu-items/articles-create-article-details-tab.png'});

    // Find the Options tab.
    let btn3 = await page.locator('button[aria-controls="attrib-basic"]');
    await btn3.first().click();

    await page.screenshot({ path: grabs + language + '/images/menu-items/articles-create-article-options-tab.png', fullPage: true });
});

test('menu item featured', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 715,
      });

    // Select the Articles accordion button
    const fr = page.frameLocator('.iframe-content');
    let btn = fr.locator('button[aria-controls="collapse0"]');
    await btn.first().click();
    // Wait for 3 seconds
    await page.waitForTimeout(3000);

    // Select the link that has data-type="COM_CONTENT_FEATURED_VIEW_DEFAULT_TITLE"
    let btn2 = fr.getByTestId('COM_CONTENT_FEATURED_VIEW_DEFAULT_TITLE');
    await btn2.first().click();
    // Wait for 3 seconds
    await page.waitForTimeout(3000);

    await page.screenshot({ path: grabs + language + '/images/menu-items/articles-featured-details-tab.png'});

    // Find the Blog Layout.
    let btn4 = await page.locator('button[aria-controls="attrib-advanced"]');
    await btn4.first().click();

    await page.screenshot({ path: grabs + language + '/images/menu-items/articles-featured-blog-layout-tab.png', fullPage: true });
});

test('menu item list all categories', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 715,
      });

    // Select the Articles accordion button
    const fr = page.frameLocator('.iframe-content');
    let btn = fr.locator('button[aria-controls="collapse0"]');
    await btn.first().click();
    // Wait for 3 seconds
    await page.waitForTimeout(3000);

    // Select the link that has data-type="COM_CONTENT_CATEGORIES_VIEW_DEFAULT_TITLE"
    let btn2 = fr.getByTestId('COM_CONTENT_CATEGORIES_VIEW_DEFAULT_TITLE');
    await btn2.first().click();
    // Wait for 3 seconds
    await page.waitForTimeout(3000);

    await page.screenshot({ path: grabs + language + '/images/menu-items/articles-list-all-categories-details-tab.png'});

    // Find the Categories tab.
    let btn3 = await page.locator('button[aria-controls="attrib-basic"]');
    await btn3.first().click();

    await page.screenshot({ path: grabs + language + '/images/menu-items/articles-list-all-categories-categories-tab.png', fullPage: true });

    // Find the Category tab tab.
    let btn4 = await page.locator('button[aria-controls="attrib-category"]');
    await btn4.first().click();

    await page.screenshot({ path: grabs + language + '/images/menu-items/articles-list-all-categories-category-tab.png', fullPage: true });

    // Find the Blog Layout tab.
    let btn5 = await page.locator('button[aria-controls="attrib-blog"]');
    await btn5.first().click();

    await page.screenshot({ path: grabs + language + '/images/menu-items/articles-list-all-categories-blog-layout-tab.png', fullPage: true });

    // Find the List Layouts tab.
    let btn6 = await page.locator('button[aria-controls="attrib-advanced"]');
    await btn6.first().click();

    await page.screenshot({ path: grabs + language + '/images/menu-items/articles-list-all-categories-list-layouts-tab.png', fullPage: true });

    // Find the Shared tab.
    let btn7 = await page.locator('button[aria-controls="attrib-shared"]');
    await btn7.first().click();

    await page.screenshot({ path: grabs + language + '/images/menu-items/articles-list-all-categories-shared-tab.png', fullPage: true });
});

test('menu item single article', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 715,
      });

    // Select the Articles accordion button
    const fr = page.frameLocator('.iframe-content');
    let btn = fr.locator('button[aria-controls="collapse0"]');
    await btn.first().click();
    // Wait for 3 seconds
    await page.waitForTimeout(3000);

    // Select the link that has data-type="COM_CONTENT_ARTICLE_VIEW_DEFAULT_TITLE"
    let btn2 = fr.getByTestId('COM_CONTENT_ARTICLE_VIEW_DEFAULT_TITLE');
    await btn2.first().click();
    // Wait for 3 seconds
    await page.waitForTimeout(3000);

    await page.screenshot({ path: grabs + language + '/images/menu-items/articles-single-article-details-tab.png'});
});
