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

// For testing I created a Mammals article to filter the list by.
test('articles list', async ({ page, testurl, grabs, country, language }) => {
    await page.goto(testurl + 'administrator/index.php?option=com_content&view=articles');

    // Search for the selected article.
    await page.locator('#filter_search').fill(country);
    await page.locator('.filter-search-bar__button').click();

    // Wait for 3 seconds
    await page.waitForTimeout(3000);

  // Make the columns visible
  const buttons = await page.locator('.dropdown-toggle');
  const columnsButton = buttons.last();
  await columnsButton.click();

  // Uncheck some of them - Author, Association and Hits
  const columns = await page.locator('.form-check-input');
  await columns.nth(9).setChecked(false);
  await columns.nth(6).setChecked(false);
  await columns.nth(5).setChecked(false);
  await columnsButton.click();

  // Select the first checkbox in the list
  await page.locator('#cb0').click();

  // Open the drop-down list
  await page.locator('.button-status-group').click();

  await page.screenshot({ path: grabs + language + '/images/getting-started/articles-list.png'});

  const link = await page.locator('a[href*="task=article.edit"]');
  await link.first().click();

  // Wait for 3 seconds
  await page.waitForTimeout(3000);

  // Tak a screenshot
  await page.screenshot({ path: grabs + language + '/images/getting-started/article-edit-form.png', fullPage: true });

  // Find the Preview button and select it
  await page.locator('.button-preview').click();

  // Wait for 3 seconds
  await page.waitForTimeout(3000);

  await page.screenshot({ path: grabs + language + '/images/getting-started/article-edit-preview.png'});

  // Close the preview.
  await page.locator('.btn-close').first().click();

  // Close the article or it will be left checked out.
  await page.locator('.button-cancel').click();
});

/*
test('articles edit', async ({ page, testurl, grabs, language }) => {
    // Open the list page.
    await page.goto(testurl + 'administrator/index.php?option=com_content&view=articles');

    // Need to search for the specific article in the specific language:
    let article_title = 'Article (en-gb)';
    if (language === 'de') {
        article_title = 'Beitrag (de-de)';
    } else if (language === 'es') {
        article_title = 'Artículo (es-es)';
    } if (language === 'fr') {
        article_title = 'Article (fr-fr)';
    } if (language === 'it') {
        article_title = 'Articolo (it-it)';
    } if (language === 'nl') {
        article_title = 'Artikel (nl-nl)';
    } if (language === 'ptbr') {
        article_title = 'Artigo (pt-br)';
    } if (language === 'ru') {
        article_title = 'Материал (ru-ru)';
    } if (language === 'cy') {
        article_title = 'Erthygl (cy-gb)';
    }

    // Search for the selected article.
    await page.locator('#filter_search').fill(article_title);
    await page.locator('.filter-search-bar__button').click();

    // Wait for 3 seconds
    await page.waitForTimeout(3000);

    const link = await page.locator('a[href*="task=article.edit"]');
    await link.first().click();

    // Wait for 3 seconds
    await page.waitForTimeout(3000);

    // Tak a screenshot
    await page.screenshot({ path: grabs + language + '/images/getting-started/article-edit-form.png', fullPage: true });

    // Find the Preview button and select it
    await page.locator('.button-preview').click();

    // Wait for 3 seconds
    await page.waitForTimeout(3000);

    await page.screenshot({ path: grabs + language + '/images/getting-started/article-edit-preview.png'});

    // Close the preview.
    await page.locator('.btn-close').first().click();

    // Close the article or it will be left checked out.
    await page.locator('.button-cancel').click();
});
*/

// This is a frontend screenshot - admin login not needed!
// Created an article in the en-GB category and set it to be Home page
test('article mammals articles blog site view', async ({ page, testurl, grabs, language }) => {
    await page.setViewportSize({
        width: 1440,
        height: 780,
    });
    // Set the Site language for this test in the url!
    await page.goto(testurl + 'index.php/' + language);

  await page.screenshot({ path: grabs + language + '/images/getting-started/article-site-view.png', fullPage: true });
});

// Each of the language specific Home pages needs to be retitled
test('new article category', async ({ page, testurl, grabs, language }) => {
    await page.goto(testurl + 'administrator/index.php?option=com_categories&view=category&layout=edit&extension=com_content')

    // Translations
    let category_title = 'Mammals';
    let description = 'This category contains articles on mammals in general and sub-categories for articles on specific mammal types.';
    if (language === 'de') {
        category_title = 'Säugetiere';
        description = 'Diese Kategorie enthält Artikel über Säugetiere im Allgemeinen und Unterkategorien für Artikel über bestimmte Säugetierarten.';
    } else if (language === 'es') {
        category_title = 'Mamíferos';
        description = 'Esta categoría contiene artículos sobre mamíferos en general y subcategorías para artículos sobre tipos específicos de mamíferos.';
    } if (language === 'fr') {
        category_title = 'Mammifères';
        description = 'Cette catégorie contient des articles sur les mammifères en général et des sous-catégories pour des articles sur des types spécifiques de mammifères.';
    } if (language === 'it') {
        category_title = 'Mammiferi';
        description = 'Questa categoria contiene articoli sui mammiferi in generale e sottocategorie per articoli su tipi specifici di mammiferi.';
    } if (language === 'nl') {
        category_title = 'Zoogdieren';
        description = 'Deze categorie bevat artikelen over zoogdieren in het algemeen en subcategorieën voor artikelen over specifieke soorten zoogdieren.';
    } if (language === 'ptbr') {
        category_title = 'Mamíferos';
        description = 'Esta categoria contém artigos sobre mamíferos em geral e subcategorias para artigos sobre tipos específicos de mamíferos.';
    } if (language === 'ru') {
        category_title = 'Млекопитающие';
        description = 'Эта категория содержит статьи о млекопитающих в целом и подкатегории для статей о конкретных типах млекопитающих.';
    } if (language === 'cy') {
        category_title = 'Mamaliaid';
        description = 'Mae\'r categori hwn yn cynnwys erthyglau ar famaliaid yn gyffredinol ac is-gategorïau ar gyfer erthyglau ar fathau penodol o famaliaid.';
    }

    // Find the Toggle Editor button and select it
    await page.locator('.js-tiny-toggler-button').click();

    // Insert a description
    await page.locator('#jform_description').fill(description);

    // Insert a title
    await page.locator('#jform_title').fill(category_title);

    // Find the Toggle Editor button and select it
    await page.locator('.js-tiny-toggler-button').click();

    // Scroll to the top of the page
    await page.evaluate(() => window.scrollTo(0, 0));

    // Wait for 3 seconds
    await page.waitForTimeout(3000);

    // Take a screenshot
    await page.screenshot({ path: grabs + language + '/images/getting-started/article-category-edit.png', fullPage: true });

    // Close the article or it will be left checked out.
    await page.locator('.button-cancel').click();
});