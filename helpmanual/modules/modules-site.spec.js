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
    console.log(`\nTry command:\nURL=${testurl} LANGUAGE=${language} COUNTRY=${country} npx playwright test modules --project firefox --reporter dot -g "${test.info().title}"\n`);
  });

test('modules site list', async ({ page, testurl, grabs, language }) => {
    await page.goto(testurl + 'option=com_modules&view=modules&client_id=0');
    await page.screenshot({ path: grabs + language + '/images/modules-site/modules-site-list.png', fullPage: true});
});

test('modules available', async ({ page, testurl, grabs, language }) => {
    await page.goto(testurl + 'option=com_modules&view=select&client_id=0');
    await page.screenshot({ path: grabs + language + '/images/modules-site/modules-site-available.png', fullPage: true});
});

test('modules articles multi', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 600,
    });

    await page.goto(testurl + 'option=com_modules&task=module.add&client_id=0&eid=256');

    // Select the Inline Help button
    await page.locator('.button-inlinehelp').click();

    // Select the Dynamic option
    await page.locator('#jform_params_mode').selectOption('dynamic');

    // Select the Group Add button
    await page.locator('.group-add').first().click();

    // Scroll to the top of the page
    await page.evaluate(() => window.scrollTo(0, 0));

    // Wait for 3 seconds
    await page.waitForTimeout(3000);

    await page.screenshot({ path: grabs + language + '/images/modules-site/modules-articles-module-tab.png', fullPage: true});

    // Select the Display Options tab
    await page.locator('button[aria-controls="attrib-display"]').first().click();

    // Find and click Yes to change it to No
    await page.locator('#jform_params_title_only0').click();
    await page.screenshot({ path: grabs + language + '/images/modules-site/modules-articles-display-options-tab.png', fullPage: true});

    // Select the Filtering Options tab
    await page.locator('button[aria-controls="attrib-filtering"]').first().click();
    await page.screenshot({ path: grabs + language + '/images/modules-site/modules-articles-filtering-options-tab.png', fullPage: true});

    // Select the Ordering Options tab
    await page.locator('button[aria-controls="attrib-ordering"]').first().click();
    await page.screenshot({ path: grabs + language + '/images/modules-site/modules-articles-ordering-options-tab.png'});

    // Select the Grouping Options tab
    await page.locator('button[aria-controls="attrib-grouping"]').first().click();
    // Find and select Year from the Article Grouping field
    await page.locator('#jform_params_article_grouping').selectOption('year');
    await page.screenshot({ path: grabs + language + '/images/modules-site/modules-articles-grouping-options-tab.png', fullPage: true});
});

test('modules articles archived', async ({ page, testurl, grabs, language }) => {
    await page.goto(testurl + 'option=com_modules&task=module.add&client_id=0&eid=39');
    await page.screenshot({ path: grabs + language + '/images/modules-site/modules-articles-archived-module-tab.png', fullPage: true});
});

test('modules articles categories', async ({ page, testurl, grabs, language }) => {
    await page.goto(testurl + 'option=com_modules&task=module.add&client_id=0&eid=58');
    await page.screenshot({ path: grabs + language + '/images/modules-site/modules-articles-categories-module-tab.png', fullPage: true});
});

test('modules articles category', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 550,
    });
    await page.goto(testurl + 'option=com_modules&task=module.add&client_id=0&eid=57');
    await page.screenshot({ path: grabs + language + '/images/modules-site/modules-articles-category-module-tab.png', fullPage: true});

    // Find the Filtering Options tab.
    await page.locator('button[aria-controls="attrib-filtering"]').first().click();
    await page.screenshot({ path: grabs + language + '/images/modules-site/modules-articles-category-filtering-options-tab.png', fullPage: true });

    // Find the Ordering Options tab.
    await page.locator('button[aria-controls="attrib-ordering"]').first().click();
    await page.screenshot({ path: grabs + language + '/images/modules-site/modules-articles-category-ordering-options-tab.png', fullPage: true });

    // Find the Grouping Options tab.
    await page.locator('button[aria-controls="attrib-grouping"]').first().click();
    await page.screenshot({ path: grabs + language + '/images/modules-site/modules-articles-category-grouping-options-tab.png', fullPage: true });

    // Find the Display Options tab.
    await page.locator('button[aria-controls="attrib-display"]').first().click();
    await page.screenshot({ path: grabs + language + '/images/modules-site/modules-articles-category-display-options-tab.png', fullPage: true });

});

test('modules articles latest', async ({ page, testurl, grabs, language }) => {
    await page.goto(testurl + 'option=com_modules&task=module.add&client_id=0&eid=40');
    await page.screenshot({ path: grabs + language + '/images/modules-site/modules-articles-latest-module-tab.png', fullPage: true});
});

test('modules articles most read', async ({ page, testurl, grabs, language }) => {
    await page.goto(testurl + 'option=com_modules&task=module.add&client_id=0&eid=41');
    await page.screenshot({ path: grabs + language + '/images/modules-site/modules-articles-most-read-module-tab.png', fullPage: true});
});

test('modules articles newsflash', async ({ page, testurl, grabs, language }) => {
    await page.goto(testurl + 'option=com_modules&task=module.add&client_id=0&eid=49');
    await page.screenshot({ path: grabs + language + '/images/modules-site/modules-articles-newsflash-module-tab.png', fullPage: true});
});

test('modules articles related', async ({ page, testurl, grabs, language }) => {
    await page.goto(testurl + 'option=com_modules&task=module.add&client_id=0&eid=51');
    await page.screenshot({ path: grabs + language + '/images/modules-site/modules-articles-related-module-tab.png', fullPage: true});
});

