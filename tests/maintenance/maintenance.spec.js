// @ts-check
import { test } from '../jtest';

test.use({
    viewport: { width: 1440, height: 850 },
});

test.beforeAll(async ({language}) => {
    console.log('Language: ' + language);
});

test.beforeEach(async ({ page, testurl, country, username, password }) => {
    // Set timeout for this hook.
    //test.setTimeout(5000);
    // Runs before each test and signs in each page.
    await page.goto(testurl);
    await page.locator('#mod-login-username').fill(username);
    await page.locator('#mod-login-password').fill(password);
    await page.locator('#lang').selectOption(country);
    const loginBtn = await page.locator('#btn-login-submit');
    await loginBtn.click();
});

test.afterEach(async ({ language, country }) => {
    if (test.info().status !== test.info().expectedStatus)
    console.log(`\nTry command:\nLANGUAGE=${language} COUNTRY=${country} npx playwright test maintenance --project firefox --reporter dot -g "${test.info().title}"\n`);
  });

test('maintenance clear cache', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 500,
      });
  await page.goto(testurl + 'option=com_cache');

  await page.screenshot({ path: grabs + language + '/images/maintenance/maintenance-clear-cache.png'});
});

test('cache options', async ({ page, testurl, grabs, language }) => {
  await page.goto(testurl + 'option=com_config&view=component&component=com_cache');

  await page.screenshot({ path: grabs + language + '/images/maintenance/cache-options.png'});
});

test('maintenance database', async ({ page, testurl, grabs, language }) => {
    await page.goto(testurl + 'option=com_installer&view=database');

    await page.screenshot({ path: grabs + language + '/images/maintenance/maintenance-database.png'});
  });

test('maintenance global check in', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 400,
      });
    await page.goto(testurl + 'option=com_checkin');

    await page.screenshot({ path: grabs + language + '/images/maintenance/maintenance-global-check-in.png'});
  });

  test('check-in options', async ({ page, testurl, grabs, language }) => {
    await page.goto(testurl + 'option=com_config&view=component&component=com_checkin');

    await page.screenshot({ path: grabs + language + '/images/maintenance/check-in-options.png'});
  });
