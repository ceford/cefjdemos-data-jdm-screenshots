// @ts-check
import { test } from '../jtest';

test.use({
    viewport: { width: 1440, height: 850 },
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
    console.log(`\nTry command:\nURL=${testurl} LANGUAGE=${language} COUNTRY=${country} npx playwright test articles --project firefox --reporter dot -g "${test.info().title}"\n`);
  });

test('articles list', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 600,
    });
    await page.goto(testurl + 'option=com_content&view=articles');

    // Sort the list by ID Ascending.
    await page.locator('#list_fullordering').selectOption({value: 'a.ordering ASC'});

    // Wait for 3 seconds
    await page.waitForTimeout(3000);

  // Make the columns visible
  const buttons = await page.locator('.dropdown-toggle');
  const columnsButton = buttons.last();
  await columnsButton.click();

  // Uncheck some of them - Author and Hits
  const columns = await page.locator('.form-check-input');
  await columns.nth(9).setChecked(false);
  await columns.nth(5).setChecked(false);
  await columnsButton.click();

  await page.screenshot({ path: grabs + language + '/images/articles/articles-list.png', fullPage: true });
});

test('articles edit', async ({ page, testurl, grabs, language }) => {
    // Open the list page.
    await page.goto(testurl + 'option=com_content&view=articles');

    // Sort the list by ID Ascending.
    await page.locator('#list_fullordering').selectOption({value: 'a.ordering ASC'});

    // Wait for 3 seconds
    await page.waitForTimeout(3000);

    // Open the first item in the list
    const article_id = await page.locator('#cb0').inputValue();
    const url = testurl + 'option=com_content&task=article.edit&id=' + article_id;
    await page.goto(url);

    // Find the CMS Content button.
    await page.locator('.tox-tbtn').nth(0).click();
    await page.screenshot({ path: grabs + language + '/images/articles/articles-edit-content-tab.png', fullPage: true });

    // Find the Images and Links tab.
    await page.locator('button[aria-controls="images"]').first().click();
    await page.screenshot({ path: grabs + language + '/images/articles/articles-edit-images-tab.png', fullPage: true });

    // Find the Options tab.
    await page.locator('button[aria-controls="attrib-attribs"]').first().click();
    await page.screenshot({ path: grabs + language + '/images/articles/articles-edit-options-tab.png'});

    // Find the Configure Edit Screen tab.
    await page.locator('button[aria-controls="editor"]').first().click();
    await page.screenshot({ path: grabs + language + '/images/articles/articles-edit-editor-tab.png', fullPage: true });

    // Close the article or it will be left checked out.
    await page.locator('.button-cancel').click();
});

test('articles edit fields tab', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 750,
    });
    // Open the list page.
    await page.goto(testurl + 'option=com_content&view=articles');

    const article_id = await page.locator('#cb0').inputValue();
    const url = testurl + 'option=com_content&task=article.edit&id=' + article_id;
    await page.goto(url);

    // Find the Fields tab.
    await page.locator('button[aria-controls="attrib-fields-0"]').nth(0).click();

    await page.screenshot({ path: grabs + language + '/images/articles/articles-edit-fields-tab.png', fullPage: true });

    // Close the article or it will be left checked out.
    await page.locator('.button-cancel').click();
});

test('articles categories list', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
      width: 1440,
      height: 780,
    });
    await page.goto(testurl + 'option=com_categories&view=categories&extension=com_content');
    // Need more width for dutch
    if (language === 'nl') {
        await page.locator('#menu-collapse').click();
    }
    // Make the columns visible
    const buttons = await page.locator('.dropdown-toggle');
    const columnsButton = buttons.last();
    await columnsButton.click();

    // Uncheck some of them - Author and Hits
    const columns = await page.locator('.form-check-input');
    // Hide Access and Association
    await columns.nth(8).setChecked(false);
    await columns.nth(7).setChecked(false);
    await columnsButton.click();

    await page.screenshot({ path: grabs + language + '/images/articles/articles-categories-list.png'});
});

test('articles edit category category tab', async ({ page, testurl, grabs, language, country }) => {
    // Open the list page.
    await page.goto(testurl + 'option=com_categories&view=categories&extension=com_content');

    // Search for the selected language.
    await page.locator('#filter_search').fill(country);
    await page.locator('.filter-search-bar__button').click();

    let link = page.getByRole('link',{name: country});
    await link.first().click();

    await page.screenshot({ path: grabs + language + '/images/articles/articles-edit-category-category-tab.png', fullPage: true });

    // Find the Publishing tab. Not used
    //let btn = await page.locator('button[aria-controls="publishing"]');
    //await btn.nth(0).click();
    //await page.screenshot({ path: grabs + language + '/images/articles/articles-edit-category-publishing-tab.png', fullPage: true });

    // Close the article or it will be left checked out.
    await page.locator('.button-cancel').click();
});

