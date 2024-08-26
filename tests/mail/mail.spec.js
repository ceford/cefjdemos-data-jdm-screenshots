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
    console.log(`\nTry command:\nURL=${testurl} LANGUAGE=${language} COUNTRY=${country} npx playwright test mail --project firefox --reporter dot -g "${test.info().title}"\n`);
  });

test('mail templates', async ({ page, testurl, grabs, language }) => {
  await page.goto(testurl + 'option=com_mails&view=templates');

  await page.screenshot({ path: grabs + language + '/images/mail/mail-templates.png', fullPage: true});
});

test('edit mail template', async ({ page, testurl, grabs, language }) => {
    await page.goto(testurl + 'option=com_mails&task=template.edit&template_id=com_actionlogs.notification&language=en-GB');

    await page.screenshot({ path: grabs + language + '/images/mail/edit-mail-template.png', fullPage: true});
  });

  test('mail template options', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 600,
      });
    await page.goto(testurl + 'option=com_config&view=component&component=com_mails');

    await page.screenshot({ path: grabs + language + '/images/mail/mail-templates-options-mails-tab.png'});
});
