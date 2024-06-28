const base = require('@playwright/test');

exports.test = base.test.extend({
    testurl: ['http://localhost/joomla-cms6/administrator/index.php?', { option: true }],
    grabs: ['/users/ceford/git/cefjdemos/manuals/help/', { option: true }],

    // For debugging single tests use the default language.
    language: process.env.LANGUAGE || 'en',
    country: process.env.COUNTRY || 'en-GB',

    // The credentials given here are used on one local test server only used
    // by one individual. Do not use them on a public server!
    username: 'playwright',
    password: '(play1234)',
});
