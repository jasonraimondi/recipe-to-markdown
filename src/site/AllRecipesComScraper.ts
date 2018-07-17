import { end, parse, pattern, toSeconds } from 'iso8601-duration';
import { AbstractRecipeScraper } from './AbstractRecipeScraper';

export interface TimeInterval {
  weeks: number;
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export class AllRecipeScraper extends AbstractRecipeScraper {
  constructor(
    public readonly url: string,
    private readonly cheerio: CheerioStatic
  ) {
    super();
  }

  get title(): string {
    return this.cheerio('#recipe-main-content')
      .text()
      .trim();
  }

  get directions(): string[] {
    return this.cheerio('.recipe-directions__list--item')
      .map((i, element) => {
        return this.cheerio(element)
          .text()
          .trim();
      })
      .get();
  }

  get ingredients(): string[] {
    let ingredients = [];
    let ingredientTitle = '';
    this.cheerio('[id^=lst_ingredients_]').map((i, element) => {
      ingredientTitle = this.cheerio(element)
        .find('recipe-ingred_txt')
        .first()
        .text()
        .trim();
      this.cheerio(element)
        .find('[itemprop="ingredients"]')
        .each((ix, elementx) => {
          const ingredient = this.cheerio(elementx)
            .text()
            .trim();
          ingredients.push([ingredientTitle, ingredient]);
        })
        .get();
    });

    return ingredients;
  }

  get note(): string {
    return '';
  }

  get prepTime(): string {
    const prepTimeInterval = this.cheerio('[itemprop="prepTime"]').attr(
      'datetime'
    );
    const prepTime: TimeInterval = parse(prepTimeInterval);
    return this.timeToString(prepTime);
  }

  get cookTime(): string {
    const cookTimeInterval = this.cheerio('[itemprop="cookTime"]').attr(
      'datetime'
    );
    const cookTime: TimeInterval = parse(cookTimeInterval);
    return this.timeToString(cookTime);
  }

  get totalTime(): string {
    const totalTimeInterval = this.cheerio('[itemprop="totalTime"]').attr(
      'datetime'
    );
    const totalTime: TimeInterval = parse(totalTimeInterval);
    return this.timeToString(totalTime);
  }

  get recipeTitle(): string {
    return this.cheerio('#recipe-main-content')
      .text()
      .trim();
  }

  private timeToString(timeInterval: TimeInterval): string {
    let timeString: string = '';

    if (timeInterval.days !== 0) {
      if (timeString === '') {
        timeString = `${this.pluralize('day', timeInterval.days)}`;
      } else {
        timeString =
          timeString + ` ${this.pluralize('day', timeInterval.days)}`;
      }
    }

    if (timeInterval.hours !== 0) {
      if (timeString === '') {
        timeString = `${this.pluralize('hour', timeInterval.hours)}`;
      } else {
        timeString =
          timeString + ` ${this.pluralize('hour', timeInterval.hours)}`;
      }
    }

    if (timeInterval.minutes !== 0) {
      if (timeString === '') {
        timeString = `${this.pluralize('minute', timeInterval.minutes)}`;
      } else {
        timeString =
          timeString + ` ${this.pluralize('minute', timeInterval.minutes)}`;
      }
    }

    return timeString;
  }

  private pluralize(word: string, count: number) {
    return `${count} ${word}${count === 1 ? '' : 's'}`;
  }
}
