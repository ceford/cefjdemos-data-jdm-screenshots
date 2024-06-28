# Joomla Help Screenshots

This repo contains code to capture screenshots using Playwright for use in
Joomla Help pages. There are 200+ Help pages and 700+ screenshots for each
language in the existing Joomla 4 and 5 Help system. There may be fewer in 
future versions.

This is a work in progress, started in June 2024 and expected to take
weeks or months to complete. Not so much in the collection of the screenshots 
but in revision of the text that uses them.

The screenshots are divided into the headings used in Jdocmanual 
(https://jdocmanual.org/jdocmanual?manual=help) and will be displayed there
as each heading group is completed. This code captures a single screenshot
which is later used to create a group of responsive images in .png and .webp
formats and sizes.

So far the following heading groups have been completed (4 of 40):

* Help Screens
* Articles
* Banners
* Common Elements (but added to from time to time).

## Test Files and Directories

Each screenshot capture script has a name of the form *banners.spec.js* in a 
directory with the same name as the first part of the script name, *banners*
in this example. Scripts can be split and that may be done in some cases.

The root of the repo has shell scripts used to generate images in batches.
For example, sh-banners.sh is a shell script to capture all of the screenshots
in a group in several languages, currently 8.

Shell scripts of the form runlang-en.sh capture all of the screenshots in all
of the groups in a single language.

## Configuration

**Terminology:** the unit of code that leads to a screenshot is known as a 
**Test**.

The tests directory contains a file named jtests.js. It contains parameters 
that need to be set to suite the site from which images are captured. They 
include:

* The URL of the site used for capture.
* A location for storage of the captured screenshots.
* Login credentials for a test Super User.

## Running Tests

For developing tests I use **VSCode** or **VScodium** with the **Playwright 
Test for VSCode** extension. Each test has an icon adjacent the line number 
at the start of the test section. Select to run the test in English.

All the tests in a test file can be run from the command line, for example:
```
LANGUAGE=en COUNTRY=en-GB  npx playwright test articles --project firefox --reporter dot
```
The shell batch files use this format to combine tests for production.

The test files contain some code to indicate which tests are running and 
whether there are any problems. Sometimes a single test in one file does not
succeed on one occasion but does on another. For example, if I have an edit
page open in my browser, a test to take a screenshot of that page will fail
because the page is checked out.

The repo name is cefjdemos-data-jdm-screenshots
