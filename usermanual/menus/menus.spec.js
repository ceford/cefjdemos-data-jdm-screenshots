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

test('menus all items list', async ({ page, testurl, grabs, language }) => {
    // Go to the Menus: All Menu Items list page.
    await page.goto(testurl + 'administrator/index.php?option=com_menus&view=items')

    await page.screenshot({ path: grabs + language + '/images/menus/menus-all-menu-items-list.png', fullPage: true });

    // Select the New button
    await page.locator('.button-new').first().click();

    // Select the Menu Item Type Select button
    await page.locator('.btn-primary').first().click();

    // Wait for 3 seconds
    await page.waitForTimeout(3000);

    // Take a screenshot of the list of Menu Item groups
    await page.screenshot({ path: grabs + language + '/images/menus/menus-menu-item-type-select-groups.png', fullPage: true });

    // Select the Articles accordion button
    const fr = page.frameLocator('.iframe-content');

    // Find all of the accordion buttons.
    const buttons = fr.locator('.accordion-button');

    // Expand the first item - Articles
    await buttons.first().click();

    // Take a screenshot of the list of Article Menu Item types
    await page.screenshot({ path: grabs + language + '/images/menus/menus-menu-items-select-type.png', fullPage: true });

    // Close the Popup dialogue.
    await page.locator('.button-close').click();

    // Close the article or it will be left checked out.
    await page.locator('.button-cancel').click();
});

test('menus edit item', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 700,
    });
    // Go to the Menus: All Menu Items list page.
    await page.goto(testurl + 'administrator/index.php?option=com_menus&view=items')

    // Search for the Love item
    await page.locator('#filter_search').fill('Love');
    await page.locator('.filter-search-bar__button').click();

    // Select the edit link using its text content
    await page.locator('text="Love"').click();

    // Take a screenshot of the edit screen.
    await page.screenshot({ path: grabs + language + '/images/menus/menus-menu-items-edit-item.png'});

    // Close the article or it will be left checked out.
    await page.locator('.button-cancel').click();
});

test('menus positions', async ({ page, testurl, grabs, language }) => {
    // Go to the Modules (Site) list page.
    await page.goto(testurl + 'administrator/index.php?option=com_modules&view=modules&client_id=0');

    // Open the Filter Options. js-stools-btn-filter
    await page.locator('.js-stools-btn-filter').click();

    // Select the module filter Menu option
    await page.locator('#filter_module').selectOption('Menu');

    // Take a screenshot of the modules list page filtered for Menu.
    await page.screenshot({ path: grabs + language + '/images/menus/menus-menu-positions.png'});

    // Search for the Main Menu item
    await page.locator('#filter_search').fill('Main Menu Blog');
    await page.locator('.filter-search-bar__button').click();

    // Select the edit link using its text content
    await page.locator('text="Main Menu Blog"').last().click();

    // Wait for 3 seconds
    await page.waitForTimeout(3000);

    // Find the Position selector and click it
    await page.locator('#jform_position-lbl').click();

    // Take a screenshot of the edit screen.
    await page.screenshot({ path: grabs + language + '/images/menus/menus-menu-edit-position.png'});

    // Close the article or it will be left checked out.
    await page.locator('.button-cancel').click();

});
