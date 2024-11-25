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

test('users configuration user options', async ({ page, testurl, grabs, language }) => {
    // Go to the Users Configuration page.
    await page.goto(testurl + 'administrator/index.php?option=com_config&view=component&component=com_users');

    // Select the Allow User Registration  button
    await page.locator('#jform_allowUserRegistration1').click();

    // Wait for 3 seconds for the page to reload.
    await page.waitForTimeout(3000);

    await page.screenshot({ path: grabs + language + '/images/users/users-configuration-user-options.png', fullPage: true});

    // Select the MFA tab
    await page.locator('button[aria-controls="multifactorauth"]').first().click();

    // Toggle the inline help
    await page.locator('button.button-inlinehelp').click();

    await page.screenshot({ path: grabs + language + '/images/users/users-configuration-mfa.png', fullPage: true});
});

test('users new user', async ({ page, testurl, grabs, language }) => {
    // Go to the Users list page.
    await page.goto(testurl + 'administrator/index.php?option=com_users&view=users');

    // Select the New button
    await page.locator('.button-new').first().click();

    // Insert a Name
    await page.locator('#jform_name').fill('John Doe');

    // Insert a Username
    await page.locator('#jform_username').fill('johndoe');

    // Insert a Password
    await page.locator('#jform_password').fill('john-doe1234');

    // Insert a Confirm Password
    await page.locator('#jform_password2').fill('john-doe1234');

    // Insert Email
    await page.locator('#jform_email').fill('john.doe@example.com');

    // Scroll to the top of the page
    await page.mouse.move(0,0);

    await page.screenshot({ path: grabs + language + '/images/users/users-new-user.png', fullPage: true});

    // Close the article or it will be left checked out.
    await page.locator('.button-cancel').click();
});

test('users edit user john doe', async ({ page, testurl, grabs, language }) => {
    // Go to the Users list page.
    await page.goto(testurl + 'administrator/index.php?option=com_users&view=users');

    // Search for johndoe.
    await page.locator('#filter_search').fill('johndoe');
    await page.locator('.filter-search-bar__button').click();

    // Wait for 3 seconds
    await page.waitForTimeout(3000);

    // Edit the John Doe user page
    await page.click("text='John Doe'");

    // Insert a Password
    await page.locator('#jform_password').fill('john-doe1234');

    // Insert a Confirm Password
    await page.locator('#jform_password2').fill('john-doe1234');

    // Move mouse to the top of the page
    await page.mouse.move(0,0);

    await page.screenshot({ path: grabs + language + '/images/users/users-edit-user-john-doe.png', fullPage: true});

    // Close the article or it will be left checked out.
    await page.locator('.button-cancel').click();
});

test('users show block tooltip', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 500,
    });
    // Go to the Users list page.
    await page.goto(testurl + 'administrator/index.php?option=com_users&view=users');

    // Search for johndoe.
    await page.locator('#filter_search').fill('johndoe');
    await page.locator('.filter-search-bar__button').click();

    // Wait for 3 seconds
    await page.waitForTimeout(3000);

    // Hover to show the 'Block' tooltip.
    await page.locator('.js-grid-item-action').hover();
    await page.screenshot({ path: grabs + language + '/images/users/users-hover-block.png'});
});

test('users groups', async ({ page, testurl, grabs, language }) => {
    // Go to the Users Groups page.
    await page.goto(testurl + 'administrator/index.php?option=com_users&view=groups');

    // Select the list limit button
    await page.locator('#list_limit').selectOption({value: '10'});

    // Wait for 3 seconds for the page to reload.
    await page.waitForTimeout(3000);

    await page.screenshot({ path: grabs + language + '/images/users/access-control-users-groups-list.png', fullPage: true});
});

test('users viewing access levels', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 600,
    });
    // Go to the Users Groups page.
    await page.goto(testurl + 'administrator/index.php?option=com_users&view=levels');

    // Select the list limit button
    //await page.locator('#list_limit').selectOption({value: '10'});

    // Wait for 3 seconds for the page to reload.
    //await page.waitForTimeout(3000);

    await page.screenshot({ path: grabs + language + '/images/users/access-control-users-access-levels.png'});
});

