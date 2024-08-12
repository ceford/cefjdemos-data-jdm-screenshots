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
    console.log(`\nTry command:\nLANGUAGE=${language} COUNTRY=${country} npx playwright test fields --project firefox --reporter dot -g "${test.info().title}"\n`);
  });

test('fields list', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 720,
      });
  await page.goto(testurl + 'option=com_fields&view=fields&context=com_content.article');

  await page.screenshot({ path: grabs + language + '/images/fields/articles-fields-list.png'});
});

test('articles edit field', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 720,
      });
      await page.goto(testurl + 'option=com_fields&view=fields&context=com_content.article');

      // Open the first item in the list
    const item_id = await page.locator('#cb0').inputValue();
    const url = testurl + 'option=com_fields&task=field.edit&id=' + item_id + '&context=com_content.article';
    await page.goto(url);

    await page.screenshot({ path: grabs + language + '/images/fields/articles-edit-field.png'});

    // Find the Options tab.
    let btn = await page.locator('button[aria-controls="attrib-basic"]');
    await btn.first().click();
    await page.screenshot({ path: grabs + language + '/images/fields/articles-edit-field-options-tab.png'});

    // Close the article or it will be left checked out.
    await page.locator('.button-cancel').click();
});

test('field groups list', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 720,
      });
  await page.goto(testurl + 'option=com_fields&view=groups&context=com_content.article');

  await page.screenshot({ path: grabs + language + '/images/fields/articles-field-groups-list.png'});

    // Open the first item in the list
    const item_id = await page.locator('#cb0').inputValue();
    const url = testurl + 'option=com_fields&task=group.edit&id=' + item_id + '&context=com_content.article';
    await page.goto(url);

  await page.screenshot({ path: grabs + language + '/images/fields/articles-edit-field-group.png'});

});
