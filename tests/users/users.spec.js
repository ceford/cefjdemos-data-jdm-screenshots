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
    console.log(`\nTry command:\nLANGUAGE=${language} COUNTRY=${country} npx playwright test users --project firefox --reporter dot -g "${test.info().title}"\n`);
});

// Take care to limit the displayed list to a single john doe user
test('users list', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 500,
    });
    await page.goto(testurl + 'option=com_users&view=users');
    await page.locator('#filter_search').fill('johndoe');
    await page.locator('.filter-search-bar__button').click();

    await page.screenshot({ path: grabs + language + '/images/users/users-list.png'});

    // Open the edit page for John Doe
    await page.getByRole('link',{name: "John Doe"}).first().click();

    // Grab the Account Details tab
    await page.screenshot({ path: grabs + language + '/images/users/users-edit-account-details-tab.png', fullPage: true});

    // Grab the Assigned User Groups tab
    await page.locator('button[aria-controls="groups"]').first().click();
    await page.screenshot({ path: grabs + language + '/images/users/users-edit-assigned-user-groups-tab.png', fullPage: true});

    // Grab the Basic Settings tab
    await page.locator('button[aria-controls="attrib-settings"]').first().click();
    await page.screenshot({ path: grabs + language + '/images/users/users-edit-basic-settings-tab.png', fullPage: true});

    // Grab the Accessibility Settings tab
    await page.locator('button[aria-controls="attrib-accessibility"]').first().click();
    await page.screenshot({ path: grabs + language + '/images/users/users-edit-accessibility-settings-tab.png', fullPage: true});

    // Grab the Multi-factor Authentication tab
    await page.locator('button[aria-controls="multifactorauth"]').first().click();
    await page.screenshot({ path: grabs + language + '/images/users/users-edit-multi-factor-authentication-tab.png', fullPage: true});

    // Close the item or it will be left checked out.
    await page.locator('.button-cancel').click();
});

test('users permissions for user', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1500,
        height: 750,
    });
    await page.goto(testurl + 'option=com_users&view=users');
    await page.locator('#filter_search').fill('johndoe');
    await page.locator('.filter-search-bar__button').click();

    // Open the Permissions page for John Doe
    const user_id = await page.locator('#cb0').inputValue();
    await page.goto(testurl + 'option=com_users&view=debuguser&user_id=' + user_id);
    await page.screenshot({ path: grabs + language + '/images/users/users-permissions-for-user.png', fullPage: true});

    // Close the item or it will be left checked out.
    await page.locator('.button-cancel').click();
});

test('users mass mail users', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 500,
    });
    await page.goto(testurl + 'option=com_users&view=mail');
    await page.screenshot({ path: grabs + language + '/images/users/mass-mail-users.png', fullPage: true});

    // Close the item or it will be left checked out.
    await page.locator('.button-cancel').click();
});

test('users groups', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 500,
    });
    await page.goto(testurl + 'option=com_users&view=groups');
    await page.screenshot({ path: grabs + language + '/images/users/users-groups-list.png', fullPage: true});

    // Find the New button.
    await page.locator('.button-new').click();
    await page.screenshot({ path: grabs + language + '/images/users/users-new-group-details-tab.png', fullPage: true});

    // Close the item or it will be left checked out.
    await page.locator('.button-cancel').click();
});

test('users permissions for group', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 750,
    });
    await page.goto(testurl + 'option=com_users&view=debuggroup&group_id=2');
    await page.screenshot({ path: grabs + language + '/images/users/users-permissions-for-group.png', fullPage: true});

    // Close the item or it will be left checked out.
    await page.locator('.button-cancel').click();
});

