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
    // Logout sequence
    await page.locator('.header-profile').first().click();

    // Locate the anchor (<a>) containing a span with the class 'icon-power-off'
    const logoutLink = await page.locator('a:has(span.icon-power-off)');

    // Click the logout link
    await logoutLink.first().click();

    if (test.info().status !== test.info().expectedStatus)
    console.log(`\nTry command:\nURL=${testurl} LANGUAGE=${language} COUNTRY=${country} npx playwright test articles --project firefox --reporter dot -g "${test.info().title}"\n`);
});

test('articles edit content', async ({ page, testurl, grabs, language }) => {
    // Go to the Articles list page.
    await page.goto(testurl + 'administrator/index.php?option=com_content&view=articles')

    // Search for the Gibbons page
    await page.locator('#filter_search').fill('gibbons');
    await page.locator('.filter-search-bar__button').click();

    // Wait for 3 seconds
    //await page.waitForTimeout(3000);

    // Select the edit link using its text content
    await page.locator('text="Gibbons"').click();

    // Wait for 3 seconds
    await page.waitForTimeout(3000);

    await page.screenshot({ path: grabs + language + '/images/articles/articles-edit-content.png', fullPage: true });

    // Close the article or it will be left checked out.
    await page.locator('.button-cancel').click();
});

test('articles edit headings', async ({ page, testurl, grabs, language }) => {
    // Go to the Articles list page.
    await page.goto(testurl + 'administrator/index.php?option=com_content&view=articles')

    // Search for the Headings page
    await page.locator('#filter_search').fill('Headings');
    await page.locator('.filter-search-bar__button').click();

    // Select the edit link using its text content
    await page.locator('text="Headings"').click();

    // Wait for the TinyMCE iframe to load by selecting it using the iframe's id
    await page.waitForSelector('#jform_articletext_ifr'); // Replace with the actual iframe id

    const frogs = page.locator('#jform_articletext_ifr').contentFrame().getByText('frogs');
    await frogs.dblclick();

  // Screenshot shows the popup bar adjacent to frogs.
    await page.screenshot({ path: grabs + language + '/images/articles/articles-edit-headings.png', fullPage: true });

    // Close the article or it will be left checked out.
    await page.locator('.button-cancel').click();
});

test('articles edit images', async ({ page, testurl, grabs, language }) => {
    // Go to the Articles list page.
    await page.goto(testurl + 'administrator/index.php?option=com_content&view=articles')

    // Search for the Headings page
    await page.locator('#filter_search').fill('Headings');
    await page.locator('.filter-search-bar__button').click();

    // Select the edit link using its text content
    await page.locator('text="Headings"').click();

    // Find the CMS Content button and open the list.
    await page.locator('.tox-tbtn').nth(0).click();

    // Find the Media link by its label
    const media = page.locator('div.tox-collection__item-label >> text="Media"');
    await media.click();

    // Wait for 3 seconds
    await page.waitForTimeout(3000);

    // Wait for the TinyMCE iframe to load by selecting it using the iframe's id
    await page.waitForSelector('iframe.iframe-content');

    // Find the green tree frog by its label
    const greenfrog = page.locator('iframe.iframe-content').contentFrame().getByText('green-tree-frog-128.jpg');
    await greenfrog.click();

    // Find the alt text input and put some text in it.
    const alt = page.locator('iframe.iframe-content').contentFrame().getByLabel('Image Description (Alt Text)');
    // can't get this to work so given up for now
    //await alt.fill('green tree frog');

    // Screenshot shows the Media dialog.
    await page.screenshot({ path: grabs + language + '/images/articles/articles-edit-images-media.png'});

    // Close the Popup dialogue.
    await page.locator('.button-close').click();

    // Close the article or it will be left checked out.
    await page.locator('.button-cancel').click();
});

