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
});

test.afterEach(async ({ language, country }) => {
    if (test.info().status !== test.info().expectedStatus)
    console.log(`\nTry command:\nLANGUAGE=${language} COUNTRY=${country} npx playwright test menu-items --project firefox --reporter dot -g "${test.info().title}"\n`);
  });

test('menu item alias', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 715,
      });
  await page.goto(testurl + 'option=com_menus&view=items&menutype=mainmenu');

  // Select the New button
  await page.locator('.button-new').first().click();

  // Select the Menu Item Type Select button
  await page.locator('.btn-primary').first().click();
  // Wait for 3 seconds
  await page.waitForTimeout(3000);

  const fr = page.frameLocator('.iframe-content');
  let btn = fr.locator('button[aria-controls="collapse6"]');
  await btn.first().click();
  // Wait for 3 seconds
  await page.waitForTimeout(3000);

  // Select the link that has data-type="alias"
  let btn2 = await fr.getByTestId('alias');
  await btn2.first().click();
  // Wait for 3 seconds
  await page.waitForTimeout(3000);

  await page.screenshot({ path: grabs + language + '/images/menu-items/menu-item-alias.png'});
});

test('menu item archived articles', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 715,
      });
  await page.goto(testurl + 'option=com_menus&view=items&menutype=mainmenu');

  // Select the New button
  await page.locator('.button-new').first().click();

  // Select the Menu Item Type Select button
  await page.locator('.btn-primary').first().click();
  // Wait for 3 seconds
  await page.waitForTimeout(3000);

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

  await page.screenshot({ path: grabs + language + '/images/menu-items/menu-item-archived-articles.png'});

    // Find the Link Type tab.
    let btn3 = await page.locator('button[aria-controls="attrib-basic"]');
    await btn3.first().click();

    await page.screenshot({ path: grabs + language + '/images/menu-items/menu-item-archived-articles-archive-tab.png', fullPage: true });

    // Find the Options tab to store in menu-items-common.
    let btn4 = await page.locator('button[aria-controls="attrib-articles"]');
    await btn4.first().click();

    await page.screenshot({ path: grabs + language + '/images/menu-items-common/menu-item-article-options.png', fullPage: true });

});

test('menu item category blog', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 715,
      });
  await page.goto(testurl + 'option=com_menus&view=items&menutype=mainmenu');

  // Select the New button
  await page.locator('.button-new').first().click();

  // Select the Menu Item Type Select button
  await page.locator('.btn-primary').first().click();
  // Wait for 3 seconds
  await page.waitForTimeout(3000);

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

  await page.screenshot({ path: grabs + language + '/images/menu-items/menu-item-category-blog.png'});

    // Find the Category tab.
    let btn3 = await page.locator('button[aria-controls="attrib-basic"]');
    await btn3.first().click();

    await page.screenshot({ path: grabs + language + '/images/menu-items/menu-item-category-blog-category-tab.png', fullPage: true });

    // Find the Blog Layout.
    let btn4 = await page.locator('button[aria-controls="attrib-advanced"]');
    await btn4.first().click();

    await page.screenshot({ path: grabs + language + '/images/menu-items/menu-item-category-blog-blog-tab.png', fullPage: true });

    // Find the Integration tab to store in menu-items-common.
    let btn5 = await page.locator('button[aria-controls="attrib-integration"]');
    await btn5.first().click();

    await page.screenshot({ path: grabs + language + '/images/menu-items-common/menu-item-category-blog-integration.png', fullPage: true });
});

test('menu item category list', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 715,
      });
  await page.goto(testurl + 'option=com_menus&view=items&menutype=mainmenu');

  // Select the New button
  await page.locator('.button-new').first().click();

  // Select the Menu Item Type Select button
  await page.locator('.btn-primary').first().click();
  // Wait for 3 seconds
  await page.waitForTimeout(3000);

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

  await page.screenshot({ path: grabs + language + '/images/menu-items/menu-item-category-list.png'});

    // Find the Category tab.
    let btn3 = await page.locator('button[aria-controls="attrib-basic"]');
    await btn3.first().click();

    await page.screenshot({ path: grabs + language + '/images/menu-items/menu-item-category-list-category-tab.png', fullPage: true });

    // Find the List Layout.
    let btn4 = await page.locator('button[aria-controls="attrib-advanced"]');
    await btn4.first().click();

    await page.screenshot({ path: grabs + language + '/images/menu-items/menu-item-category-list-list-tab.png', fullPage: true });
});