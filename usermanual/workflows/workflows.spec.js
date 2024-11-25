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

test('workflows stages', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 500,
    });
    // Go to the Workflows page.
    await page.goto(testurl + 'administrator/index.php?option=com_workflow&view=workflows&extension=com_content.article');

    await page.screenshot({ path: grabs + language + '/images/workflows/workflows-list.png'});

    // Go to the Stages page
    await page.locator('a[aria-describedby="tip-stages0"]').click();

    // Select the list limit button - this does not trigger page reload.
    await page.locator('#list_limit').selectOption({value: '10'});

    // Wait for 3 seconds for the page to reload.
    await page.waitForTimeout(3000);

    await page.screenshot({ path: grabs + language + '/images/workflows/workflow-stages-list.png', fullPage: true});

    await page.locator('text="Idea"').click();

    await page.screenshot({ path: grabs + language + '/images/workflows/workflow-stage-edit.png', fullPage: true});

    // Close the article or it will be left checked out.
    await page.locator('.button-cancel').click();
});

// The Workflows must be enabled for some of these screenshots.
test('workflows transitions', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 500,
    });
    // Go to the Transitions page.
    await page.goto(testurl + 'administrator/index.php?option=com_workflow&view=workflows&extension=com_content.article');

    // Go to the Stages page
    await page.locator('a[aria-describedby="tip-transitions0"]').click();

    // Select the list limit button - this does not trigger page reload.
    await page.locator('#list_limit').selectOption({value: '10'});

    // Wait for 3 seconds for the page to reload.
    await page.waitForTimeout(3000);

    await page.screenshot({ path: grabs + language + '/images/workflows/workflow-transitions-list.png', fullPage: true});

    await page.locator('text="Write Article"').click();

    await page.screenshot({ path: grabs + language + '/images/workflows/workflow-transition-edit.png', fullPage: true});

    // Select the  Transition Actions tab
    await page.locator('button[aria-controls="attrib-actions"]').first().click();
    await page.screenshot({ path: grabs + language + '/images/workflows/workflow-transition-edit-actions-tab.png', fullPage: true});

    // Select the Notification tab
    await page.locator('button[aria-controls="attrib-notification"]').first().click();

    // Select the Send Notification button
    await page.locator('#jform_options_notification_send_mail1').click();

    // Wait for 3 seconds for the javascript to complete.
    await page.waitForTimeout(1000);

    await page.screenshot({ path: grabs + language + '/images/workflows/workflow-transition-edit-notifications-tab.png', fullPage: true});

    // Close the article or it will be left checked out.
    await page.locator('.button-cancel').click();
});

// The Workflows must be enabled for some of these screenshots.
test('workflows plugins', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 500,
    });
    // Go to the Transitions page.
    await page.goto(testurl + 'administrator/index.php?option=com_plugins&view=plugins');

    // Filter for workflow
    await page.locator('#filter_search').fill('Workflow');
    await page.locator('.filter-search-bar__button').click();

    await page.screenshot({ path: grabs + language + '/images/workflows/workflow-plugins.png'});
});

// The Workflows must be enabled for some of these screenshots.
test('workflows categories', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 500,
    });
    // Go to the Content Categories page.
    await page.goto(testurl + 'administrator/index.php?option=com_categories&view=categories&extension=com_content');

    // Filter for Blog
    await page.locator('#filter_search').fill('Blog');
    await page.locator('.filter-search-bar__button').click();

    // Wait for 3 seconds
    await page.waitForTimeout(3000);

    // Select the edit link using its link text
    await page.locator('text="Blog"').last().click();

    // Select the Workflow tab
    await page.locator('button[aria-controls="attrib-workflow"]').first().click();

    await page.screenshot({ path: grabs + language + '/images/workflows/workflow-categories-blog.png'});
});
