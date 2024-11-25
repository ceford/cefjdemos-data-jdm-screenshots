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

  // Check if the Profile selector exists
  const selector = '.header-profile';
  const isPresent = await page.locator(selector).count() > 0;

  if (isPresent) {
    // Logout sequence - open the use profile form
    await page.locator('.header-profile').first().click();

    // Locate the anchor (<a>) containing a span with the class 'icon-power-off'
    const logoutLink = await page.locator('a:has(span.icon-power-off)');

    // Click the logout link
    await logoutLink.first().click();
  }

    if (test.info().status !== test.info().expectedStatus)
    console.log(`\nTry command:\nURL=${testurl} LANGUAGE=${language} COUNTRY=${country} npx playwright test articles --project firefox --reporter dot -g "${test.info().title}"\n`);
  });

test('plugin file system local', async ({ page, testurl, grabs, language }) => {
    // Go to the Plugins page.
    await page.goto(testurl + 'administrator/index.php?option=com_plugins&view=plugins');

    // Search for the FileSystem Local plugin
    await page.locator('#filter_search').fill('FileSystem - Local');
    await page.locator('.filter-search-bar__button').click();

    // Select the edit link using its text content
    await page.locator('text="FileSystem - Local"').click();

    await page.screenshot({ path: grabs + language + '/images/plugins/plugin-group-file-system-local.png', fullPage: true});

    // Close the plugin or it will be left checked out.
    await page.locator('.button-cancel').click();
});