test('articles edit external images', async ({ page, testurl, grabs, language }) => {
    // Go to the Articles list page.
    await page.goto(testurl + 'administrator/index.php?option=com_content&view=articles')

    // Search for the Headings page
    await page.locator('#filter_search').fill('Headings');
    await page.locator('.filter-search-bar__button').click();

    // Select the edit link using its text content
    await page.locator('text="Headings"').click();

    // Wait for 3 seconds
    await page.waitForTimeout(3000);

    // Find the Insert button and open the list.
    await page.locator('.tox-mbtn >> text="Insert"').click();

    // Select the Image... link
    await page.locator('.tox-collection__item-label >> text="Image..."').click();

    // Wait for 3 seconds
    await page.waitForTimeout(3000);

    // Screenshot shows the Media dialog.
    await page.screenshot({ path: grabs + language + '/images/articles/articles-edit-images-external-image.png'});

    // Close the Popup dialogue.
    await page.locator('.tox-button >> text="Cancel"').click();

    // Close the article or it will be left checked out.
    await page.locator('.button-cancel').click();
});

test('articles edit images and links', async ({ page, testurl, grabs, language }) => {
    // Go to the Articles list page.
    await page.goto(testurl + 'administrator/index.php?option=com_content&view=articles')

    // Search for the Frogs page
    await page.locator('#filter_search').fill('Frogs');
    await page.locator('.filter-search-bar__button').click();

    // Select the edit link using its text content
    await page.locator('text="Frogs"').click();

    // Wait for 3 seconds
    await page.waitForTimeout(3000);

    // Find the Images and Links tab.
    await page.locator('button[aria-controls="images"]').first().click();
    await page.screenshot({ path: grabs + language + '/images/articles/articles-edit-images-and-links-tab.png', fullPage: true});

    // Close the article or it will be left checked out.
    await page.locator('.button-cancel').click();
});

test('articles edit options tab', async ({ page, testurl, grabs, language }) => {
    // Go to the Articles list page.
    await page.goto(testurl + 'administrator/index.php?option=com_content&view=articles')

    // Search for the Frogs page
    await page.locator('#filter_search').fill('Frogs');
    await page.locator('.filter-search-bar__button').click();

    // Select the edit link using its text content
    await page.locator('text="Frogs"').click();

    // Wait for 3 seconds
    await page.waitForTimeout(3000);

    // Find the Images and Links tab.
    await page.locator('button[aria-controls="attrib-attribs"]').first().click();
    await page.screenshot({ path: grabs + language + '/images/articles/articles-edit-options-tab.png'});

    // Close the article or it will be left checked out.
    await page.locator('.button-cancel').click();
});

test('articles edit publishing tab', async ({ page, testurl, grabs, language }) => {
    // Go to the Articles list page.
    await page.goto(testurl + 'administrator/index.php?option=com_content&view=articles')

    // Search for the Frogs page
    await page.locator('#filter_search').fill('Frogs');
    await page.locator('.filter-search-bar__button').click();

    // Select the edit link using its text content
    await page.locator('text="Frogs"').click();

    // Wait for 3 seconds
    await page.waitForTimeout(3000);

    // Find the Publishing tab.
    await page.locator('button[aria-controls="publishing"]').first().click();
    await page.screenshot({ path: grabs + language + '/images/articles/articles-edit-publishing-tab.png', fullPage: true});

    // Close the article or it will be left checked out.
    await page.locator('.button-cancel').click();
});

test('articles edit configure edit screen tab', async ({ page, testurl, grabs, language }) => {
    // Go to the Articles list page.
    await page.goto(testurl + 'administrator/index.php?option=com_content&view=articles')

    // Search for the Frogs page
    await page.locator('#filter_search').fill('Frogs');
    await page.locator('.filter-search-bar__button').click();

    // Select the edit link using its text content
    await page.locator('text="Frogs"').click();

    // Wait for 3 seconds
    await page.waitForTimeout(3000);

    // Find the Images and Links tab.
    await page.locator('button[aria-controls="editor"]').first().click();
    await page.screenshot({ path: grabs + language + '/images/articles/articles-edit-configure-edit-screen-tab.png', fullPage: true});

    // Close the article or it will be left checked out.
    await page.locator('.button-cancel').click();
});

