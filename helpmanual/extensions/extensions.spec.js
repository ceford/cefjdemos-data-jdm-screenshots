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
    console.log(`\nTry command:\nURL=${testurl} LANGUAGE=${language} COUNTRY=${country} npx playwright test extensions --project firefox --reporter dot -g "${test.info().title}"\n`);
  });

test('extensions discover list', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 720,
      });
  await page.goto(testurl + 'option=com_installer&view=discover');

  await page.screenshot({ path: grabs + language + '/images/extensions/discover-list.png'});
});

test('extensions install upload package file', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 720,
      });
    await page.goto(testurl + 'option=com_installer&view=install');

    await page.screenshot({ path: grabs + language + '/images/extensions/install-upload-package-file.png'});

    // Find the Install from Folder tab.
    let btn1 = await page.locator('button[aria-controls="folder"]').first().click();
    await page.screenshot({ path: grabs + language + '/images/extensions/install-from-folder.png'});

    // Find the Install from URL tab.
    let btn2 = await page.locator('button[aria-controls="url"]').first().click();
    await page.screenshot({ path: grabs + language + '/images/extensions/install-from-url.png'});

    // Find the Install from web tab.
    let btn3 = await page.locator('button[aria-controls="web"]').first().click();
    // Wait for 3 seconds
    await page.waitForTimeout(3000);
    await page.screenshot({ path: grabs + language + '/images/extensions/install-from-web.png'});

});

test('extensions languages install', async ({ page, testurl, grabs, language }) => {
  await page.goto(testurl + 'option=com_installer&view=languages');

  await page.screenshot({ path: grabs + language + '/images/extensions/languages-install.png', fullPage: true});
});

test('extensions manage', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1600,
        height: 720,
      });
    await page.goto(testurl + 'option=com_installer&view=manage');

    await page.screenshot({ path: grabs + language + '/images/extensions/manage-list.png', fullPage: true});
  });

  test('extensions update', async ({ page, testurl, grabs, language }) => {
    await page.goto(testurl + 'option=com_installer&view=update');

    await page.screenshot({ path: grabs + language + '/images/extensions/update-list.png', fullPage: true});
  });

test('installer options preferences tab', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 510,
      });
    await page.goto(testurl + 'option=com_config&view=component&component=com_installer');

    await page.screenshot({ path: grabs + language + '/images/extensions/installer-options-preferences-tab.png'});
});
