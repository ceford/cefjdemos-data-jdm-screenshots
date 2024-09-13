# Method to capture Help screenshots

## Joomla Installations

Create a separate Joomla installation for each supported language. Each should
be named jcms6xx where xx is the language code. jcms6de may be used to capture
screens for both English and German.

Go to the GitHub [Joomla repo](https://github.com/joomla/joomla-cms) and select
the 6.0-dev branch. Scroll down to the *Steps to setup the local environment:*
heading and follow the instructions to clone Joomla and set up a working site.
Rename the site from joomla-cms to jcms6xx and use a database with a
corresponding name. Do not use this site for anything other than screenshot
capture.

The method adopted mostly uses Multilingual Sample Data and Testing Sample Data
but some preparation is needed first. This could be scripted!

## Prepare a Joomla installation for Screen Capture

1.  Install Joomla - set admin user name to Superman
    Set the Cookie Path to /jcms6xx
    Set default list limit to 5.
2.  Create Super User Playwright playwright (play123456)
3.  Create a private message from Superman to Playwright:
    Subject: Demonstration; Text: This is a demonstration Private Message.
4.  Create group Oddjob with Special access.
    Create user Oddjob / oddjob / (oddjob123%) in Group Oddjob (not Registered)
    Edit Global Configuration: set Administrator login to Allowed for Oddjob
    Edit Media / Options: set Access Admin Interface, Create, Delete and Edit
    to Allowed.
5.  Create user John Doe for user tests:
    John Doe / johndoe / (johndoe123) / johndoe@example.com
6.  Create a user note for John Doe:
    Demonstration / Uncategorised / John Doe is a pseudonym for an unknown person.
10. Enable the System - Privacy Consent plugin.
    Login to frontend as johndoe and confirm privacy consent. Then logout.
    There may be a problem that shows the Subject as PLG_SYSTEM_PRIVACYCONSENT_SUBJECT
    instead of *Privacy Policy* in the Privacy Consents list. It is due to this
    code missing from:
    `plugins/system/privacyconsent/src/Extension/PrivacyConsent.php` from line 33.
```
    /**
     * Load the language file on instantiation.
     *
     * @var    boolean
     * @since  3.9.0
     */
    protected $autoloadLanguage = true;
```
11. Create a Privacy Request. Login to backend as the playwright user:
    create a request for johndoe@example.com / Export
    Logout and login again as your normal Super Admin user.
12. The System - Schema.org Plugin needs to be enabled and have a
    name inserted in the Name field, for example: Joomla Documentation Team
13. Enable the System - Redirect Plugin and go to System / Redirects to create
    a New redirect:
    Expired URL: about-me.html New URL: https://example.com/about-others.html
    Comment: An example redirect.
14. Create two Content Fields:
    About the Author / Textarea / Brief biography. / 4 Rows
    Article Sources / Textarea / List of sources for this article. / 4 Rows
15. Create an Article Field Group: Nature / For fields about the natural world.
16. Install the Weblinks component
    First time try did not work - needed to create the table by
    extracting sql from zip file. But next time it installed without problems.
    Create a Category (Uncategorised) if not present and then a link:
    Joomla Magazine Tutorials / https://docs.joomla.org/J4.x:Magazine_Articles
    A list of articles with tutorial content for Joomla 4 and 5.
17. Install the Joomla Patchtester (there is an Options Help screen).
18. OPTION: install Akeeba Backup and take a backup to use for more installations.
    ???? Then uninstall Akeeba Backup to save space in Admin menu.

19. Install One Language: de or fr or nl (separate installs for each language)
    Currently installing in J6 by file upload.
20. Publish Content Language
21. Install Multilingual Sample Data
22. Install Testing Sample Data (NOT Blog Sample Data).
23. Run the Smart Search Indexer
    Create a Smart Search Filter as the Superman Super User
    Articles by Joomla / Articles / Author: Joomla
    In Smart Search Options set Gather Search Statistics to Yes.
    In the frontend sidebar-left is a Smart Search Component item.
    Search for some terms (lorem, animals, apples, english)
24. Banners / Options /
    Track Impressions = Yes
    Track Clicks = Yes
    In the Banner list, edit each item:
    Set Shop 1 Banner Details / Client to Bookstore
    Set Shop 2 Banner Details / Client to Shop
    Set Support Joomla Banner Details / Client to Joomla
    In the frontend Reload some pages a few times and click the
    Support Joomla Banner at the page bottom to generate some hits.

## Ready to run the Playwright tests

Configure jtest.js to suit the local installation.

Use VSCodium with the Playwright Test for VSCode extension installed. Open the
Playwright folder and then try individual tests by clicking the tiny green
tick to the left of the test title.

In the Playwright folder use the following command line for all tests:
URL=http://localhost/jcms6de/administrator/index.php? LANGUAGE=en COUNTRY=en-GB \
npx playwright test --project firefox --reporter dot

Or this for all tests in a folder:
URL=http://localhost/jcms6de/administrator/index.php? LANGUAGE=de COUNTRY=de-DE \
npx playwright test articles --project firefox --reporter dot

Or this for one test in a folder:
ceford@cliff Playwright % LANGUAGE=en COUNTRY=en-GB \
npx playwright test menu-items --project firefox --reporter dot -g "privacy create request"

You can use --reporter html to have a html report named index.html located in the
playwright-report folder.

The test files contain some code to indicate which tests are running and
whether there are any problems. Sometimes a single test in one file does not
succeed on one occasion but does on another. For example, if I have an edit
page open in my browser, a test to take a screenshot of that page will fail
because the page is checked out.

The output looks like this:

```
Try command:
URL=http://localhost/jcms6fr/administrator/index.php? LANGUAGE=fr COUNTRY=fr-FR npx playwright test fields --project firefox --reporter dot -g "field groups list"
```
You can copy the command and run it again from the command line. Look at the
output to see where the failure occurred. Here is an example:

```
  1) [firefox] › fields/fields.spec.js:62:5 › field groups list ────────────────────────────────────

    Test timeout of 30000ms exceeded.

    Error: locator.inputValue: Test timeout of 30000ms exceeded.
    Call log:
      - waiting for locator('#cb0')


      70 |
      71 |     // Open the first item in the list
    > 72 |     const item_id = await page.locator('#cb0').inputValue();
         |                                                ^
      73 |     const url = testurl + 'option=com_fields&task=group.edit&id=' + item_id + '&context=com_content.article';
      74 |     await page.goto(url);
      75 |

        at /Users/ceford/Playwright/tests/fields/fields.spec.js:72:48
```

## Playwright installation notes

✔ Success! Created a Playwright Test project at /Users/ceford/Playwright

Inside that directory, you can run several commands:

  npx playwright test
    Runs the end-to-end tests.

  npx playwright test --ui
    Starts the interactive UI mode.

  npx playwright test --project=chromium
    Runs the tests only on Desktop Chrome.

  npx playwright test example
    Runs the tests in a specific file.

  npx playwright test --debug
    Runs the tests in debug mode.

  npx playwright codegen
    Auto generate tests with Codegen.

We suggest that you begin by typing:

    npx playwright test

And check out the following files:
  - ./tests/example.spec.js - Example end-to-end test
  - ./tests-examples/demo-todo-app.spec.js - Demo Todo App end-to-end tests
  - ./playwright.config.js - Playwright Test configuration

Visit https://playwright.dev/docs/intro for more information. ✨

Happy hacking! 🎭

## Node

To update node: https://blog.hubspot.com/website/update-node-js

node -v
npm cache clean --force
npm install -g n
n latest
node -v
npm outdated
