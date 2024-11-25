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

test('tags list', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 700,
    });
    // Go to the Tags page.
    await page.goto(testurl + 'administrator/index.php?option=com_tags&view=tags');

    await page.screenshot({ path: grabs + language + '/images/tags/tags-list.png'});
});

test('tags list filter', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 700,
    });
    // Go to the Tags page.
    await page.goto(testurl + 'administrator/index.php?option=com_tags&view=tags');

    // Open the Filter Options. js-stools-btn-filter
    await page.locator('.js-stools-btn-filter').click();

    // Open the Select Tag Type filter
    await page.locator('#filter_extension').click();

    await page.screenshot({ path: grabs + language + '/images/tags/tags-list-filter.png'});
});

test('new tag', async ({ page, testurl, grabs, language }) => {
    // Go to the Tags page.
    await page.goto(testurl + 'administrator/index.php?option=com_tags&view=tags');

    // Select the New button
    await page.locator('.button-new').first().click();

    // Find the Toggle Editor button and select it
    await page.locator('.js-tiny-toggler-button').click();

    // Insert a description
    await page.locator('#jform_description').fill('Animals that prey on other animals.');

    // Insert a title
    await page.locator('#jform_title').fill('Predator');

    // Find the Toggle Editor button and select it
    await page.locator('.js-tiny-toggler-button').click();

    // Scroll to the top of the page
    await page.evaluate(() => window.scrollTo(0, 0));

    // Wait for 3 seconds
    await page.waitForTimeout(3000);

    await page.screenshot({ path: grabs + language + '/images/tags/new-tag-predator.png', fullPage: true });
});

