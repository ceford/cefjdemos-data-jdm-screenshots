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
    await page.goto(testurl + 'administrator/index.php?');
    await page.locator('#mod-login-username').fill(username);
    await page.locator('#mod-login-password').fill(password);
    await page.locator('#lang').selectOption(country);
    const loginBtn = await page.locator('#btn-login-submit');
    await loginBtn.click();
});

test.afterEach(async ({ page, testurl, language, country }) => {

  // Check if the Profile selector exists
  const selector = '.header-profile';
  const isPresent = await page.locator(selector).count() > 0;

  if (isPresent) {
    // Logout sequence - open the use profile form
    await page.locator('.header-profile').first().click();

    // Locate the anchor (<a>) containing a span with the class 'icon-power-off'
    const logoutLink = await page.locator('a:has(span.icon-power-off)');

    // Click the logout link
    await logoutLink.first().click();
  }

    if (test.info().status !== test.info().expectedStatus)
    console.log(`\nTry command:\nURL=${testurl} LANGUAGE=${language} COUNTRY=${country} npx playwright test articles --project firefox --reporter dot -g "${test.info().title}"\n`);
});

test('categories list', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 750,
    });
    // Go articles categories list page.
    await page.goto(testurl + 'administrator/index.php?option=com_categories&view=categories&extension=com_content');

    // Make the columns visible
    const buttons = await page.locator('.dropdown-toggle');
    const columnsButton = buttons.last();
    await columnsButton.click();

    // Uncheck some of them - Author, Association and Hits
    const columns = await page.locator('.form-check-input');
    await columns.nth(9).setChecked(false);
    await columns.nth(8).setChecked(false);
    await columnsButton.click();

    // Open the Filter Options. js-stools-btn-filter
    await page.locator('.js-stools-btn-filter').click();

    // Click on the -Select Tag- filter to open it
    await page.click('input[aria-label="- Select Tag -"]');

    // Select the Nature item from the filter - first() because the Category filter also has Nature
    await page.locator('div.choices >> div.choices__list >> div.choices__item >> text="Nature"').first().click();
    await page.waitForTimeout(3000);

    await page.selectOption('select#filter_level', { label: '2' });
    await page.waitForTimeout(3000);

    // Close the Filter Options. js-stools-btn-filter
    await page.locator('.js-stools-btn-filter').click();

    await page.screenshot({ path: grabs + language + '/images/fields/fields-articles-categories-list.png'});
});

test('field groups list', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 500,
    });
    // Go articles field groups list page.
    await page.goto(testurl + 'administrator/index.php?option=com_fields&view=groups&context=com_content.article');

    await page.screenshot({ path: grabs + language + '/images/fields/fields-field-groups-list.png'});
});

test('field latin name', async ({ page, testurl, grabs, language }) => {
    // Go articles categories list page.
    await page.goto(testurl + 'administrator/index.php?option=com_fields&view=fields&context=com_content.article');

    // Search for the Latin Name Field
    await page.locator('#filter_search').fill('Latin Name');
    await page.locator('.filter-search-bar__button').click();

    // Select the edit link using its text content
    await page.locator('a[href*="task=field.edit"]').click();

    // Wait for 3 seconds
    await page.waitForTimeout(3000);

    await page.screenshot({ path: grabs + language + '/images/fields/fields-latin-name.png', fullPage: true });

    // Close the article or it will be left checked out.
    await page.locator('.button-cancel').click();
});

test('field flowering season', async ({ page, testurl, grabs, language }) => {
    // Go articles categories list page.
    await page.goto(testurl + 'administrator/index.php?option=com_fields&view=fields&context=com_content.article');

    // Search for the Flowering Season field
    await page.locator('#filter_search').fill('Flowering Season');
    await page.locator('.filter-search-bar__button').click();

    // Select the edit link using its text content
    await page.locator('a[href*="task=field.edit"]').click();

    // Wait for 3 seconds
    await page.waitForTimeout(3000);

    await page.screenshot({ path: grabs + language + '/images/fields/fields-flowering-season.png', fullPage: true });

    // Close the article or it will be left checked out.
    await page.locator('.button-cancel').click();
});

