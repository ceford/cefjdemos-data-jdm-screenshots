# Joomla Help Screenshots

This repo contains code to capture screenshots using Playwright for use in
Joomla Help pages. There are 200+ Help pages and 700+ screenshots for each
language in the existing Joomla 4 and 5 Help system. There may be fewer in
future versions.

This is a work in progress, started in June 2024 and expected to take
weeks or months to complete. Not so much in the collection of the screenshots
but in revision of the text that uses them.

The screenshots are divided into the headings used in Jdocmanual
(https://jdocmanual.org/jdocmanual?manual=help) and will be displayed there.
This code captures a single screenshot which is later used to create a group
of responsive images in .png and .webp formats and sizes.

## Test Files and Directories

Each screenshot capture script has a name of the form *banners.spec.js* in a
directory with the same name as the first part of the script name, *banners*
in this example. Scripts can be split and that may be done in some cases.

## Configuration

**Terminology:** the unit of code that leads to a screenshot is known as a
**Test**.

The tests directory contains a file named jtests.js. It contains parameters
that need to be set to suit the site from which images are captured. They
include:

* The URL of the site used for capture.
* A location for storage of the captured screenshots.
* Login credentials for a test Super User.

## Running Tests

For developing tests use **VScodium** with the **Playwright
Test for VSCode** extension. Each test has an icon adjacent to the line number
at the start of the test section. Select to run the test in English.

All the tests in a test file can be run from the command line, for example:
```
URL=http://localhost/jcms6de/administrator/index.php? LANGUAGE=en COUNTRY=en-GB \
npx playwright test --project firefox --reporter dot
```

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

