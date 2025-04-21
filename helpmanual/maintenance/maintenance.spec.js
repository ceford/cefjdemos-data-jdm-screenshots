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

test.afterEach(async ({ testurl, language, country }) => {
    if (test.info().status !== test.info().expectedStatus)
    console.log(`\nTry command:\nURL=${testurl} LANGUAGE=${language} COUNTRY=${country} npx playwright test maintenance --project firefox --reporter dot -g "${test.info().title}"\n`);
  });

test('maintenance clear cache', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 500,
      });
  await page.goto(testurl + 'option=com_cache');

  await page.screenshot({ path: grabs + language + '/images/maintenance/maintenance-clear-cache.png'});
});

test('cache options', async ({ page, testurl, grabs, language }) => {
  await page.goto(testurl + 'option=com_config&view=component&component=com_cache');

  await page.screenshot({ path: grabs + language + '/images/maintenance/cache-options.png'});
});

test('maintenance database', async ({ page, testurl, grabs, language }) => {
    await page.goto(testurl + 'option=com_installer&view=database');

    await page.screenshot({ path: grabs + language + '/images/maintenance/maintenance-database.png'});
  });

test('maintenance global check in', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 400,
      });
    await page.goto(testurl + 'option=com_checkin');

    await page.screenshot({ path: grabs + language + '/images/maintenance/maintenance-global-check-in.png'});
  });

  test('check-in options', async ({ page, testurl, grabs, language }) => {
    await page.goto(testurl + 'option=com_config&view=component&component=com_checkin');

    await page.screenshot({ path: grabs + language + '/images/maintenance/check-in-options.png'});
  });

test('scheduled tasks list', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1650,
        height: 600,
    });
    await page.goto(testurl + 'option=com_scheduler&view=tasks');
    await page.screenshot({ path: grabs + language + '/images/maintenance/scheduled-tasks-list.png'});

    await page.goto(testurl + 'option=com_scheduler&view=logs&layout=default');
    await page.screenshot({ path: grabs + language + '/images/maintenance/scheduled-tasks-logs.png'});
});

test('scheduled tasks options', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 700,
    });
    await page.goto(testurl + 'option=com_config&view=component&component=com_scheduler');
    // Select the Inline Help button
    await page.locator('.button-inlinehelp').click();
    await page.screenshot({ path: grabs + language + '/images/maintenance/scheduled-tasks-options-configure-tasks.png'});

    const lazyBtn = page.locator('button[aria-controls="lazy_scheduler_config"]');
    await lazyBtn.first().click();
    await page.screenshot({ path: grabs + language + '/images/maintenance/scheduled-tasks-options-lazy-scheduler.png'});

    const webcronBtn = page.locator('button[aria-controls="webcron_config"]');
    await webcronBtn.first().click();
    await page.screenshot({ path: grabs + language + '/images/maintenance/scheduled-tasks-options-webcron.png'});
});

test('scheduled tasks types', async ({ page, testurl, grabs, language }) => {
    await page.goto(testurl + 'option=com_scheduler&view=select&layout=default');
    // Problem with hover changing background
    await page.mouse.move(0,0);
    // Wait for 3 seconds
    await page.waitForTimeout(3000);
    await page.screenshot({ path: grabs + language + '/images/maintenance/scheduled-tasks-types.png', fullPage: true});
});

test('scheduled tasks edit', async ({ page, testurl, grabs, language }) => {
    await page.goto(testurl + 'option=com_scheduler&task=task.add&type=delete.actionlogs');
    await page.screenshot({ path: grabs + language + '/images/maintenance/scheduled-tasks-types-delete-action-logs.png', fullPage: true});

    await page.goto(testurl + 'option=com_scheduler&task=task.add&type=privacy.consent');
    await page.screenshot({ path: grabs + language + '/images/maintenance/scheduled-tasks-types-privacy-consent.png', fullPage: true});

    await page.goto(testurl + 'option=com_scheduler&task=task.add&type=plg_task_requests_task_get');
    await page.screenshot({ path: grabs + language + '/images/maintenance/scheduled-tasks-types-get-request.png', fullPage: true});

    await page.goto(testurl + 'option=com_scheduler&task=task.add&type=plg_task_globalcheckin_task_get');
    await page.screenshot({ path: grabs + language + '/images/maintenance/scheduled-tasks-types-global-check-in.png', fullPage: true});

    await page.goto(testurl + 'option=com_scheduler&task=task.add&type=checkfiles.imagesize');
    await page.screenshot({ path: grabs + language + '/images/maintenance/scheduled-tasks-types-image-size-check.png', fullPage: true});

    await page.goto(testurl + 'option=com_scheduler&task=task.add&type=update.notification');
    await page.screenshot({ path: grabs + language + '/images/maintenance/scheduled-tasks-types-joomla-update-notofication.png', fullPage: true});

    // Select the Advanced tab.
    await page.locator('button[aria-controls="advanced"]').first().click();
    await page.screenshot({ path: grabs + language + '/images/maintenance/scheduled-tasks-types-advanced-tab.png', fullPage: true});

    // Select the Execution History tab.
    await page.locator('button[aria-controls="exec_hist"]').first().click();
    await page.screenshot({ path: grabs + language + '/images/maintenance/scheduled-tasks-types-exec-history-tab.png', fullPage: true});

    // Select the Details tab.
    await page.locator('button[aria-controls="details"]').first().click();
    await page.screenshot({ path: grabs + language + '/images/maintenance/scheduled-tasks-types-details-tab.png', fullPage: true});

    await page.goto(testurl + 'option=com_scheduler&task=task.add&type=rotation.logs');
    await page.screenshot({ path: grabs + language + '/images/maintenance/scheduled-tasks-types-rotate-logs.png', fullPage: true});

    await page.goto(testurl + 'option=com_scheduler&task=task.add&type=session.gc');
    await page.screenshot({ path: grabs + language + '/images/maintenance/scheduled-tasks-types-session-data-purge.png', fullPage: true});

    await page.goto(testurl + 'option=com_scheduler&task=task.add&type=plg_task_toggle_offline_set_offline');
    await page.screenshot({ path: grabs + language + '/images/maintenance/scheduled-tasks-types-set-site-offline.png', fullPage: true});

    await page.goto(testurl + 'option=com_scheduler&task=task.add&type=plg_task_toggle_offline_set_online');
    await page.screenshot({ path: grabs + language + '/images/maintenance/scheduled-tasks-types-set-site-online.png', fullPage: true});

    await page.goto(testurl + 'option=com_scheduler&task=task.add&type=plg_task_toggle_offline');
    await page.screenshot({ path: grabs + language + '/images/maintenance/scheduled-tasks-types-toggle-offline.png', fullPage: true});
});
