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
    await page.goto(testurl);
    await page.locator('#mod-login-username').fill(username);
    await page.locator('#mod-login-password').fill(password);
    await page.locator('#lang').selectOption(country);
    const loginBtn = await page.locator('#btn-login-submit');
    await loginBtn.click();
});

test.afterEach(async ({ testurl, language, country }) => {
    if (test.info().status !== test.info().expectedStatus)
    console.log(`\nTry command:\nURL=${testurl} LANGUAGE=${language} COUNTRY=${country} npx playwright test languages --project firefox --reporter dot -g "${test.info().title}"\n`);
  });

test('languages installed site', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1600,
        height: 720,
      });
  await page.goto(testurl + 'option=com_languages&view=installed');

  await page.screenshot({ path: grabs + language + '/images/languages/languages-installed-site.png', fullPage: true});
});

test('languages content', async ({ page, testurl, grabs, language }) => {
  await page.goto(testurl + 'option=com_languages&view=languages');

  await page.screenshot({ path: grabs + language + '/images/languages/languages-content.png', fullPage: true});
});

test('languages edit content language', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 560,
      });
    await page.goto(testurl + 'option=com_languages&view=languages');

    // Open the first item in the list
    const language_id = await page.locator('#cb0').inputValue();
    const url = testurl + 'option=com_languages&task=language.edit&lang_id=' + language_id;
    await page.goto(url);

    await page.screenshot({ path: grabs + language + '/images/languages/languages-edit-content-language-details-tab.png', fullPage: true});

    // Find the Options tab.
    await page.locator('button[aria-controls="metadata"]').first().click();
    await page.screenshot({ path: grabs + language + '/images/languages/languages-edit-content-language-options-tab.png'});
  });

  test('languages overrides', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 400,
      });
    // Make an entry for JLIB_ENVIRONMENT_SESSION_EXPIRED for use here.
    await page.goto(testurl + 'option=com_languages&view=overrides');

    // Select English - Site.
    await page.locator('#language_client').selectOption('en-GB0');
    await page.waitForTimeout(3000);

    await page.screenshot({ path: grabs + language + '/images/languages/languages-overrides-list.png'});
  });

  test('languages edit override', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 750,
      });
    // Make an entry for JLIB_ENVIRONMENT_SESSION_EXPIRED for use here.
    await page.goto(testurl + 'option=com_languages&view=overrides');

    // Select English - Site.
    await page.locator('#language_client').selectOption('en-GB0');
    await page.waitForTimeout(3000);
    await page.goto(testurl + 'option=com_languages&task=override.edit&id=JLIB_ENVIRONMENT_SESSION_EXPIRED');

    await page.screenshot({ path: grabs + language + '/images/languages/languages-edit-override.png'});
  });
