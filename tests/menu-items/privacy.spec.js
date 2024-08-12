// @ts-check
import { test } from '../jtest';

test.use({
    viewport: { width: 1440, height: 850 },
    testIdAttribute: 'data-type'
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
    // Open the main menu.
    await page.goto(testurl + 'option=com_menus&view=items&menutype=mainmenu');

    // Select the New button
    await page.locator('.button-new').first().click();

    // Select the Menu Item Type Select button
    await page.locator('.btn-primary').first().click();
    // Wait for 3 seconds
    await page.waitForTimeout(3000);

});

test.afterEach(async ({ language, country }) => {
    if (test.info().status !== test.info().expectedStatus)
    console.log(`\nTry command:\nLANGUAGE=${language} COUNTRY=${country} npx playwright test menu-items --project firefox --reporter dot -g "${test.info().title}"\n`);
});

test('privacy confirm request', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 715,
      });

    const fr = page.frameLocator('.iframe-content');
    let btn = fr.locator('button[aria-controls="collapse4"]');
    await btn.first().click();
    // Wait for 3 seconds
    await page.waitForTimeout(3000);

    // Select the link for Confirm Request (data-type="xxx")
    let btn2 = await fr.getByTestId('COM_PRIVACY_CONFIRM_VIEW_DEFAULT_TITLE');
    await btn2.first().click();
    // Wait for 3 seconds
    await page.waitForTimeout(3000);
    await page.screenshot({ path: grabs + language + '/images/menu-items/privacy-confirm-request-details-tab.png'});
});

test('privacy create request', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 715,
      });

    const fr = page.frameLocator('.iframe-content');
    let btn = fr.locator('button[aria-controls="collapse4"]');
    await btn.first().click();
    // Wait for 3 seconds
    await page.waitForTimeout(3000);

    // Select the link for Create Request (data-type="xxx")
    let btn2 = await fr.getByTestId('COM_PRIVACY_REQUEST_VIEW_DEFAULT_TITLE');
    await btn2.first().click();
    // Wait for 3 seconds
    await page.waitForTimeout(3000);
    await page.screenshot({ path: grabs + language + '/images/menu-items/privacy-create-request-details-tab.png'});
});

test('privacy extend consent', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 715,
      });

    const fr = page.frameLocator('.iframe-content');
    let btn = fr.locator('button[aria-controls="collapse4"]');
    await btn.first().click();
    // Wait for 3 seconds
    await page.waitForTimeout(3000);

    // Select the link for Create Request (data-type="xxx")
    let btn2 = await fr.getByTestId('COM_PRIVACY_REMIND_VIEW_DEFAULT_TITLE');
    await btn2.first().click();
    // Wait for 3 seconds
    await page.waitForTimeout(3000);
    await page.screenshot({ path: grabs + language + '/images/menu-items/privacy-extend-consent-details-tab.png'});
});