test('users viewing access levels', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 600,
    });
    await page.goto(testurl + 'option=com_users&view=levels');
    await page.screenshot({ path: grabs + language + '/images/users/users-viewing-access-levels.png'});

    // Open item #1 for editing.
    await page.getByRole('link',{name: 'public'}).first().click();
    await page.screenshot({ path: grabs + language + '/images/users/users-edit-viewing-access-level-details-tab.png'});

    // Grab the User Groups With Viewing Access tab
    await page.locator('button[aria-controls="groups"]').first().click();
    await page.screenshot({ path: grabs + language + '/images/users/users-edit-viewing-access-level-ugwva-tab.png', fullPage: true});

    // Close the item or it will be left checked out.
    await page.locator('.button-cancel').click();
});

// Create a user note for John Doe before using this text
test('users user notes', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 600,
    });
    await page.goto(testurl + 'option=com_users&view=notes');
    await page.screenshot({ path: grabs + language + '/images/users/users-user-notes-list.png'});

    // Open item #1 for editing.
    const user_id = await page.locator('#cb0').inputValue();
    await page.goto(testurl + 'option=com_users&task=note.edit&id=' + user_id);
    await page.screenshot({ path: grabs + language + '/images/users/users-user-notes-new-or-edit.png'});

    // Close the item or it will be left checked out.
    await page.locator('.button-cancel').click();
});

test('users user notes categories', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 600,
    });
    await page.goto(testurl + 'option=com_categories&view=categories&extension=com_users');
    await page.screenshot({ path: grabs + language + '/images/users/users-user-notes-categories-list.png'});

    // Open item #1 for editing.
    const id = await page.locator('#cb0').inputValue();
    await page.goto(testurl + 'option=com_categories&task=category.edit&id=' + id + '&extension=com_users');
    await page.screenshot({ path: grabs + language + '/images/users/users-user-notes-edit-category.png', fullPage: true});

    // Close the item or it will be left checked out.
    await page.locator('.button-cancel').click();
});

test('users user actions log', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 600,
    });
    await page.goto(testurl + 'option=com_actionlogs&view=actionlogs');

    // Show only results related to John Doe
    await page.locator('#filter_search').fill('johndoe');
    await page.locator('.filter-search-bar__button').click();

    await page.screenshot({ path: grabs + language + '/images/users/user-actions-log-list.png', fullPage: true});
});

test('users user actions log options', async ({ page, testurl, grabs, language }) => {
    await page.goto(testurl + 'option=com_config&view=component&component=com_actionlogs');

    await page.screenshot({ path: grabs + language + '/images/users/user-actions-log-options-options-tab.png', fullPage: true});
  });

test('users options', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 600,
    });
    await page.goto(testurl + 'option=com_config&view=component&component=com_users');

    // Grab the User Options tab
    await page.screenshot({ path: grabs + language + '/images/users/users-options-user-options-tab.png', fullPage: true});

    // Grab the Email Domain Options tab
    await page.locator('button[aria-controls="domain_options"]').first().click();
    await page.screenshot({ path: grabs + language + '/images/users/users-options-email-domain-options-tab.png'});

    // Grab the Password Options tab
    await page.locator('button[aria-controls="password_options"]').first().click();
    await page.screenshot({ path: grabs + language + '/images/users/users-options-password-options-tab.png', fullPage: true});

    // Grab the Multi-factor Authentication tab
    await page.locator('button[aria-controls="multifactorauth"]').first().click();
    await page.screenshot({ path: grabs + language + '/images/users/users-options-multi-factor-authentication-tab.png', fullPage: true});

    // Grab the User Notes History tab
    await page.locator('button[aria-controls="user_notes_history"]').first().click();
    await page.screenshot({ path: grabs + language + '/images/users/users-options-user-notes-history-tab.png'});

    // Grab the Mass Mail Users tab
    await page.locator('button[aria-controls="massmail"]').first().click();
    await page.screenshot({ path: grabs + language + '/images/users/users-options-mass-mail-users-tab.png'});

    // Grab the Integration tab
    await page.locator('button[aria-controls="integration"]').first().click();
    await page.screenshot({ path: grabs + language + '/images/users/users-options-integration-tab.png'});
});
