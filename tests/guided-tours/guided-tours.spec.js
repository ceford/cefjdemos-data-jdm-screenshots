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
    console.log(`\nTry command:\nLANGUAGE=${language} COUNTRY=${country} npx playwright test guided-tours --project firefox --reporter dot -g "${test.info().title}"\n`);
  });

test('guided tours list', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 720,
      });
  await page.goto(testurl + 'option=com_guidedtours&view=tours');

  await page.screenshot({ path: grabs + language + '/images/guided-tours/guided-tours-list.png', fullPage: true});
});

test('guided tours edit tour', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 720,
      });
      await page.goto(testurl + 'option=com_guidedtours&view=tours');

      // Open the first item in the list
      const item_id = await page.locator('#cb0').inputValue();
      const url = testurl + 'option=com_guidedtours&task=tour.edit&id=' + item_id;
      await page.goto(url);

      await page.screenshot({ path: grabs + language + '/images/guided-tours/guided-tours-edit-tour.png'});

    // Close the tour or it will be left checked out.
    await page.locator('.button-cancel').click();
});

test('guided tours steps list', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 720,
      });
  await page.goto(testurl + 'option=com_guidedtours&view=steps&tour_id=1');

  await page.screenshot({ path: grabs + language + '/images/guided-tours/guided-tours-steps-list.png', fullPage: true});
});

test('guided tours edit step', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 720,
      });
      await page.goto(testurl + 'option=com_guidedtours&view=steps&tour_id=1');

      // Open the first item in the list
      const item_id = await page.locator('#cb0').inputValue();
      const url = testurl + 'option=com_guidedtours&task=step.edit&id=' + item_id;
      await page.goto(url);

      await page.screenshot({ path: grabs + language + '/images/guided-tours/guided-tours-edit-step.png'});

    // Find the Options tab.
    await page.locator('button[aria-controls="attrib-options"]').first().click();
    await page.screenshot({ path: grabs + language + '/images/guided-tours/guided-tours-edit-step-options-tab.png'});

    // Close the tour or it will be left checked out.
    await page.locator('.button-cancel').click();
});

