Install Joomla for Testing
==========================

Clone Joomla, Checkout latest 6 version (6.0.0alpha-dev)

### Create Fields

About the Author / A brief biography / A brief biography Rows 3
Article Sources / Brief list of sources for this article / Rows 3

### Install languages

de, es, fr, nl, pt-br, ru

Enable in Content Languages

Enable the System Language Filter plugin

Install the Multi-lingual sample data

Enable the schema plugin

Some shots may need to be obtained manually:
Turn on the Workflow option (Integration tab), capture this:
articles-edit-category-workflow-tab.png
Then turn it off again

## Playwright

This is the Super User for tests
    username: 'playwright',
    password: '(play1234)',

## Oddjob

Create group Oddjob with Special access.
Create user Oddjob / oddjob / (oddjob1%)

## Articles Associationa

Create 3 Articles - Lorem Ipsum (en-GB), Lorem Ipsum (de-DE), Lorem Ipsum (fr-FR)
Associate en-GB and de-DE (follow instructions in Common Elements / Edit
Associations)

## Banners

Create a new Client
* Title: JDM International
* Contact name: The CEO

Create a new Banner:
* Title Joomla Shop
* URL https://community.joomla.org/the-joomla-shop.html#!/
* Client: JDM International

Create a Module
* Title: Joomla Shop
* Position: bottom-a

Reload site page several times to increase impression count. Click banner a few
times to increase Clicks count.

## Contacts

Create two contacts
Jim Hawkins / Cabin Boy / jim.hawkins@example.com /
Admiral Benbow Inn / Bristol / England
Long John Silver / Cook / ljs@example.com / The Hispaniola

## Snippets for Playwright
For testing:
    test.setTimeout(10000);

    page.on('console', (msg) => {
        console.log(msg);
      });
    console.log('some text or ...')

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

=====

To update node: https://blog.hubspot.com/website/update-node-js

node -v
npm cache clean --force
npm install -g n
n latest
node -v
npm outdated

=====

Message to Harald,

Hello Harald,

Since your message I looked up Cypress vs Playright and decided to give the latter a try. After much frustration I am finally getting somewhere and now completely agree that scripting the screenshots is the best way forward.

Do you have a view on a screen resolution to use for capture? In the past I have limited screenshots to 1000 pixels wide and more recently 1200. Now I am inclined to go to 1400 or 1440 as 1400 is one of the Bootstrap breakpoints.

I estimate that there are a little over 700 Help screenshots. With 1440 width and an average size of about 100Kb that would be about 70Mb in total for English alone.

I think it would be best to use a standard data set for capture. Perhaps the Multilingual sample data. And mostly with Workflow turned off. Do you have a view on that?

Some interesting problems have turned up. The Firefox browser works quite well but a screenshot of a modal dialog (batch for example) does not render the background so it is illegible. The Chromium browser will not render a screenshot with a modal dialog at all. Webkit (Safari) does everything well but ignores the viewport setting and uses my screen resolution.