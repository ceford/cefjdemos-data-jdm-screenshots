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

test.afterEach(async ({ page, language, country }) => {
  if (test.info().status !== test.info().expectedStatus) {
    console.log(`\nTry command:\nURL=${testurl} LANGUAGE=${language} COUNTRY=${country} npx playwright test banners --project firefox --reporter dot -g "${test.info().title}"\n`);
  }
});

test('start here top bars', async ({ page, testurl, grabs, language }) => {
// Purpose is to show the Help button.
  await page.goto(testurl + 'option=com_content&view=articles');
  // Make the columns visible
  const buttons = await page.locator('.dropdown-toggle');
  const columnsButton = buttons.last();
  await columnsButton.click();

  // Uncheck some of them - Author and Hits
  const columns = await page.locator('.form-check-input');
  await columns.nth(9).setChecked(false);
  await columns.nth(5).setChecked(false);
  await columnsButton.click();

  // Hover over the Help button.
  await page.locator('.button-help').evaluate(element => element.style.border = '5px solid red');
  await page.locator('.button-help').hover();

  await page.screenshot({
    path: grabs + language + '/images/help-screens/start-here-top-bars.png',
    clip: { x: 0, y: 0, width: 1440, height: 200 }
  });

});
/*
test('element test', async ({ page, testurl, grabs, language }) => {
    await page.goto(testurl + 'option=com_content&view=articles');

    await page.locator('#j-main-container').screenshot({
        path: grabs + language + '/images/help-screens/element-screenshot.png',
    });
});
*/
