import { RecipeToMarkdownScraper } from './RecipeToMarkdownScraper';
import { AxiosRestClient } from './rest/AxiosRestClient';
import { CheerioScraper } from './scraper/CheerioScraper';

const recipeId = process.argv[2];

if (recipeId == null) {
  throw Error('A single argument is required for the AllRecipe ID.');
}

const rescraper = new RecipeToMarkdownScraper(
  new CheerioScraper(
    new AxiosRestClient()
  )
);

rescraper.allRecipes(recipeId).then(scraper => {
  scraper.write();
});
