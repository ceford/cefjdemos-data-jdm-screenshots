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

test('atum module positions', async ({ page, testurl, grabs, language }) => {
    //await page.setViewportSize({
    //    width: 1440,
    //    height: 500,
    //});
    // Go Home Dashboard. The template options needs Preview Module Positions enabled.
    await page.goto(testurl + 'administrator/index.php?tp=1');

    await page.screenshot({ path: grabs + language + '/images/modules/atum-template-positions.png'});
});

test('atum module positions site template', async ({ page, testurl, grabs, language }) => {
    //await page.setViewportSize({
    //    width: 1440,
    //    height: 500,
    //});
    // Go Home Dashboard. The template options needs Preview Module Positions enabled.
    await page.goto(testurl + 'administrator/index.php?option=com_templates&view=templates&client_id=0&tp=1');

    await page.screenshot({ path: grabs + language + '/images/modules/template-positions-templates-page.png'});

    await page.goto(testurl + 'index.php?tp=1');

    await page.screenshot({ path: grabs + language + '/images/modules/template-positions-site-page.png'});
});

test('atum admin modules list', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 720,
    });
    // Go to Modules (Administrator) list page.
    await page.goto(testurl + 'administrator/index.php?option=com_modules&view=modules&client_id=1');

    await page.screenshot({ path: grabs + language + '/images/modules/atum-admin-modules-list.png'});
});

test('cassiopeia modules list', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 720,
    });
    // Go to Modules (Administrator) list page.
    await page.goto(testurl + 'administrator/index.php?option=com_modules&view=modules&client_id=0');

    await page.screenshot({ path: grabs + language + '/images/modules/cassiopeia-modules-list.png'});

    // Select the New button
    await page.locator('.button-new').first().click();

    await page.screenshot({ path: grabs + language + '/images/modules/cassiopeia-modules-available.png'});

    await page.goto(testurl + 'administrator/index.php?option=com_modules&view=modules&client_id=0');

    // Search for the Random Image page
    await page.locator('#filter_search').fill('Random Image');
    await page.locator('.filter-search-bar__button').click();

    // Select the edit link using its text content
    await page.locator('a:has-text("Random Image")').click();

    await page.screenshot({ path: grabs + language + '/images/modules/cassiopeia-module-random-image.png'});

    // Close the article or it will be left checked out.
    await page.locator('.button-cancel').click();

    await page.goto(testurl + 'index.php');

    await page.screenshot({ path: grabs + language + '/images/modules/cassiopeia-module-random-image-site.png'});
});

// The system message has been created but is unpublished
test('atum admin module system message', async ({ page, testurl, grabs, language }) => {
    // Go to Modules (Administrator) list page.
    await page.goto(testurl + 'administrator/index.php?option=com_modules&view=modules&client_id=1');

    // Search for the System Message page
    await page.locator('#filter_search').fill('System Message');
    await page.locator('.filter-search-bar__button').click();

    // Select the edit link using its text content
    await page.locator('text="System Message"').click();

    // Select the Status tab and set it to published.
    await page.locator('#jform_published').selectOption('1');

    // Select the Save button and click it.
    await page.locator('.button-apply').click();

    // Wait for 3 seconds for the TinyMCE form to appear.
    await page.waitForTimeout(3000);

    await page.screenshot({ path: grabs + language + '/images/modules/atum-admin-module-system-message.png', fullPage: true});

    // Select the Status tab and set it to unpublished.
    await page.locator('#jform_published').selectOption('0');

    // Select the Save & Close button and click it.
    await page.locator('.button-save').click();
});

test('custom site module downtime', async ({ page, testurl, grabs, language }) => {
    // Go to Modules (Administrator) list page.
    await page.goto(testurl + 'administrator/index.php?option=com_modules&view=modules&client_id=0');

    // Search for the System Message page
    await page.locator('#filter_search').fill('Downtime');
    await page.locator('.filter-search-bar__button').click();

    // Select the edit link using its text content
    await page.locator('text="Downtime"').click();

    // Select the Menu Assignment tab
    await page.locator('button[aria-controls="assignment"]').first().click();

    // Select the None button to close all the menus
    //await page.locator('button#treeCollapseAll').click();

    await page.screenshot({ path: grabs + language + '/images/modules/module-display-by-menu.png'});

    // Select the Save & Close button and click it.
    await page.locator('.button-save').click();
});