test('global configuration permissions', async ({ page, testurl, grabs, language }) => {
    // Go to the Users Groups page.
    await page.goto(testurl + 'administrator/index.php?option=com_config');

    await page.locator('button[aria-controls="page-permissions"]').first().click();

    await page.screenshot({ path: grabs + language + '/images/users/access-control-global-configuration-permissions.png', fullPage: true});

    // Select the article administrator button
    await page.click("button:has-text('– Article Administrator')")

    await page.screenshot({ path: grabs + language + '/images/users/access-control-article-administrator-global-permissions.png', fullPage: true});
});

test('global content permissions', async ({ page, testurl, grabs, language }) => {
    // Go to the Content Options Permissions page.
    await page.goto(testurl + 'administrator/index.php?option=com_config&view=component&component=com_content');

    await page.locator('button[aria-controls="permissions"]').first().click();

    await page.screenshot({ path: grabs + language + '/images/users/access-control-global-content-permissions.png', fullPage: true});

    // Select the article administrator button
    await page.click("button:has-text('– Article Administrator')")

    await page.screenshot({ path: grabs + language + '/images/users/access-control-article-administrator-content-permissions.png', fullPage: true});
});

test('articles permissions', async ({ page, testurl, grabs, language }) => {
    // Go to the Article edit page.
    await page.goto(testurl + 'administrator/index.php?option=com_content&view=article&layout=edit');

    await page.locator('button[aria-controls="permissions"]').first().click();

    await page.screenshot({ path: grabs + language + '/images/users/access-control-article-permissions.png', fullPage: true});
});

test('users new group', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 400,
    });
    // Go to the New Group page
    await page.goto(testurl + 'administrator/index.php?option=com_users&view=group&layout=edit');

    await page.locator('#jform_title').fill('Article Administrator');

    await page.screenshot({ path: grabs + language + '/images/users/access-control-new-group.png'});

    // Close the item or it will be left checked out.
    await page.locator('.button-cancel').click();
});

test('users assign access level', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 750,
    });
    // Go to the edit viewing access level page
    await page.goto(testurl + 'administrator/index.php?option=com_users&view=levels');

    // Select the Special item
    await page.locator('a[href*="task=level.edit&id=3"]').first().click();

    // Select the User Groups With Viewing Access tab
    await page.locator('button[aria-controls="groups"]').first().click();

    await page.screenshot({ path: grabs + language + '/images/users/access-control-select-access-for-group.png'});

    // Close the item or it will be left checked out.
    await page.locator('.button-cancel').click();
});

test('user profile plugin', async ({ page, testurl, grabs, language }) => {
    // Go to the plugins page
    await page.goto(testurl + 'administrator/index.php?option=com_plugins&view=plugins');

    // Search for the TinyMCE plugin
    await page.locator('#filter_search').fill('User - Profile');
    await page.locator('.filter-search-bar__button').click();

    // Select the edit link using its link
    await page.locator('text="User - Profile"').click();

    // Wait for 3 seconds
    await page.waitForTimeout(3000);

    // Take a screenshot
    await page.screenshot({ path: grabs + language + '/images/users/user-profile-plugin.png', fullPage: true});

    // Close the plugin or it will be left checked out.
    await page.locator('.button-cancel').click();
});

test('menu item user profile', async ({ page, testurl, grabs, language }) => {
    await page.goto(testurl + 'administrator/index.php?option=com_menus&view=items&menutype=mainmenu');

    // Search for User Profile.
    await page.locator('#filter_search').fill('User Profile');
    await page.locator('.filter-search-bar__button').click();

    // Wait for 3 seconds
    await page.waitForTimeout(3000);

    // Select the edit link using its link text
    await page.locator('text="User Profile"').last().click();

    await page.screenshot({ path: grabs + language + '/images/users/user-profile-menu-item-form.png', fullPage: true});

    // Close the article or it will be left checked out.
    await page.locator('.button-cancel').click();
});

test('site user profile', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 750,
    });
    await page.goto(testurl + 'index.php/' + language  + '/login');
    await page.locator('#username').fill('johndoe');
    await page.locator('#password').fill('(johndoe123)');
    await page.click("text='Log in'");
    await page.click("text='User Profile'");
    await page.click("text='Cancel'");
    await page.screenshot({ path: grabs + language + '/images/users/user-profile-summary.png'});
});

test('site user login module', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 750,
    });
    await page.goto(testurl + 'index.php/' + language);

    // Locate the div containing an h3 with the specific text
    const divLocator = page.locator('div:has(h3:has-text("Login Form"))').last();

    // Wait for the div to be visible (optional, depending on your needs)
    await divLocator.waitFor();

    // Take a screenshot of the located div
    await divLocator.screenshot({ path: grabs + language + '/images/users/user-site-login-module.png'});
});

