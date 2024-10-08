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
    // test.setTimeout(60000);
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
    console.log(`\nTry command:\nURL=${testurl} LANGUAGE=${language} COUNTRY=${country} npx playwright test banners --project firefox --reporter dot -g "${test.info().title}"\n`);
  });

test('banners list', async ({ page, testurl, grabs, language }) => {
    // Need more width for portuguese
    if (language === 'pt' || language === 'pt-br') {
        await page.locator('#menu-collapse').click();
    }
  await page.goto(testurl + 'option=com_banners&view=banners');

  await page.screenshot({ path: grabs + language + '/images/banners/banners-list.png'});
});

// Confusing: there are both Details and Banner Details tabs!
test('banners edit details tab', async ({ page, testurl, grabs, language }) => {
    // Open the list page.
    await page.goto(testurl + 'option=com_banners&view=banners');

    const banner_id = await page.locator('#cb0').inputValue();
    const url = testurl + 'option=com_banners&task=banner.edit&id=' + banner_id;
    await page.goto(url);

    // Grab the Details tab.
    await page.screenshot({ path: grabs + language + '/images/banners/banners-edit-details-tab.png', fullPage: true });

    // Find the Banner Details tab.
    await page.locator('button[aria-controls="otherparams"]').first().click();
    await page.screenshot({ path: grabs + language + '/images/banners/banners-edit-banner-details-tab.png', fullPage: true });

    // Close the banner or it will be left checked out.
    await page.locator('.button-cancel').click();
});

test('banners categories list', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
      width: 1440,
      height: 480,
    });
    await page.goto(testurl + 'option=com_categories&view=categories&extension=com_banners');
    // Need more width for dutch
    if (language === 'nl') {
        await page.locator('#menu-collapse').click();
    }
    // Make the columns visible
    const buttons = await page.locator('.dropdown-toggle');
    const columnsButton = buttons.last();
    await columnsButton.click();

    // Uncheck some of them - Author and Hits
    const columns = await page.locator('.form-check-input');
    // Hide Access and Association
    await columns.nth(8).setChecked(false);
    await columns.nth(7).setChecked(false);
    await columnsButton.click();

    await page.screenshot({ path: grabs + language + '/images/banners/banners-categories-list.png'});
});

test('banners edit category category tab', async ({ page, testurl, grabs, language, country }) => {
    // Open the list page.
    await page.goto(testurl + 'option=com_categories&view=categories&extension=com_banners');

    // Get the cb0 value.
    const cb0 = await page.locator('#cb0')
    const id = await cb0.getAttribute('value');

    // Select the first title to open the edit form.
    await page.locator('[href*="id=' + id + '"]').click();

    // Grab the Category tab.
    await page.screenshot({ path: grabs + language + '/images/banners/banners-edit-category-category-tab.png', fullPage: true });

    // Find the Options tab.
    await page.locator('button[aria-controls="attrib-options"]').first().click();
    await page.screenshot({ path: grabs + language + '/images/banners/banners-edit-category-options-tab.png', fullPage: true });

    // Find the Publishing tab.
    let btn = await page.locator('button[aria-controls="publishing"]').first().click();
    await page.screenshot({ path: grabs + language + '/images/banners/banners-edit-category-publishing-tab.png', fullPage: true });

    // Find the Permissions tab.
    await page.locator('button[aria-controls="rules"]').first().click();
    await page.screenshot({ path: grabs + language + '/images/banners/banners-edit-category-permissions-tab.png', fullPage: true });

    // Close the article or it will be left checked out.
    await page.locator('.button-cancel').click();
});

test('banners clients list', async ({ page, testurl, grabs, language }) => {
    // Need width for this one.
    await page.setViewportSize({
        width: 1600,
        height: 600,
    });
    await page.goto(testurl + 'option=com_banners&view=clients');

    await page.screenshot({ path: grabs + language + '/images/banners/banners-clients-list.png'});
});

test('banners edit client details tab', async ({ page, testurl, grabs, language, country }) => {
    // Open the list page.
    await page.goto(testurl + 'option=com_banners&view=clients');

    // Get the cb0 value.
    const cb0 = await page.locator('#cb0')
    const id = await cb0.getAttribute('value');

    // Select the first title to open the edit form.
    await page.locator('[href*="client.edit&id=' + id + '"]').click();

    // Grab the Client Details tab
    await page.screenshot({ path: grabs + language + '/images/banners/banners-edit-client-details-tab.png', fullPage: true });

    // Find the Metadata tab.
    await page.locator('button[aria-controls="metadata"]').first().click();
    await page.screenshot({ path: grabs + language + '/images/banners/banners-edit-client-metadata-tab.png', fullPage: true });

    // Close the article or it will be left checked out.
    await page.locator('.button-cancel').click();
});

test('banners options client tab', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 720,
    });
    await page.goto(testurl + 'option=com_config&view=component&component=com_banners');

    await page.screenshot({ path: grabs + language + '/images/banners/banners-options-client-tab.png'});
});

test('banners options history tab', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 520,
    });
    await page.goto(testurl + 'option=com_config&view=component&component=com_banners');

    // Find the tab.
    let btn = await page.locator('button[aria-controls="banners"]');
    await btn.nth(0).click();

    await page.screenshot({ path: grabs + language + '/images/banners/banners-options-history-tab.png'});
  });

  test('banners options permissions tab', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 800,
    });
    await page.goto(testurl + 'option=com_config&view=component&component=com_banners');

    // Find the tab.
    let btn = await page.locator('button[aria-controls="permissions"]');
    await btn.nth(0).click();

    await page.screenshot({ path: grabs + language + '/images/banners/banners-options-permissions-tab.png'});
  });

  test('banners tracks list', async ({ page, testurl, grabs, language }) => {
    // Need width for this one.
    await page.setViewportSize({
          width: 1440,
          height: 500,
        });
    await page.goto(testurl + 'option=com_banners&view=tracks');

    await page.screenshot({ path: grabs + language + '/images/banners/banners-tracks-list.png'});
    test.info().annotations.push({ type: 'something', description: 'some description' });
  });
