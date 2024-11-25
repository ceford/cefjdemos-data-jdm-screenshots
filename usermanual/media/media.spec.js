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

test('media', async ({ page, testurl, grabs, language }) => {
    // Go to the media page
    await page.goto(testurl + 'administrator/index.php?option=com_media'); //&path=local-images:/sampledata/cassiopeia');

     // Go to the sample data tab
    await page.locator('a:has(span:has-text("sampledata"))').click();

    // Click the garbage folder
    await page.locator('div.media-browser-item-directory:has(div:has-text("garbage"))').click();

    // Wait for 3 seconds
    await page.waitForTimeout(3000);

    // Take a screenshot
    await page.screenshot({ path: grabs + language + '/images/media/media-sample-data-garbage-select.png'});

    await page.locator('a:has(span:has-text("cassiopeia"))').click();

    // Wait for 3 seconds
    await page.waitForTimeout(3000);

    // Take a screenshot
    await page.screenshot({ path: grabs + language + '/images/media/media-sample-data-cassiopeia.png'});
});

test('media crop resize', async ({ page, testurl, grabs, language }) => {
    // Go to the media page
    await page.goto(testurl + 'administrator/index.php?option=com_media&view=file&mediatypes=0,1,2,3&path=local-images:/mammals/serengeti.jpg');

    // Change the jform_aspectRatio to None
    await page.locator('#jform_aspectRatio').selectOption('1.7777777777777777');

    // Set the input values for cropping
    // Keep the settings in this order or they do not stick in Playwright
    await page.locator('#jform_crop_height').fill('522');
    await page.locator('#jform_crop_x').fill('416');
    await page.locator('#jform_crop_y').fill('436');
    await page.locator('#jform_crop_width').fill('928');

    // Take a screenshot
    await page.screenshot({ path: grabs + language + '/images/media/media-crop-serengeti.png'});
});

test('media options', async ({ page, testurl, grabs, language }) => {
    // Go to the media page
    await page.goto(testurl + 'administrator/index.php?option=com_config&view=component&component=com_media');

    // Toggle the inline help
    await page.locator('button.button-inlinehelp').click();

    // Take a screenshot
    await page.screenshot({ path: grabs + language + '/images/media/media-options.png', fullPage: true});
});