test('articles edit lists', async ({ page, testurl, grabs, language }) => {
    // Go to the Articles list page.
    await page.goto(testurl + 'administrator/index.php?option=com_content&view=articles')

    // Search for the Lists page
    await page.locator('#filter_search').fill('Lists');
    await page.locator('.filter-search-bar__button').click();

    // Select the edit link using its text content
    await page.locator('text="Lists"').click();

    // Wait for the TinyMCE iframe to load by selecting it using the iframe's id
    await page.waitForSelector('#jform_articletext_ifr');

    // Find the elipsis symbol and click it
    // Label: Reveal or hide additional toolbar items
    // Using the aria-label selector
    await page.click('button[aria-label="Reveal or hide additional toolbar items"]');

    // Wait for 3 seconds
    await page.waitForTimeout(3000);

    // Screenshot shows the full tool set. Heading 2 is selected.
    await page.screenshot({ path: grabs + language + '/images/articles/articles-edit-lists.png', fullPage: true });

    // Close the article or it will be left checked out.
    await page.locator('.button-cancel').click();
});

test('articles edit pagination', async ({ page, testurl, grabs, language }) => {
    // Go to the Articles list page.
    await page.goto(testurl + 'administrator/index.php?option=com_content&view=articles')

    // Search for the Pages page
    await page.locator('#filter_search').fill('Pages');
    await page.locator('.filter-search-bar__button').click();

    // Select the edit link using its text content
    await page.locator('text="Pages"').click();

    // Find the CMS Content button and open the list.
    await page.locator('.tox-tbtn').nth(0).click();

    // Find the Page Break link by its label and click it
    await page.locator('div.tox-collection__item-label >> text="Page Break"').click();

    // Wait for 3 seconds or the dialog may not be fully formed!
    await page.waitForTimeout(3000);

    // Get the popup dialog handle
    const iframeElementHandle = await page.waitForSelector('iframe.iframe-content');

    // Get the iframe's content
    const myframe = await iframeElementHandle.contentFrame();

    // Fill the input fields
    await myframe.locator('#title').fill('Page 2');
    await myframe.locator('#alt').fill('Chapter 2');

    // Screenshot shows the Pagination dialog.
    await page.screenshot({ path: grabs + language + '/images/articles/articles-edit-pagination.png'});

    // Close the Popup dialogue.
    await page.locator('.button-close').click();

    // Open the editor Tools list
    const tools = page.locator('.tox-mbtn >> text="Tools"');
    await tools.click();

    // Select the Source code+ item and click it
    await page.locator('.tox-collection__item-label >> text="Source code+"').click();

    // Wait for 3 seconds or the dialog may not be fully formed!
    await page.waitForTimeout(3000);

    // Screenshot shows the Pagination dialog.
    await page.screenshot({ path: grabs + language + '/images/articles/articles-edit-pagination-source-code.png'});

    // Close the Popup dialogue.
    await page.locator('button.tox-button >> text="Cancel"').click();

    // Close the article or it will be left checked out.
    await page.locator('.button-cancel').click();
});

test('articles edit permissions tab', async ({ page, testurl, grabs, language }) => {
    // Go to the Articles list page.
    await page.goto(testurl + 'administrator/index.php?option=com_content&view=articles')

    // Search for the Frogs page
    await page.locator('#filter_search').fill('Frogs');
    await page.locator('.filter-search-bar__button').click();

    // Select the edit link using its text content
    await page.locator('text="Frogs"').click();

    // Wait for 3 seconds
    await page.waitForTimeout(3000);

    // Find the Permissions tab.
    await page.locator('button[aria-controls="permissions"]').first().click();

    // Find the Author tab.
    await page.locator('button[aria-controls="permission-3"]').first().click();

    await page.screenshot({ path: grabs + language + '/images/articles/articles-edit-permissions-tab.png', fullPage: true});

    // Close the article or it will be left checked out.
    await page.locator('.button-cancel').click();
});

