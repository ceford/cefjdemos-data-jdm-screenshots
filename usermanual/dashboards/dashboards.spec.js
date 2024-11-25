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

test('dashboards', async ({ page, testurl, grabs, language }) => {
    // Go to the Home Dashboard.
    await page.goto(testurl + 'administrator/index.php')
    await page.screenshot({ path: grabs + language + '/images/dashboards/home-dashboard.png', fullPage: true});

    // Go to the Content Dashboard.
    await page.goto(testurl + 'administrator/index.php?option=com_cpanel&view=cpanel&dashboard=content')
    await page.screenshot({ path: grabs + language + '/images/dashboards/content-dashboard.png', fullPage: true});

    // Go to the Menu Dashboard.
    await page.goto(testurl + 'administrator/index.php?option=com_cpanel&view=cpanel&dashboard=menus')
    await page.screenshot({ path: grabs + language + '/images/dashboards/menus-dashboard.png', fullPage: true});

    // Go to the Components Dashboard.
    await page.goto(testurl + 'administrator/index.php?option=com_cpanel&view=cpanel&dashboard=components')
    await page.screenshot({ path: grabs + language + '/images/dashboards/components-dashboard.png', fullPage: true});

    // Go to the Users Dashboard.
    await page.goto(testurl + 'administrator/index.php?option=com_cpanel&view=cpanel&dashboard=users')
    await page.screenshot({ path: grabs + language + '/images/dashboards/users-dashboard.png', fullPage: true});

    // Go to the System Dashboard.
    await page.goto(testurl + 'administrator/index.php?option=com_cpanel&view=cpanel&dashboard=system')
    await page.screenshot({ path: grabs + language + '/images/dashboards/system-dashboard.png', fullPage: true});

    // Go to the Help Dashboard.
    await page.goto(testurl + 'administrator/index.php?option=com_cpanel&view=cpanel&dashboard=help')
    await page.screenshot({ path: grabs + language + '/images/dashboards/help-dashboard.png', fullPage: true});
});
