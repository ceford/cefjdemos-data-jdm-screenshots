// @ts-check
import { test } from '../jtest';

test.use({
    viewport: { width: 1440, height: 850 },
});

test.beforeAll(async ({language}) => {
    //console.log('Language: ' + language);
});

test.beforeEach(async ({ page, testurl, country, username, password }) => {

});

test.afterEach(async ({ page, testurl, language, country }) => {
    if (test.info().status !== test.info().expectedStatus)
    console.log(`\nTry command:\nURL=${testurl} LANGUAGE=${language} COUNTRY=${country} npx playwright test articles --project firefox --reporter dot -g "${test.info().title}"\n`);
});

test('articles category blog site', async ({ page, testurl, grabs, language }) => {
    // Go to the blog page.
    await page.goto(testurl + 'index.php/' + language + '/mammals-articles-blog');

    await page.screenshot({ path: grabs + language + '/images/articles/article-mammals-articles-blog-site-view.png', fullPage: true });
});

test('articles featured site', async ({ page, testurl, grabs, language }) => {
    // Go to the blog page.
    await page.goto(testurl + 'index.php/' + language + '/sample-layouts/blog');

    await page.screenshot({ path: grabs + language + '/images/articles/articles-featured-site.png', fullPage: true });
});

test('articles archived site', async ({ page, testurl, grabs, language }) => {
    // Go to the blog page.
    await page.goto(testurl + 'index.php/' + language + '/archived-articles');

    await page.screenshot({ path: grabs + language + '/images/articles/articles-archived-site.png', fullPage: true });
});

test('articles images and links site amphibians', async ({ page, testurl, grabs, language }) => {
    // Go to the blog page. http://localhost/jcms6user/index.php/en/amphibians
    await page.goto(testurl + 'index.php/' + language + '/amphibians');

    await page.screenshot({ path: grabs + language + '/images/articles/articles-site-amphibians-blog.png'});
});

test('articles images and links site frogs', async ({ page, testurl, grabs, language }) => {
    // Go to the blog page. http://localhost/jcms6user/index.php/en/amphibians/frogs
    await page.goto(testurl + 'index.php/' + language + '/amphibians/frogs');

    await page.screenshot({ path: grabs + language + '/images/articles/articles-site-amphibians-frogs.png'});
});

test('articles tables site', async ({ page, testurl, grabs, language }) => {
    await page.goto(testurl + 'index.php/' + language + '/tables');

    await page.screenshot({ path: grabs + language + '/images/articles/articles-site-tables.png'});
});

test('articles pagination site', async ({ page, testurl, grabs, language }) => {
    await page.goto(testurl + 'index.php/' + language + '/pages');

    await page.screenshot({ path: grabs + language + '/images/articles/articles-site-pagination.png'});
});
