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

test('configuration global configuration', async ({ page, testurl, grabs, language }) => {
    // Go to the Global Configuration page.
    await page.goto(testurl + 'administrator/index.php?option=com_config');

    // Toggle the inline help
    await page.locator('button.button-inlinehelp').click();

    await page.screenshot({ path: grabs + language + '/images/configuration/global-configuration-site-tab.png', fullPage: true});

    // Find the System tab.
    await page.locator('button[aria-controls="page-system"]').first().click();
    await page.screenshot({ path: grabs + language + '/images/configuration/global-configuration-system-tab.png', fullPage: true});

    // Find the Server tab.
    await page.locator('button[aria-controls="page-server"]').first().click();
    await page.screenshot({ path: grabs + language + '/images/configuration/global-configuration-server-tab.png', fullPage: true});

    // Find the Logging tab.
    await page.locator('button[aria-controls="page-logging"]').first().click();
    await page.screenshot({ path: grabs + language + '/images/configuration/global-configuration-logging-tab.png', fullPage: true});

    // Find the Permissions tab.
    await page.locator('button[aria-controls="page-permissions"]').first().click();
    await page.screenshot({ path: grabs + language + '/images/configuration/global-configuration-permissions-tab.png', fullPage: true});
});

test('configuration global configuration text filters', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1800,
        height: 1050,
    });

    // Go to the Global Configuration page.
    await page.goto(testurl + 'administrator/index.php?option=com_config');

    // Toggle the inline help
    await page.locator('button.button-inlinehelp').click();

    // Find the Filters tab.
    await page.locator('button[aria-controls="page-filters"]').first().click();
    await page.screenshot({ path: grabs + language + '/images/configuration/global-configuration-filters-tab.png', fullPage: true});
});

test('configuration site offline', async ({ page, testurl, grabs, language }) => {
    // Go to the Global Configuration page.
    await page.goto(testurl + 'administrator/index.php?option=com_config');

    // Toggle the Site offline button.
    await page.click('input#jform_offline1');

    // Wait for 3 seconds
    //await page.waitForTimeout(3000);

    // Save the form.
    await page.locator('.button-apply').click();

    // Go to the site Home page
    await page.goto(testurl + 'index.php');

    // Take a screenshot
    await page.screenshot({ path: grabs + language + '/images/configuration/site-offline.png', fullPage: true});

    // Go to the Global Configuration page.
    await page.goto(testurl + 'administrator/index.php?option=com_config');

    // Wait for 3 seconds
    //await page.waitForTimeout(3000);

    // Toggle the Site offline button.
    await page.click('input#jform_offline0', {timeout: 3000});

    // Save the form.
    await page.locator('.button-apply').click();
});

