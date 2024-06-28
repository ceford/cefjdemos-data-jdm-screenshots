// @ts-check
import { test } from '../jtest';

test.use({
    viewport: { width: 1440, height: 850 },
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
});

test.afterEach(async ({ page, language, country }) => {
  if (test.info().status !== test.info().expectedStatus) {
    console.log(`\nTry command:\nLANGUAGE=${language} COUNTRY=${country} npx playwright test banners --project firefox --reporter dot -g "${test.info().title}"\n`);
  }
});

test('article edit toolbar', async ({ page, testurl, grabs, language, country }) => {
    // Purpose is to show the Help button.
    await page.goto(testurl + 'option=com_content&view=articles');

    // Search for articles in the selected language.
    await page.locator('#filter_search').fill(country);
    await page.locator('.filter-search-bar__button').click();

    // Open the first item in the list
    const article_id = await page.locator('#cb0').inputValue();
    const url = testurl + 'option=com_content&task=article.edit&id=' + article_id;
    await page.goto(url);

    // Show the Save & Close drop down list.
    await page.locator('.dropdown-toggle-split').click();

    await page.screenshot({
        path: grabs + language + '/images/common-elements/article-edit-toolbar.png',
        clip: { x: 0, y: 0, width: 1440, height: 300 }
    });
});

test('articles edit publishing tab', async ({ page, testurl, grabs, language }) => {
    // Open the list page.
    await page.goto(testurl + 'option=com_content&view=articles');

    const article_id = await page.locator('#cb0').inputValue();
    const url = testurl + 'option=com_content&task=article.edit&id=' + article_id;
    await page.goto(url);

    // Find the Publishing tab.
    let btn = await page.locator('button[aria-controls="publishing"]');
    await btn.nth(0).click();

    await page.screenshot({ path: grabs + language + '/images/common-elements/articles-edit-publishing-tab.png', fullPage: true });

    // Find the Publishing tab.
    btn = await page.locator('button[aria-controls="associations"]');
    await btn.nth(0).click();

    await page.screenshot({ path: grabs + language + '/images/common-elements/articles-edit-association-tab.png', fullPage: true });
    // Close the article or it will be left checked out.
    await page.locator('.button-cancel').click();
});

test('global configuration permissions tab', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 1360,
    });

    await page.goto(testurl + 'option=com_config');

    // Find the Permissions tab.
    let btn = await page.locator('button[aria-controls="page-permissions"]').first().click();

    await page.screenshot({
        path: grabs + language + '/images/common-elements/global-configuration-permissions-tab.png',
    });
});

test('media options permissions tab', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 870,
    });

    await page.goto(testurl + 'option=com_config&view=component&component=com_media');

    // Find the Permissions tab.
    await page.locator('button[aria-controls="permissions"]').first().click();

    // Select Oddjob permission-10
    await page.locator('button[aria-controls="permission-10"]').first().click();

    await page.screenshot({
        path: grabs + language + '/images/common-elements/media-options-permissions-tab.png',
    });
});

test('articles list batch', async ({ page, testurl, grabs, language, country }) => {
    await page.setViewportSize({
        width: 1440,
        height: 720,
      });
    await page.goto(testurl + 'option=com_content&view=articles');

    // Make the columns visible.
    const buttons = await page.locator('.dropdown-toggle');
    const columnsButton = buttons.last();
    await columnsButton.click();

    // Uncheck some of them.
    const columns = await page.locator('.form-check-input');
    await columns.nth(9).setChecked(false);
    await columns.nth(5).setChecked(false);
    await columnsButton.click();

    // Enable the batch button.
    await page.locator('#cb0').check();
    await page.locator('.button-status-group').click();

    // Select by class button-batch.
    await page.locator('.button-batch').click();
    await page.locator('#batch-category-id').selectOption({index: 1});

    // Without the style change the dialog background colour is not opaque.
    await page.locator('.joomla-dialog-container').evaluate(element => element.style.border = '1px solid black');

    await page.screenshot({ path: grabs + language + '/images/common-elements/articles-list-batch.png'});
});

test('articles list filter options', async ({ page, testurl, grabs, language, country }) => {
    await page.setViewportSize({
        width: 1440,
        height: 720,
      });
    await page.goto(testurl + 'option=com_content&view=articles');

    // Make the columns visible.
    const buttons = await page.locator('.dropdown-toggle');
    const columnsButton = buttons.last();
    await columnsButton.click();

    // Uncheck some of them.
    const columns = await page.locator('.form-check-input');
    await columns.nth(9).setChecked(false);
    await columns.nth(5).setChecked(false);
    await columnsButton.click();

    // Show the Filter Options.
    await page.locator('.filter-search-actions__button').first().click();

    await page.screenshot({ path: grabs + language + '/images/common-elements/articles-list-filter-options.png',
    clip: { x: 0, y: 0, width: 1440, height: 345 }
    });
});

test('plugins list toolbar', async ({ page, testurl, grabs, language, country }) => {
    await page.setViewportSize({
        width: 1440,
        height: 720,
      });
    await page.goto(testurl + 'option=com_plugins');

    await page.screenshot({ path: grabs + language + '/images/common-elements/plugins-list-toolbar.png',
    clip: { x: 0, y: 0, width: 1440, height: 150 }
    });
});

test('articles list pagination bar', async ({ page, testurl, grabs, language, country }) => {
    await page.goto(testurl + 'option=com_content&view=articles');

    await page.locator('.pagination-toolbar').screenshot({ path: grabs + language + '/images/common-elements/articles-list-pagination-bar.png',
    });
});

test('plugins list pagination bar', async ({ page, testurl, grabs, language, country }) => {
    await page.goto(testurl + 'option=com_plugins');

    await page.locator('.page-link:has-text("10")').click();

    await page.locator('.pagination-toolbar').screenshot({ path: grabs + language + '/images/common-elements/plugins-list-pagination-bar.png',
    });
});

test('list column header examples', async ({ page, testurl, grabs, language, country }) => {
    await page.goto(testurl + 'option=com_content&view=articles');

    await page.locator('thead').screenshot({ path: grabs + language + '/images/common-elements/articles-list-column-header.png'});

    await page.goto(testurl + 'option=com_categories&view=categories&extension=com_content');

    await page.locator('thead').screenshot({ path: grabs + language + '/images/common-elements/categories-list-column-header.png'});

    await page.goto(testurl + 'option=com_users&view=users');

    await page.locator('thead').screenshot({ path: grabs + language + '/images/common-elements/users-list-column-header.png'});
});

test('articles edit category options tab', async ({ page, testurl, grabs, language, country }) => {
    // Open the list page.
    await page.goto(testurl + 'option=com_categories&view=categories&extension=com_content');

    // Search for the selected language.
    await page.locator('#filter_search').fill(country);
    await page.locator('.filter-search-bar__button').click();

    let link = page.getByRole('link',{name: country});
    await link.first().click();

    // Find the Options tab.
    let btn = await page.locator('button[aria-controls="attrib-options"]');
    await btn.nth(0).click();

    await page.screenshot({ path: grabs + language + '/images/common-elements/articles-edit-category-options-tab.png', fullPage: true });

    // Close the article or it will be left checked out.
    await page.locator('.button-cancel').click();
});

/*
test('element test', async ({ page, testurl, grabs, language }) => {
    await page.goto(testurl + 'option=com_content&view=articles');

    await page.locator('#j-main-container').screenshot({
        path: grabs + language + '/images/help-screens/element-screenshot.png',
    });
});
*/
