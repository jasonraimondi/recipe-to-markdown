import { AllRecipeScraper } from '../../src/site/AllRecipesComScraper';
import { CheerioScraper } from '../../src/scraper/CheerioScraper';
import { StubRestClient } from '../helper/StubRestClient';

let allRecipeScraper: AllRecipeScraper;

const scraper = new CheerioScraper(
  new StubRestClient()
);

describe('AllRecipeScraperTest', () => {
  beforeEach(async () => {
    const content = await scraper.scrape('allrecipe-242402.html');
    allRecipeScraper = new AllRecipeScraper('https://www.allrecipes.com/recipe/242402', content);
  });
  
  afterEach(() => {
    allRecipeScraper = null;
  });
  
  it('Allows null routeParams', async () => {
    expect(allRecipeScraper.url).toBe('https://www.allrecipes.com/recipe/242402');
    expect(allRecipeScraper.title).toBe('Greek Lemon Chicken and Potatoes');
    expect(allRecipeScraper.prepTime).toBe('10 minutes');
    expect(allRecipeScraper.cookTime).toBe('50 minutes');
    expect(allRecipeScraper.totalTime).toBe('1 hour');
    expect(allRecipeScraper.directions.length).toBe(7);
    expect(allRecipeScraper.ingredients.length).toBe(12)
  });
});
