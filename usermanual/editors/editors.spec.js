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

test('editors tinymce plugin', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 1050,
    });
    // Go to the plugins page
    await page.goto(testurl + 'administrator/index.php?option=com_plugins&view=plugins');

    // Search for the TinyMCE plugin
    await page.locator('#filter_search').fill('TinyMCE');
    await page.locator('.filter-search-bar__button').click();

    // Select the edit link using its link
    await page.locator('a[href*="task=plugin.edit"]').first().click();

    // Wait for 3 seconds
    await page.waitForTimeout(3000);

    // Take a screenshot
    await page.screenshot({ path: grabs + language + '/images/editors/tinymce-set0.png'});

    // Select Toolset 1
    await page.locator('button[aria-controls="set-1"]').first().click();
    await page.screenshot({ path: grabs + language + '/images/editors/tinymce-set1.png'});

    // Select Toolset 2
    await page.locator('button[aria-controls="set-2"]').first().click();
    await page.screenshot({ path: grabs + language + '/images/editors/tinymce-set2.png'});

    // Close the plugin or it will be left checked out.
    await page.locator('.button-cancel').click();
});

test('editors codemirror plugin', async ({ page, testurl, grabs, language }) => {
    // Go to the plugins page
    await page.goto(testurl + 'administrator/index.php?option=com_plugins&view=plugins');

    // Search for the CodeMirror plugin
    await page.locator('#filter_search').fill('CodeMirror');
    await page.locator('.filter-search-bar__button').click();

    // Select the edit link using its link
    await page.locator('a[href*="task=plugin.edit"]').first().click();

    // Wait for 3 seconds
    await page.waitForTimeout(3000);

    // Take a screenshot
    await page.screenshot({ path: grabs + language + '/images/editors/codemirror-plugin-tab.png', fullPage: true});

    // Close the plugin or it will be left checked out.
    await page.locator('.button-cancel').click();
});

test('editor codemirror example', async ({ page, testurl, grabs, language }) => {
    // Open the User Profile page
    await page.locator('.header-profile').first().click();

    // Locate the anchor (<a>) containing a span with the class 'icon-user'
    await page.locator('a:has(span.icon-user)').first().click();

    // Open the Basic Settings tab.
    await page.locator('button[aria-controls="attrib-settings"]').first().click();

    // Select the codemirror item from the Editor list.
    await page.locator('#jform_params_editor').selectOption('codemirror');

    // Save the form.
    await page.locator('.button-save').click();

    // Go to the Articles list page.
    await page.goto(testurl + 'administrator/index.php?option=com_content&view=articles')

    // Search for the Frogs page
    await page.locator('#filter_search').fill('Frogs');
    await page.locator('.filter-search-bar__button').click();

    // Select the edit link using its text content
    await page.locator('text="Frogs"').click();

    // Wait for 3 seconds - otherwise no colour coding.
    await page.waitForTimeout(3000);

    // Take a screenshot
    await page.screenshot({ path: grabs + language + '/images/editors/codemirror-example.png', fullPage: true});

    // Close the editor or it will be left checked out.
    await page.locator('.button-cancel').click();

    // Open the User Profile page again
    await page.locator('.header-profile').first().click();

    // Locate the anchor (<a>) containing a span with the class 'icon-user'
    await page.locator('a:has(span.icon-user)').first().click();

    // Open the Basic Settings tab.
    await page.locator('button[aria-controls="attrib-settings"]').first().click();

    // Select the default item from the Editor list.
    await page.locator('#jform_params_editor').selectOption('');

    // Save the form.
    await page.locator('.button-save').click();
});
