const base = require('@playwright/test');

exports.test = base.test.extend({
    // Define an option and provide a default value.
    // We can later override it in the config.
    testurl: ['http://localhost/joomla-cms6/administrator/index.php?', { option: true }],
    grabs: ['/users/ceford/git/cefjdemos/manuals/help/', { option: true }],
    language: process.env.LANGUAGE ||'en',
    country: process.env.COUNTRY || 'en-GB',
    username: 'playwright',
    password: '(play1234)',
});