/*
test('articles edit category workflow tab', async ({ page, testurl, grabs, language, country }) => {
    // Open the list page.
    await page.goto(testurl + 'option=com_categories&view=categories&extension=com_content');

    // Search for the selected language.
    await page.locator('#filter_search').fill(country);
    await page.locator('.filter-search-bar__button').click();

    let link = page.getByRole('link',{name: country});
    await link.first().click();

    // Find the Workflow tab. Requires workflow to be enable - not worth it!
    let btn = await page.locator('button[aria-controls="attrib-workflow"]');
    await btn.nth(0).click();

    await page.screenshot({ path: grabs + language + '/images/articles/articles-edit-category-workflow-tab.png', fullPage: true });

    // Close the article or it will be left checked out.
    await page.locator('.button-cancel').click();
});
*/
test('articles featured list', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 1000,
      });
    await page.goto(testurl + 'option=com_content&view=featured');

    // Make the columns visible
    const buttons = await page.locator('.dropdown-toggle');
    const columnsButton = buttons.last();
    await columnsButton.click();

    // Uncheck some of them - Author and Hits
    const columns = await page.locator('.form-check-input');
    await columns.nth(9).setChecked(false);
    await columns.nth(5).setChecked(false);
    await columnsButton.click();

    await page.screenshot({ path: grabs + language + '/images/articles/articles-featured-list.png'});
  });

  test('articles options articles tab', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 800,
      });
    await page.goto(testurl + 'option=com_config&view=component&component=com_content');

    await page.screenshot({ path: grabs + language + '/images/articles/articles-options-articles-tab.png'});
  });

test('articles options editing layout tab', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 800,
      });
    await page.goto(testurl + 'option=com_config&view=component&component=com_content');

    // Find the tab.
    let btn = await page.locator('button[aria-controls="editinglayout"]');
    await btn.nth(0).click();

    await page.screenshot({ path: grabs + language + '/images/articles/articles-options-editing-layout-tab.png'});
  });

test('articles options category tab', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 800,
      });
    await page.goto(testurl + 'option=com_config&view=component&component=com_content');

    // Find the tab.
    let btn = await page.locator('button[aria-controls="category"]');
    await btn.nth(0).click();

    await page.screenshot({ path: grabs + language + '/images/articles/articles-options-category-tab.png'});
  });

  test('articles options categories tab', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 800,
      });
    await page.goto(testurl + 'option=com_config&view=component&component=com_content');

    // Find the tab.
    let btn = await page.locator('button[aria-controls="categories"]');
    await btn.nth(0).click();

    await page.screenshot({ path: grabs + language + '/images/articles/articles-options-categories-tab.png'});
});

test('articles options blog layouts tab', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 800,
      });
    await page.goto(testurl + 'option=com_config&view=component&component=com_content');

    // Find the tab.
    let btn = await page.locator('button[aria-controls="blog_default_parameters"]');
    await btn.nth(0).click();

    await page.screenshot({ path: grabs + language + '/images/articles/articles-options-blog-layouts-tab.png', fullPage: true});
});

test('articles options list layouts tab', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 950,
      });
    await page.goto(testurl + 'option=com_config&view=component&component=com_content');

    // Find the tab.
    let btn = await page.locator('button[aria-controls="list_default_parameters"]');
    await btn.nth(0).click();

    await page.screenshot({ path: grabs + language + '/images/articles/articles-options-list-layouts-tab.png'});
});

  test('articles options shared tab', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 850,
      });
    await page.goto(testurl + 'option=com_config&view=component&component=com_content');

    // Find the tab.
    let btn = await page.locator('button[aria-controls="shared"]');
    await btn.nth(0).click();

    await page.screenshot({ path: grabs + language + '/images/articles/articles-options-shared-tab.png'});
  });

  test('articles options integration tab', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 1050,
      });
    await page.goto(testurl + 'option=com_config&view=component&component=com_content');

    // Find the tab.
    let btn = await page.locator('button[aria-controls="integration"]');
    await btn.nth(0).click();

    await page.screenshot({ path: grabs + language + '/images/articles/articles-options-integration-tab.png'});
  });

  test('articles options permissions tab', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 950,
      });
    await page.goto(testurl + 'option=com_config&view=component&component=com_content');

    // Find the tab.
    let btn = await page.locator('button[aria-controls="permissions"]');
    await btn.nth(0).click();

    await page.screenshot({ path: grabs + language + '/images/articles/articles-options-permissions-tab.png'});
  });
