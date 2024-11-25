const base = require('@playwright/test');

exports.test = base.test.extend({
    // Where to store the screenshots.
    grabs: ['/users/ceford/git/cefjdemos/manuals/help/', { option: true }],

    // The URL to use for default English screenshots.
    testurl: process.env.URL || 'http://localhost/jcms6de/administrator/index.php?',

    // The command line to use:
    // URL=http://localhost/jcms6de/administrator/index.php? LANGUAGE=en COUNTRY=en-GB  npx playwright test --project firefox --reporter dot

    // For debugging single tests use the default language.
    language: process.env.LANGUAGE || 'en',
    country: process.env.COUNTRY || 'en-GB',

    // The credentials given here are used on one local test server only used
    // by one individual. Do not use them on a public server!
    username: 'playwright',
    password: '(play123456)',
});
