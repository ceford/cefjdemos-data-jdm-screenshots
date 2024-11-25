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

test('menu item single article', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 715,
      });

    // Open the main menu.
    await page.goto(testurl + 'administrator/index.php?option=com_menus&view=items&menutype=mainmenu');

    // Select a link with specific text and click it
    await page.locator('text="Mammals"').last().click();

    // Grab the Details tab.
    await page.screenshot({ path: grabs + language + '/images/getting-started/menu-item-edit-form.png'});

    // Close the article or it will be left checked out.
    await page.locator('.button-cancel').click();
});

test('single menu item site screenshot', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 950,
    });

    // Go to the Home page
    await page.goto(testurl + 'index.php/' + language);

    // Select a link with specific text and click it
    await page.locator('text="Mammals"').last().click();

    await page.screenshot({ path: grabs + language + '/images/getting-started/menu-item-single-article-site-view.png'});
});

test('category list menu item site screenshot', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 750,
    });

    // Go to the Home page
    await page.goto(testurl + 'index.php/' + language);

    // Select a link with specific text and click it
    await page.locator('text="Articles about Mammals"').last().click();

    await page.screenshot({ path: grabs + language + '/images/getting-started/menu-item-category-list-site-view.png'});
});
