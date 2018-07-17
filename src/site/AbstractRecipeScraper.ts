import * as touch from 'touch';
import * as nunjucks from 'nunjucks';

import { resolve } from 'path';
import { writeFile } from 'fs';

export abstract class AbstractRecipeScraper implements RecipeScraperInterface {
  private readonly nunjucks = nunjucks;
  private readonly srcRoot = resolve(__dirname, '../');
  private readonly projectRoot = resolve(__dirname, '../../');

  abstract cookTime: string;
  abstract directions: string[];
  abstract ingredients: string[];
  abstract note: string;
  abstract prepTime: string;
  abstract recipeTitle: string;
  abstract totalTime: string;
  abstract url: string;

  get render(): string {
    return this.nunjucks.render(
      `${this.srcRoot}/templates/recipe-template.njk`,
      {
        url: this.url,
        recipeTitle: this.recipeTitle,
        ingredients: this.ingredients,
        directions: this.directions,
        prepTime: this.prepTime,
        totalTime: this.totalTime,
        cookTime: this.cookTime,
      }
    );
  }

  write(): void {
    const renderFile = `${this.projectRoot}/recipes/${this.slugify(
      this.recipeTitle
    )}.md`;

    touch(renderFile);

    writeFile(renderFile, this.render, err => {
      if (err) {
        throw err;
      }

      console.log('Saved!');
    });
  }

  private slugify(text) {
    return text
      .toString()
      .toLowerCase()
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(/[^\w\-]+/g, '') // Remove all non-word chars
      .replace(/\-\-+/g, '-') // Replace multiple - with single -
      .replace(/^-+/, '') // Trim - from start of text
      .replace(/-+$/, ''); // Trim - from end of text
  }
}

export interface RecipeScraperInterface {
  recipeTitle: string;
  ingredients: string[];
  directions: string[];
  prepTime: string;
  cookTime: string;
  totalTime: string;
  note: string;
  url: string;
}