test('field colour', async ({ page, testurl, grabs, language }) => {
    // Go articles categories list page.
    await page.goto(testurl + 'administrator/index.php?option=com_fields&view=fields&context=com_content.article');

    // Search for the Colour Field
    await page.locator('#filter_search').fill('Colour');
    await page.locator('.filter-search-bar__button').click();

    // Select the edit link using its text content
    await page.locator('a[href*="task=field.edit"]').click();

    // Wait for 3 seconds
    await page.waitForTimeout(3000);

    await page.screenshot({ path: grabs + language + '/images/fields/fields-colour.png', fullPage: true });

    // Close the article or it will be left checked out.
    await page.locator('.button-cancel').click();
});

test('field hardiness', async ({ page, testurl, grabs, language }) => {
    // Go articles categories list page.
    await page.goto(testurl + 'administrator/index.php?option=com_fields&view=fields&context=com_content.article');

    // Search for the Colour Field
    await page.locator('#filter_search').fill('RHS Hardiness');
    await page.locator('.filter-search-bar__button').click();

    // Select the edit link using its text content
    await page.locator('a[href*="task=field.edit"]').click();

    // Wait for 3 seconds
    await page.waitForTimeout(3000);

    await page.screenshot({ path: grabs + language + '/images/fields/fields-hardiness.png', fullPage: true });

    // Close the article or it will be left checked out.
    await page.locator('.button-cancel').click();
});

test('fields articles bluebell edit nature', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 800,
    });
    // Go to the Articles list page.
    await page.goto(testurl + 'administrator/index.php?option=com_content&view=articles')

    // Search for the Bluebell page
    await page.locator('#filter_search').fill('Bluebell');
    await page.locator('.filter-search-bar__button').click();

    // Wait for 3 seconds
    //await page.waitForTimeout(3000);

    // Select the edit link using its text content
    await page.locator('text="Bluebell"').click();

    // Select the Nature tab
    await page.click('button >> text="Nature"');

    // Wait for 3 seconds
    await page.waitForTimeout(3000);

    // Click the colour swatch jform_com_fields_colour
    await page.click('input#jform_com_fields_colour');

    // Wait for 3 seconds
    await page.waitForTimeout(3000);

    await page.screenshot({ path: grabs + language + '/images/fields/field-article-bluebell-nature-tab.png' });

    // Close the article or it will be left checked out.
    await page.locator('.button-cancel').click();
});

test('fields articles bluebell edit flowers', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 800,
    });
    // Go to the Articles list page.
    await page.goto(testurl + 'administrator/index.php?option=com_content&view=articles')

    // Search for the Bluebell page
    await page.locator('#filter_search').fill('Bluebell');
    await page.locator('.filter-search-bar__button').click();

    // Select the edit link using its text content
    await page.locator('text="Bluebell"').click();

    // Select the Flowers tab
    await page.click('button >> text="Flowers"');

    // Wait for 3 seconds
    await page.waitForTimeout(3000);

    await page.screenshot({ path: grabs + language + '/images/fields/field-article-bluebell-flowers-tab.png' });

    // Close the article or it will be left checked out.
    await page.locator('.button-cancel').click();
});

test('fields articles bluebell site view', async ({ page, testurl, grabs, language }) => {
    // Go to the Articles list page.
    await page.goto(testurl + 'index.php/en/bluebell')

    await page.screenshot({ path: grabs + language + '/images/fields/field-article-bluebell-site.png', fullPage: true  });
});

test('field parameters', async ({ page, testurl, grabs, language }) => {
    // Go articles field groups list page.
    await page.goto(testurl + 'administrator/index.php?option=com_fields&view=field&layout=edit&context=com_content.article');

    // Select the Inline Help button
    await page.locator('.button-inlinehelp').click();

    await page.screenshot({ path: grabs + language + '/images/fields/fields-parameters-general-tab.png', fullPage: true });

    // Find the Options tab.
    await page.locator('button[aria-controls="attrib-basic"]').first().click();
    await page.screenshot({ path: grabs + language + '/images/fields/fields-parameters-options-tab.png', fullPage: true});

    // Find the Publishing tab.
    await page.locator('button[aria-controls="publishing"]').first().click();
    await page.screenshot({ path: grabs + language + '/images/fields/fields-parameters-publishing-tab.png', fullPage: true});

    // Find the Permissions tab.
    await page.locator('button[aria-controls="rules"]').first().click();
    await page.screenshot({ path: grabs + language + '/images/fields/fields-parameters-permissions-tab.png', fullPage: true});
});
