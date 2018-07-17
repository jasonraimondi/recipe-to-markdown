import { AllRecipeScraper } from './site/AllRecipesComScraper';
import { HtmlScraperInterface } from './scraper/HtmlScraperInterface';

export class RecipeToMarkdownScraper {
  constructor(private readonly htmlScraper: HtmlScraperInterface) {
  }
  
  async allRecipes(recipeId: string): Promise<AllRecipeScraper> {
    const url = `https://www.allrecipes.com/recipe/${recipeId}`;
    
    try {
      const cheerioData = await this.htmlScraper.scrape(url);
      return new AllRecipeScraper(url, cheerioData);
    } catch (err) {
      console.log(err.message);
    }
  }
}

