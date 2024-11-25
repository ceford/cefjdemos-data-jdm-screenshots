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

test('add category via home dashboard', async ({ page, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 500,
    });

    // Wait for 3 seconds for the Notifications to complete
    await page.waitForTimeout(3000);

    // Select the Categories plus button and add a red border
    const link = page.locator('a[href*="task=category.add"]');
    await link.last().evaluate(element => element.style.border = '5px solid red');

    // Move the hover off the last Notification
    //await page.mouse.move(0, 0);
    //await page.waitForTimeout(3000);

    await page.screenshot({ path: grabs + language + '/images/articles/category-add-via-home-dashboard.png'});
});

test('articles categories list', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1600,
        height: 750,
    });
    // Go to the Articles: Categories list page.
    await page.goto(testurl + 'administrator/index.php?option=com_categories&view=categories&extension=com_content')

    // Open the Filter Options. js-stools-btn-filter
    await page.locator('.js-stools-btn-filter').click();

    // Select the - Select Tag - filter task=tags.searchAjax
    //<input type="text" class="choices__input choices__input--cloned" autocomplete="off" autocapitalize="none" spellcheck="false" role="textbox" aria-autocomplete="list" aria-label="- Select Tag -" placeholder="- Select Tag -" style="min-width: 15ch; width: 1ch;">
    const taglink = await page.locator('joomla-field-fancy-select[url*="task=tags.searchAjax"]');
    await taglink.click();

    await page.click('text="Nature"'); // or use a more specific selector

    // Wait for 3 seconds for the Notifications to complete
    await page.waitForTimeout(3000);

    // Close the Filter Options. js-stools-btn-filter
    await page.locator('.js-stools-btn-filter').click();

    await page.screenshot({ path: grabs + language + '/images/articles/categories-list.png'});
});

