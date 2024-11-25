// @ts-check
import { test } from '../jtest';

test.use({
    viewport: { width: 1440, height: 850 },
    testIdAttribute: 'data-type'
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
    console.log(`\nTry command:\nURL=${testurl} LANGUAGE=${language} COUNTRY=${country} npx playwright test menu-items --project firefox --reporter dot -g "${test.info().title}"\n`);
  });

test('menu item details', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 715,
      });
  await page.goto(testurl + 'option=com_menus&view=items&menutype=mainmenu');

  // Select the New button
  await page.locator('.button-new').first().click();

    // Find the Details tab (otherwise the Cancel button is red).
    let btn = await page.locator('button[aria-controls="details"]');
    await btn.nth(0).click();

    await page.screenshot({ path: grabs + language + '/images/menu-items-common/menu-item-details.png'});
});

test('menu item link type', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 715,
      });
  await page.goto(testurl + 'option=com_menus&view=items&menutype=mainmenu');

  // Select the New button
  await page.locator('.button-new').first().click();

    // Find the Link Type tab.
    let btn = await page.locator('button[aria-controls="attrib-menu-options"]');
    await btn.nth(0).click();

    await page.screenshot({ path: grabs + language + '/images/menu-items-common/menu-item-link-type.png', fullPage: true });
});

test('menu item page display', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 715,
      });
  await page.goto(testurl + 'option=com_menus&view=items&menutype=mainmenu');

  // Select the New button
  await page.locator('.button-new').first().click();

    // Find the Link Type tab.
    let btn = await page.locator('button[aria-controls="attrib-page-options"]');
    await btn.nth(0).click();

    await page.screenshot({ path: grabs + language + '/images/menu-items-common/menu-item-page-display.png', fullPage: true });
});

test('menu item metadata', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 715,
      });
  await page.goto(testurl + 'option=com_menus&view=items&menutype=mainmenu');

  // Select the New button
  await page.locator('.button-new').first().click();

    // Find the Link Type tab.
    let btn = await page.locator('button[aria-controls="attrib-metadata"]');
    await btn.nth(0).click();

    await page.screenshot({ path: grabs + language + '/images/menu-items-common/menu-item-metadata.png', fullPage: true });
});

test('menu item associations', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 715,
      });
  await page.goto(testurl + 'option=com_menus&view=items&menutype=mainmenu');

  // Select the New button
  await page.locator('.button-new').first().click();

  // Select English for this item
  await page.locator('#jform_language').selectOption('en-GB');
  await page.waitForTimeout(3000);

    // Find the Link Type tab.
    let btn = await page.locator('button[aria-controls="associations"]');
    await btn.nth(0).click();

    await page.screenshot({ path: grabs + language + '/images/menu-items-common/menu-item-associations.png', fullPage: true });
});

test('menu item module assignment', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 1000,
    });
    await page.goto(testurl + 'option=com_menus&view=items&menutype=mainmenu');

    // Select the New button
    await page.locator('.button-new').first().click();

    // Find the Link Type tab.
    let btn = await page.locator('button[aria-controls="modules"]');
    await btn.nth(0).click();

    await page.screenshot({ path: grabs + language + '/images/menu-items-common/menu-item-module-assignment.png'});
});
