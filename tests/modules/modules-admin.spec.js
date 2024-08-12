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
    console.log(`\nTry command:\nLANGUAGE=${language} COUNTRY=${country} npx playwright test modules --project firefox --reporter dot -g "${test.info().title}"\n`);
  });

test('modules administrator list', async ({ page, testurl, grabs, language }) => {
    await page.goto(testurl + 'option=com_modules&view=modules&client_id=1');

    await page.screenshot({ path: grabs + language + '/images/modules-admin/modules-administrator-list.png', fullPage: true});
});

test('modules available', async ({ page, testurl, grabs, language }) => {
    await page.goto(testurl + 'option=com_modules&view=select&client_id=1');
    await page.screenshot({ path: grabs + language + '/images/modules-admin/modules-administrator-available.png', fullPage: true});
});

test('modules action logs latest', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 550,
    });
    await page.goto(testurl + 'option=com_modules&task=module.add&client_id=1&eid=82');
    await page.screenshot({ path: grabs + language + '/images/modules-admin/modules-action-logs-latest-module-tab.png', fullPage: true});
});

test('modules administrator dashboard menu', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 550,
    });
    await page.goto(testurl + 'option=com_modules&task=module.add&client_id=1&eid=84');
    await page.screenshot({ path: grabs + language + '/images/modules-admin/modules-administrator-dashboard-menu-module-tab.png', fullPage: true});
});

test('modules administrator menu', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 550,
    });
    await page.goto(testurl + 'option=com_modules&task=module.add&client_id=1&eid=67');
    await page.screenshot({ path: grabs + language + '/images/modules-admin/modules-administrator-menu-module-tab.png', fullPage: true});
});

test('modules articles latest', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 550,
    });
    await page.goto(testurl + 'option=com_modules&task=module.add&client_id=1&eid=63');
    await page.screenshot({ path: grabs + language + '/images/modules-admin/modules-articles-latest-module-tab.png', fullPage: true});
});

test('modules custom', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 550,
    });
    await page.goto(testurl + 'option=com_modules&task=module.add&client_id=1&eid=61');
    await page.screenshot({ path: grabs + language + '/images/modules-admin/modules-custom-module-tab.png', fullPage: true});
});

test('modules feed display', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 550,
    });
    await page.goto(testurl + 'option=com_modules&task=module.add&client_id=1&eid=62');
    await page.screenshot({ path: grabs + language + '/images/modules-admin/modules-feed-display-module-tab.png', fullPage: true});
});

test('modules frontend link', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 550,
    });
    await page.goto(testurl + 'option=com_modules&task=module.add&client_id=1&eid=70');
    await page.screenshot({ path: grabs + language + '/images/modules-admin/modules-frontend-link-module-tab.png', fullPage: true});
});

test('modules guided tours', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 550,
    });
    await page.goto(testurl + 'option=com_modules&task=module.add&client_id=1&eid=86');
    await page.screenshot({ path: grabs + language + '/images/modules-admin/modules-guided-tours-module-tab.png', fullPage: true});
});

test('modules joomla version', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 550,
    });
    await page.goto(testurl + 'option=com_modules&task=module.add&client_id=1&eid=77');
    await page.screenshot({ path: grabs + language + '/images/modules-admin/modules-joomla-version-module-tab.png', fullPage: true});
});

test('modules logged in users', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 550,
    });
    await page.goto(testurl + 'option=com_modules&task=module.add&client_id=1&eid=64');
    await page.screenshot({ path: grabs + language + '/images/modules-admin/modules-logged-in-users-module-tab.png', fullPage: true});
});

test('modules login form', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 550,
    });
    await page.goto(testurl + 'option=com_modules&task=module.add&client_id=1&eid=65');
    await page.screenshot({ path: grabs + language + '/images/modules-admin/modules-login-form-module-tab.png', fullPage: true});
});

test('modules login support information', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 550,
    });
    await page.goto(testurl + 'option=com_modules&task=module.add&client_id=1&eid=66');
    await page.screenshot({ path: grabs + language + '/images/modules-admin/modules-login-support-information-module-tab.png', fullPage: true});
});

test('modules messages', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 550,
    });
    await page.goto(testurl + 'option=com_modules&task=module.add&client_id=1&eid=71');
    await page.screenshot({ path: grabs + language + '/images/modules-admin/modules-messages-module-tab.png', fullPage: true});
});

test('modules multilingual status', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 550,
    });
    await page.goto(testurl + 'option=com_modules&task=module.add&client_id=1&eid=76');
    await page.screenshot({ path: grabs + language + '/images/modules-admin/modules-multilingual-status-module-tab.png', fullPage: true});
});

test('modules popular articles', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 550,
    });
    await page.goto(testurl + 'option=com_modules&task=module.add&client_id=1&eid=68');
    await page.screenshot({ path: grabs + language + '/images/modules-admin/modules-popular-articles-module-tab.png', fullPage: true});
});

test('modules post installation messages', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 550,
    });
    await page.goto(testurl + 'option=com_modules&task=module.add&client_id=1&eid=72');
    await page.screenshot({ path: grabs + language + '/images/modules-admin/modules-post-installation-messages-module-tab.png', fullPage: true});
});

test('modules privacy dashboard', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 550,
    });
    await page.goto(testurl + 'option=com_modules&task=module.add&client_id=1&eid=83');
    await page.screenshot({ path: grabs + language + '/images/modules-admin/modules-privacy-dashboard-module-tab.png', fullPage: true});
});

test('modules privacy status check', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 550,
    });
    await page.goto(testurl + 'option=com_modules&task=module.add&client_id=1&eid=85');
    await page.screenshot({ path: grabs + language + '/images/modules-admin/modules-privacy-status-check-module-tab.png', fullPage: true});
});

test('modules quick icons', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 550,
    });
    await page.goto(testurl + 'option=com_modules&task=module.add&client_id=1&eid=69');
    await page.screenshot({ path: grabs + language + '/images/modules-admin/modules-quick-icons-module-tab.png', fullPage: true});
});

test('modules sample data', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 550,
    });
    await page.goto(testurl + 'option=com_modules&task=module.add&client_id=1&eid=81');
    await page.screenshot({ path: grabs + language + '/images/modules-admin/modules-sample-data-module-tab.png', fullPage: true});
});

test('modules title', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 550,
    });
    await page.goto(testurl + 'option=com_modules&task=module.add&client_id=1&eid=74');
    await page.screenshot({ path: grabs + language + '/images/modules-admin/modules-title-module-tab.png', fullPage: true});
});

test('modules toolbar', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 550,
    });
    await page.goto(testurl + 'option=com_modules&task=module.add&client_id=1&eid=75');
    await page.screenshot({ path: grabs + language + '/images/modules-admin/modules-toolbar-module-tab.png', fullPage: true});
});

test('modules user menu', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 550,
    });
    await page.goto(testurl + 'option=com_modules&task=module.add&client_id=1&eid=73');
    await page.screenshot({ path: grabs + language + '/images/modules-admin/modules-user-menu-module-tab.png', fullPage: true});
});
