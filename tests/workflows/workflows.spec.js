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
    await page.goto(testurl);
    await page.locator('#mod-login-username').fill(username);
    await page.locator('#mod-login-password').fill(password);
    await page.locator('#lang').selectOption(country);
    const loginBtn = await page.locator('#btn-login-submit');
    await loginBtn.click();
});

test.afterEach(async ({ testurl, language, country }) => {
    if (test.info().status !== test.info().expectedStatus)
    console.log(`\nTry command:\nURL=${testurl} LANGUAGE=${language} COUNTRY=${country} npx playwright test workflows --project firefox --reporter dot -g "${test.info().title}"\n`);
});

test('workflows list', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 400,
    });
    await page.goto(testurl + 'option=com_workflow&view=workflows&extension=com_content.article');
    await page.screenshot({ path: grabs + language + '/images/workflows/workflows-list.png'});

    await page.goto(testurl + 'option=com_workflow&view=stages&workflow_id=1&extension=com_content');
    await page.screenshot({ path: grabs + language + '/images/workflows/stages-basic-workflow-list.png'});

    await page.goto(testurl + 'option=com_workflow&view=transitions&workflow_id=1&extension=com_content.article');
    await page.screenshot({ path: grabs + language + '/images/workflows/transitions-basic-workflow-list.png', fullPage: true});
});