test('site user forgot credentials', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 750,
    });
  // Go to the user reset page
  await page.goto(testurl + 'index.php/' + language+ '?option=com_users&view=reset&layout=reset');

  await page.screenshot({ path: grabs + language + '/images/users/user-forgot-password-reset.png'});

  // Go to the confirm page
  await page.goto(testurl + 'index.php/' + language+ '?option=com_users&view=reset&layout=confirm');

  await page.screenshot({ path: grabs + language + '/images/users/user-forgot-password-confirm.png'});

  // Go to the complete page
  await page.goto(testurl + 'index.php/' + language+ '?option=com_users&view=reset&layout=complete');

  await page.screenshot({ path: grabs + language + '/images/users/user-forgot-password-complete.png'});
});

test('menu item login', async ({ page, testurl, grabs, language }) => {
    await page.goto(testurl + 'administrator/index.php?option=com_menus&view=items&menutype=0main-menu-blog');

    // Search for Login item.
    await page.locator('#filter_search').fill('Login');
    await page.locator('.filter-search-bar__button').click();

    // Wait for 3 seconds
    await page.waitForTimeout(3000);

    // Select the edit link using its link text
    await page.locator('text="Login"').last().click();

    await page.screenshot({ path: grabs + language + '/images/users/guest-access-menu-login.png', fullPage: true});

    // Select the User Options tab
    await page.locator('button[aria-controls="attrib-basic"]').first().click();

    await page.screenshot({ path: grabs + language + '/images/users/login-redirects-login-menu-options.png', fullPage: true});

    // Close the article or it will be left checked out.
    await page.locator('.button-cancel').click();
});

test('menu item logout', async ({ page, testurl, grabs, language }) => {
    await page.goto(testurl + 'administrator/index.php?option=com_menus&view=items&menutype=0main-menu-blog');

    // Search for Logout item.
    await page.locator('#filter_search').fill('Logout');
    await page.locator('.filter-search-bar__button').click();

    // Wait for 3 seconds
    await page.waitForTimeout(3000);

    // Select the edit link using its link text
    await page.locator('text="Logout"').last().click();

    await page.screenshot({ path: grabs + language + '/images/users/guest-access-menu-logout.png', fullPage: true});

    // Select the User Options tab
    await page.locator('button[aria-controls="attrib-basic"]').first().click();

    await page.screenshot({ path: grabs + language + '/images/users/login-redirects-logout-menu-options.png', fullPage: true});

    // Close the article or it will be left checked out.
    await page.locator('.button-cancel').click();
});

test('login redirects login module', async ({ page, testurl, grabs, language }) => {
    await page.goto(testurl + 'administrator/index.php?option=com_modules&view=modules&client_id=0');

    // Search for Login Form item.
    await page.locator('#filter_search').fill('Login Form');
    await page.locator('.filter-search-bar__button').click();

    // Wait for 3 seconds
    await page.waitForTimeout(3000);

    // Select the edit link using its link text
    await page.locator('text="Login Form"').last().click();

    // Toggle the inline help
    await page.locator('button.button-inlinehelp').click();

    await page.screenshot({ path: grabs + language + '/images/users/login-redirects-login-form.png', fullPage: true});

    // Close the article or it will be left checked out.
    await page.locator('.button-cancel').click();
});

test('user actions log', async ({ page, testurl, grabs, language }) => {
    await page.goto(testurl + 'administrator/index.php?option=com_actionlogs&view=actionlogs');

    await page.screenshot({ path: grabs + language + '/images/users/user-actions-log-list.png', fullPage: true});

    await page.goto(testurl + 'administrator/index.php?option=com_config&view=component&component=com_actionlogs');

    await page.screenshot({ path: grabs + language + '/images/users/user-actions-log-options.png', fullPage: true});

    await page.goto(testurl + 'administrator/index.php');

    // Locate the div containing an h2 with the specific text
    const divLocator = page.locator('div.card:has(div:has(h2:has-text("Latest Actions")))').last();

    // Wait for the div to be visible (optional, depending on your needs)
    await divLocator.waitFor();

    // Take a screenshot of the located div
    await divLocator.screenshot({ path: grabs + language + '/images/users/user-actions-log-module.png'});
});
