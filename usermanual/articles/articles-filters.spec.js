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
    await page.goto(testurl + 'administrator/index.php?');
    await page.locator('#mod-login-username').fill(username);
    await page.locator('#mod-login-password').fill(password);
    await page.locator('#lang').selectOption(country);
    const loginBtn = await page.locator('#btn-login-submit');
    await loginBtn.click();
});

test.afterEach(async ({ page, testurl, language, country }) => {
    // Logout sequence
    await page.locator('.header-profile').first().click();

    // Locate the anchor (<a>) containing a span with the class 'icon-power-off'
    const logoutLink = await page.locator('a:has(span.icon-power-off)');

    // Click the logout link
    await logoutLink.first().click();

    if (test.info().status !== test.info().expectedStatus)
    console.log(`\nTry command:\nURL=${testurl} LANGUAGE=${language} COUNTRY=${country} npx playwright test articles --project firefox --reporter dot -g "${test.info().title}"\n`);
});

test('articles filter options', async ({ page, testurl, grabs, language }) => {
    // Go to the Articles: Categories list page.
    await page.goto(testurl + 'administrator/index.php?option=com_content&view=articles')

  // Make the columns visible
  const buttons = await page.locator('.dropdown-toggle');
  const columnsButton = buttons.last();
  await columnsButton.click();

  // Uncheck some of them - Author, Association and Hits
  const columns = await page.locator('.form-check-input');
  await columns.nth(9).setChecked(false);
  await columns.nth(6).setChecked(false);
  await columns.nth(5).setChecked(false);
  await columnsButton.click();

    // Open the Filter Options. js-stools-btn-filter
    await page.locator('.js-stools-btn-filter').click();

    await page.screenshot({ path: grabs + language + '/images/articles/articles-filter-options.png', fullPage: true });
});

test('articles featured', async ({ page, testurl, grabs, language }) => {
    // Go to the Featured Articles list page.
    await page.goto(testurl + 'administrator/index.php?option=com_content&view=featured')

  // Make the columns visible
  const buttons = await page.locator('.dropdown-toggle');
  const columnsButton = buttons.last();
  await columnsButton.click();

  // Uncheck some of them - Author, Association and Hits
  const columns = await page.locator('.form-check-input');
  await columns.nth(9).setChecked(false);
  await columns.nth(6).setChecked(false);
  await columns.nth(5).setChecked(false);
  await columnsButton.click();

    // Open the Filter Options. js-stools-btn-filter
    await page.locator('.js-stools-btn-filter').click();

    // Select the language filter All option
    await page.locator('#filter_language').selectOption('All');

    // Wait for 3 seconds for the Notifications to complete
    await page.waitForTimeout(3000);

    // Close the Filter Options. js-stools-btn-filter
    await page.locator('.js-stools-btn-filter').click();

    await page.screenshot({ path: grabs + language + '/images/articles/articles-featured.png', fullPage: true });
});
