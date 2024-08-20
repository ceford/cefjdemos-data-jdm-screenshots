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
    await page.goto(testurl);
    await page.locator('#mod-login-username').fill(username);
    await page.locator('#mod-login-password').fill(password);
    await page.locator('#lang').selectOption(country);
    const loginBtn = await page.locator('#btn-login-submit');
    await loginBtn.click();
});

test.afterEach(async ({ language, country }) => {
    if (test.info().status !== test.info().expectedStatus)
    console.log(`\nTry command:\nLANGUAGE=${language} COUNTRY=${country} npx playwright test templates --project firefox --reporter dot -g "${test.info().title}"\n`);
});

test('templates site list', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 500,
    });
    await page.goto(testurl + 'option=com_templates&view=templates');
    await page.screenshot({ path: grabs + language + '/images/templates/templates-site-templates-list.png', fullPage: true});
});

test('templates customise cassiopeia', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 500,
    });
    await page.goto(testurl + 'option=com_templates&view=templates');

    // Find the first template in the list
    await page.locator('[href*="option=com_templates&view=template&id="]').first().click();
    await page.screenshot({ path: grabs + language + '/images/templates/templates-customise-cassiopeia-editor-tab.png', fullPage: true});

    // Find the Create Overrides tab.
    await page.locator('button[aria-controls="overrides"]').first().click();
    await page.screenshot({ path: grabs + language + '/images/templates/templates-customise-cassiopeia-create-overrides-tab.png', fullPage: true});

    // Find the Updated Files tab.
    await page.locator('button[aria-controls="files"]').first().click();
    await page.screenshot({ path: grabs + language + '/images/templates/templates-customise-cassiopeia-updated-files-tab.png'});

    // Find the Template Description tab.
    await page.locator('button[aria-controls="description"]').first().click();
    await page.screenshot({ path: grabs + language + '/images/templates/templates-customise-cassiopeia-template-description-tab.png'});

    // Close the item or it will be left checked out.
    await page.locator('.button-cancel').click();
});

// Capture the Editor window containing the component.php code.
test('templates customise cassiopeia popups', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 500,
    });
    await page.goto(testurl + 'option=com_templates&view=templates');

    // Find the first template in the list
    await page.locator('[href*="option=com_templates&view=template&id="]').first().click();

    // Select the component.php file.
    await page.locator('li:has-text("component.php")').first().click();

    // Capture the Editor tab.
    await page.screenshot({ path: grabs + language + '/images/templates/templates-customise-cassiopeia-edit-component-editor-tab.png', fullPage: true});

    // Close the editor or it will be left checked out.
    await page.locator('.button-cancel').click();

    // Close the item or it will be left checked out.
    await page.locator('.button-cancel').click();
});

test('templates site styles list', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 500,
    });
    await page.goto(testurl + 'option=com_templates&view=styles&client_id=0');
    await page.screenshot({ path: grabs + language + '/images/templates/templates-site-styles-list.png', fullPage: true});
});

test('templates edit style', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 500,
    });
    await page.goto(testurl + 'option=com_templates&view=styles&client_id=0');

    // Find the first template in the list
    await page.locator('[href*="option=com_templates&task=style.edit&id="]').first().click();
    await page.screenshot({ path: grabs + language + '/images/templates/templates-site-edit-style-details-tab.png', fullPage: true});

    // Find the Advanced tab.
    await page.locator('button[aria-controls="attrib-advanced"]').first().click();
    await page.screenshot({ path: grabs + language + '/images/templates/templates-site-edit-style-advanced-tab.png', fullPage: true});

    // Find the Menu Assignment tab.
    await page.locator('button[aria-controls="assignment"]').first().click();
    await page.screenshot({ path: grabs + language + '/images/templates/templates-site-edit-style-menu-assignment-tab.png', fullPage: true});

    // Close the item or it will be left checked out.
    await page.locator('.button-cancel').click();
});

test('templates options', async ({ page, testurl, grabs, language }) => {
    await page.goto(testurl + 'option=com_config&view=component&component=com_templates');
    await page.screenshot({ path: grabs + language + '/images/templates/templates-options-templates-tab.png', fullPage: true});
});
