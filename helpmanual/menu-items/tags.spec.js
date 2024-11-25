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
    test.setTimeout(60000);
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

test.afterEach(async ({ testurl, language, country }) => {
    if (test.info().status !== test.info().expectedStatus)
    console.log(`\nTry command:\nURL=${testurl} LANGUAGE=${language} COUNTRY=${country} npx playwright test menu-items --project firefox --reporter dot -g "${test.info().title}"\n`);
});

test('tags compact list of tagged items', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 715,
    });

    const fr = page.frameLocator('.iframe-content');

    // Find all of the accordion buttons and expand them.
    const buttons = fr.locator('.accordion-button');
    const count = await buttons.count();
    for (let i = 0; i < count; ++i)
    await buttons.nth(i).click();

    // Wait for 3 seconds
    await page.waitForTimeout(3000);

    // Select the link for Compact List of Tagged Items
    await fr.getByTestId('COM_TAGS_TAG_VIEW_LIST_COMPACT_TITLE').first().click();

    // Wait for 3 seconds
    await page.waitForTimeout(3000);

    await page.screenshot({ path: grabs + language + '/images/menu-items/tags-compact-list-of-tagged-items-details-tab.png'});

    // Find the Tag Options tab.
    await page.locator('button[aria-controls="attrib-basic"]').first().click();
    await page.screenshot({ path: grabs + language + '/images/menu-items/tags-compact-list-of-tagged-items-tag-options-tab.png', fullPage: true });

    // Find the List Layouts tab.
    await page.locator('button[aria-controls="attrib-advanced"]').first().click();
    await page.screenshot({ path: grabs + language + '/images/menu-items/tags-compact-list-of-tagged-items-list-layouts-tab.png', fullPage: true });

    // Find the Item Selection Options tab.
    await page.locator('button[aria-controls="attrib-selection"]').first().click();
    await page.screenshot({ path: grabs + language + '/images/menu-items/tags-compact-list-of-tagged-items-item-selection-options-tab.png', fullPage: true });

    // Close the article or it will be left checked out.
    await page.locator('.button-cancel').click();
});

test('tags list all tags', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 715,
    });

    const fr = page.frameLocator('.iframe-content');

    // Find all of the accordion buttons and expand them.
    const buttons = fr.locator('.accordion-button');
    const count = await buttons.count();
    for (let i = 0; i < count; ++i)
    await buttons.nth(i).click();

    // Wait for 3 seconds
    await page.waitForTimeout(3000);

    // Select the link for List All Tags
    await fr.getByTestId('COM_TAGS_TAGS_VIEW_DEFAULT_TITLE').first().click();

    // Wait for 3 seconds
    await page.waitForTimeout(3000);

    await page.screenshot({ path: grabs + language + '/images/menu-items/tags-list-all-tags-details-tab.png'});

    // Find the Options tab.
    await page.locator('button[aria-controls="attrib-basic"]').first().click();
    await page.screenshot({ path: grabs + language + '/images/menu-items/tags-list-all-tags-options-tab.png', fullPage: true });

    // Find the Selection Options tab.
    await page.locator('button[aria-controls="attrib-selection"]').first().click();
    await page.screenshot({ path: grabs + language + '/images/menu-items/tags-list-all-tags-selection-options-tab.png', fullPage: true });

    // Close the article or it will be left checked out.
    await page.locator('.button-cancel').click();
});

test('tags tagged items', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 715,
    });

    const fr = page.frameLocator('.iframe-content');

    // Find all of the accordion buttons and expand them.
    const buttons = fr.locator('.accordion-button');
    const count = await buttons.count();
    for (let i = 0; i < count; ++i)
    await buttons.nth(i).click();

    // Wait for 3 seconds
    await page.waitForTimeout(3000);

    // Select the link for List All Tags
    await fr.getByTestId('COM_TAGS_TAG_VIEW_DEFAULT_TITLE').first().click();

    // Wait for 3 seconds
    await page.waitForTimeout(3000);

    await page.screenshot({ path: grabs + language + '/images/menu-items/tags-tagged-items-details-tab.png'});

    // Find the Tag Options tab.
    await page.locator('button[aria-controls="attrib-basic"]').first().click();
    await page.screenshot({ path: grabs + language + '/images/menu-items/tags-tagged-items-tag-options-tab.png', fullPage: true });

    // Find the Item Options tab.
    await page.locator('button[aria-controls="attrib-advanced"]').first().click();
    await page.screenshot({ path: grabs + language + '/images/menu-items/tags-tagged-items-item-options-tab.png', fullPage: true });

    // Find the Pagination Options tab.
    await page.locator('button[aria-controls="attrib-pagination"]').first().click();
    await page.screenshot({ path: grabs + language + '/images/menu-items/tags-tagged-items-pagination-options-tab.png', fullPage: true });

    // Find the Item Selection Options tab.
    await page.locator('button[aria-controls="attrib-selection"]').first().click();
    await page.screenshot({ path: grabs + language + '/images/menu-items/tags-tagged-items-item-selection-options-tab.png', fullPage: true });

    // Close the article or it will be left checked out.
    await page.locator('.button-cancel').click();
});