test('modules banners', async ({ page, testurl, grabs, language }) => {
    await page.goto(testurl + 'option=com_modules&task=module.add&client_id=0&eid=42');
    await page.screenshot({ path: grabs + language + '/images/modules-site/modules-banners-module-tab.png', fullPage: true});
});

test('modules breadcrumbs', async ({ page, testurl, grabs, language }) => {
    await page.goto(testurl + 'option=com_modules&task=module.add&client_id=0&eid=43');
    await page.screenshot({ path: grabs + language + '/images/modules-site/modules-breadcrumbs-module-tab.png', fullPage: true});
});

test('modules custom', async ({ page, testurl, grabs, language }) => {
    await page.goto(testurl + 'option=com_modules&task=module.add&client_id=0&eid=44');
    await page.screenshot({ path: grabs + language + '/images/modules-site/modules-custom-module-tab.png', fullPage: true});

    // Find the Options tab.
    await page.locator('button[aria-controls="attrib-options"]').first().click();
    await page.screenshot({ path: grabs + language + '/images/modules-site/modules-custom-module-options-tab.png', fullPage: true });
});

test('modules feed display', async ({ page, testurl, grabs, language }) => {
    await page.goto(testurl + 'option=com_modules&task=module.add&client_id=0&eid=45');
    await page.screenshot({ path: grabs + language + '/images/modules-site/modules-feed-display-module-tab.png', fullPage: true});
});

test('modules footer', async ({ page, testurl, grabs, language }) => {
    await page.goto(testurl + 'option=com_modules&task=module.add&client_id=0&eid=46');
    await page.screenshot({ path: grabs + language + '/images/modules-site/modules-footer-module-tab.png', fullPage: true});
});

test('modules language switcher', async ({ page, testurl, grabs, language }) => {
    await page.goto(testurl + 'option=com_modules&task=module.add&client_id=0&eid=59');
    await page.screenshot({ path: grabs + language + '/images/modules-site/modules-language-switcher-module-tab.png', fullPage: true});
});

test('modules latest users', async ({ page, testurl, grabs, language }) => {
    await page.goto(testurl + 'option=com_modules&task=module.add&client_id=0&eid=54');
    await page.screenshot({ path: grabs + language + '/images/modules-site/modules-latest-users-module-tab.png', fullPage: true});
});

test('modules login', async ({ page, testurl, grabs, language }) => {
    await page.goto(testurl + 'option=com_modules&task=module.add&client_id=0&eid=47');
    await page.screenshot({ path: grabs + language + '/images/modules-site/modules-login-module-tab.png', fullPage: true});
});

test('modules menu', async ({ page, testurl, grabs, language }) => {
    await page.goto(testurl + 'option=com_modules&task=module.add&client_id=0&eid=48');
    await page.screenshot({ path: grabs + language + '/images/modules-site/modules-menu-module-tab.png', fullPage: true});
});

test('modules random image', async ({ page, testurl, grabs, language }) => {
    await page.goto(testurl + 'option=com_modules&task=module.add&client_id=0&eid=50');
    await page.screenshot({ path: grabs + language + '/images/modules-site/modules-random-image-module-tab.png', fullPage: true});
});

test('modules smart search', async ({ page, testurl, grabs, language }) => {
    await page.goto(testurl + 'option=com_modules&task=module.add&client_id=0&eid=60');
    await page.screenshot({ path: grabs + language + '/images/modules-site/modules-smart-search-module-tab.png', fullPage: true});
});

test('modules statistics', async ({ page, testurl, grabs, language }) => {
    await page.goto(testurl + 'option=com_modules&task=module.add&client_id=0&eid=52');
    await page.screenshot({ path: grabs + language + '/images/modules-site/modules-statistics-module-tab.png', fullPage: true});
});

test('modules syndication feeds', async ({ page, testurl, grabs, language }) => {
    await page.goto(testurl + 'option=com_modules&task=module.add&client_id=0&eid=53');
    await page.screenshot({ path: grabs + language + '/images/modules-site/modules-syndication-feeds-module-tab.png', fullPage: true});
});

test('modules tags popular', async ({ page, testurl, grabs, language }) => {
    await page.goto(testurl + 'option=com_modules&task=module.add&client_id=0&eid=79');
    await page.screenshot({ path: grabs + language + '/images/modules-site/modules-tags-popular-module-tab.png', fullPage: true});
});

test('modules tags similar', async ({ page, testurl, grabs, language }) => {
    await page.goto(testurl + 'option=com_modules&task=module.add&client_id=0&eid=80');
    await page.screenshot({ path: grabs + language + '/images/modules-site/modules-tags-similar-module-tab.png', fullPage: true});
});

test('modules who is online', async ({ page, testurl, grabs, language }) => {
    await page.goto(testurl + 'option=com_modules&task=module.add&client_id=0&eid=55');
    await page.screenshot({ path: grabs + language + '/images/modules-site/modules-whos-online-module-tab.png', fullPage: true});
});

test('modules weblinks', async ({ page, testurl, grabs, language }) => {
    await page.goto(testurl + 'option=com_modules&task=module.add&client_id=0&eid=246');
    await page.screenshot({ path: grabs + language + '/images/modules-site/modules-weblinks-module-tab.png', fullPage: true});
});

test('modules wrapper', async ({ page, testurl, grabs, language }) => {
    await page.goto(testurl + 'option=com_modules&task=module.add&client_id=0&eid=56');
    await page.screenshot({ path: grabs + language + '/images/modules-site/modules-wrapper-module-tab.png', fullPage: true});
});