test('articles versions', async ({ page, testurl, grabs, language }) => {
    // Go to the Articles list page.
    await page.goto(testurl + 'administrator/index.php?option=com_content&view=articles')

    // Search for the Toads page
    await page.locator('#filter_search').fill('Toads');
    await page.locator('.filter-search-bar__button').click();

    // Select the edit link using its text content
    await page.locator('text="Toads"').click();

    // Wait for 3 seconds
    await page.waitForTimeout(3000);

    // Find the Versions button in the Toolbar
    await page.click('button >> text="Versions"');

    // Wait for 3 seconds
    await page.waitForTimeout(3000);

    // Take a screenshot of the Versions popup.
    await page.screenshot({ path: grabs + language + '/images/articles/articles-versions.png'});

    // Close the Versions dialog.
    await page.locator('.button-close').click();

   // Close the article or it will be left checked out.
    await page.locator('.button-cancel').click();
});

test('articles accessibility check', async ({ page, testurl, grabs, language }) => {
    // Go to the Articles list page.
    await page.goto(testurl + 'administrator/index.php?option=com_content&view=articles')

    // Search for the Frogs page
    await page.locator('#filter_search').fill('Toads');
    await page.locator('.filter-search-bar__button').click();

    // Select the edit link using its text content
    await page.locator('text="Toads"').click();

    // Wait for 3 seconds
    await page.waitForTimeout(3000);

    // Find the Accessibility Check button in the Toolbar
    await page.click('button >> text="Accessibility Check"');

    // Wait for 3 seconds
    await page.waitForTimeout(3000);

    // Get the popup dialog handle
    const iframeElementHandle = await page.waitForSelector('iframe.iframe');

    // Get the iframe's content
    const myframe = await iframeElementHandle.contentFrame();

    // Fill the input fields
    await myframe.locator('button#toggle').click();

    // Take a screenshot of the Accessibility Check popup.
    await page.screenshot({ path: grabs + language + '/images/articles/articles-accessibility-check.png'});

    // Close the Accessibility Check dialog.
    await page.locator('div#modal-jooa11y-preview >> button.btn-close').click();

    // Wait for 3 seconds
    await page.waitForTimeout(3000);

    // Close the article or it will be left checked out.
    await page.locator('.button-cancel').click();
});

test('articles delete', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 650,
    });
    // Go to the Articles list page.
    await page.goto(testurl + 'administrator/index.php?option=com_content&view=articles')

    // Search for the Frogs page
    await page.locator('#filter_search').fill('Leaving');
    await page.locator('.filter-search-bar__button').click();

    // Select the first checkbox in the list and click it
    await page.locator('#cb0').click();

    // Find the Actions button and click it
    await page.locator('.button-status-group').click();

    // Take a screenshot.
    await page.screenshot({ path: grabs + language + '/images/articles/articles-selected-to-trash.png'});

    // Trash the article
    await page.locator('.button-trash').click();

    // Open the filters
    await page.locator('.filter-search-actions__button').first().click();

    // Select the Trashed item from the Status filter
    await page.locator('#filter_published').selectOption('-2');

    // Wait for 3 seconds
    await page.waitForTimeout(3000);

    // Take a screenshot of the trashed items list
    await page.screenshot({ path: grabs + language + '/images/articles/articles-trash-list.png'});

    // Select the first checkbox in the list and click it
    await page.locator('#cb0').click();

    // Find the Actions button and click it
    await page.locator('.button-status-group').click();

    // Find the publich button and click it.
    await page.locator('.button-publish').click();
});
