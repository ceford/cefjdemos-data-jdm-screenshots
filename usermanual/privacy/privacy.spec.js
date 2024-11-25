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

test('privacy dashboard', async ({ page, testurl, grabs, language }) => {
    //await page.setViewportSize({
    //    width: 1440,
    //    height: 500,
    //});
    // Go to the Privacy Dashboard.
    await page.goto(testurl + 'administrator/index.php?option=com_cpanel&view=cpanel&dashboard=privacy');

    await page.screenshot({ path: grabs + language + '/images/privacy/privacy-dashboard.png'});

    // Select the plugin edit link using its link
    await page.locator('a[href*="task=plugin.edit"]').first().click();

    await page.screenshot({ path: grabs + language + '/images/privacy/plugin-system-privacy-consent.png'});

    // Close the plugin or it will be left checked out.
    await page.locator('.button-cancel').click();
});

test('privacy information requests', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 500,
    });
    // Go to the Privacy Requests page.
    await page.goto(testurl + 'administrator/index.php?option=com_privacy&view=requests');

    await page.screenshot({ path: grabs + language + '/images/privacy/privacy-information-requests.png'});
});

test('privacy extension capabilities', async ({ page, testurl, grabs, language }) => {
    // Go to the Privacy Capabilities page.
    await page.goto(testurl + 'administrator/index.php?option=com_privacy&view=capabilities');

    await page.screenshot({ path: grabs + language + '/images/privacy/privacy-extension-capabilities.png'});
});

test('privacy consents', async ({ page, testurl, grabs, language }) => {
    // Go to the Privacy Consents page.
    await page.goto(testurl + 'administrator/index.php?option=com_privacy&view=consents');

    await page.screenshot({ path: grabs + language + '/images/privacy/privacy-consents.png'});
});
