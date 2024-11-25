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
    await page.locator('#mod-login-username').fill('oddjob');
    await page.locator('#mod-login-password').fill('(oddjob123%)');
    await page.locator('#lang').selectOption(country);
    const loginBtn = await page.locator('#btn-login-submit');
    await loginBtn.click();
});

test.afterEach(async ({ page, language, country }) => {
  if (test.info().status !== test.info().expectedStatus) {
    console.log(`\nTry command:\nURL=${testurl} LANGUAGE=${language} COUNTRY=${country} npx playwright test banners --project firefox --reporter dot -g "${test.info().title}"\n`);
  }
});

test('home dashboard for oddjob', async ({ page, testurl, grabs, language }) => {
    // Purpose is to show the Help button.
    await page.goto(testurl);
    await page.screenshot({
        path: grabs + language + '/images/common-elements/home-dashboard-for-oddjob.png',
        clip: { x: 0, y: 0, width: 1440, height: 640 }
    });
});

test('media screen for oddjob', async ({ page, testurl, grabs, language }) => {
    // Purpose is to show the Help button.
    await page.goto(testurl + 'option=com_media&path=local-images:/');

    // Wait for 3 seconds to allow time to populate the images screen.
    await page.waitForTimeout(3000);

    await page.screenshot({
        path: grabs + language + '/images/common-elements/media-screen-for-oddjob.png',
        clip: { x: 0, y: 0, width: 1440, height: 430 }
    });
});

