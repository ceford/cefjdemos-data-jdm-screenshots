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

  // Create checked out article, category and module, grab screen and check-in
  test('articles global checkin', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 500,
    });

    // Go to the Articles list page.
    await page.goto(testurl + 'administrator/index.php?option=com_content&view=articles')

    // Search for the Toads page
    await page.locator('#filter_search').fill('Toads');
    await page.locator('.filter-search-bar__button').click();

    // Select the edit link using its text content
    await page.locator('text="Toads"').click();

    // Wait for 3 seconds
    await page.waitForTimeout(3000);

    // Leave the last page and go to the categories list page
    await page.goto(testurl + 'administrator/index.php?option=com_categories&view=categories&extension=com_content')

    // Get the cb0 value.
    const cb0 = await page.locator('#cb0')
    const id = await cb0.getAttribute('value');

    // Select the first title to open the edit form.
    await page.locator('[href*="id=' + id + '"]').last().click();

    // Wait for 3 seconds
    await page.waitForTimeout(3000);

    // Go to the Site Modules list page
    // Leave the last page and go to the categories list page
    await page.goto(testurl + 'administrator/index.php?option=com_modules&view=modules&client_id=0')

    // Get the cb0 value.
    const cb1 = await page.locator('#cb0')
    const id1 = await cb1.getAttribute('value');

    // Select the first title to open the edit form.
    await page.locator('[href*="id=' + id1 + '"]').click();

    // Wait for 3 seconds
    await page.waitForTimeout(3000);

    // Go to the Checkin page.
    await page.goto(testurl + 'administrator/index.php?option=com_checkin')

    await page.screenshot({ path: grabs + language + '/images/articles/global-checkin.png'});

    // Find the checkall checkbox and click it
    await page.locator('.form-check-input').first().click();

    // Click the Check-in button
    await page.locator('.button-checkin').first().click();
});

test('article schedule publishing', async ({ page, testurl, grabs, language }) => {
    // Go to the Articles list page.
    await page.goto(testurl + 'administrator/index.php?option=com_content&view=article&layout=edit')

    // Find the Publishing tab.
    await page.locator('button[aria-controls="publishing"]').first().click();

    await page.locator('input#jform_publish_up').fill('2024-10-15 00:00:00');
    await page.locator('input#jform_publish_down').fill('2025-10-15 00:00:00');

    await page.locator('input#jform_featured_up').fill('2024-10-15 00:00:00');
    await page.locator('input#jform_featured_down').fill('2024-12-31 23:59:59');

    await page.locator('button#jform_featured_up_btn').click();

    await page.screenshot({ path: grabs + language + '/images/articles-access/article-schedule-publishing.png', fullPage: true});

    // Close the article or it will be left checked out.
    // Calendar widget covers the Cancel button - new article so not needed anyway.
    //await page.locator('.button-cancel').click();
});

test('article user groups', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 650,
    });

    // Go to the User Goups list page.
    await page.goto(testurl + 'administrator/index.php?option=com_users&view=levels')

    await page.screenshot({ path: grabs + language + '/images/articles/article-access-user-groups.png'});
});
