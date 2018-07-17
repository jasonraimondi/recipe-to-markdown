import * as cheerio from 'cheerio';
import { HtmlScraperInterface } from './HtmlScraperInterface';
import { RestClientInterface } from '../rest/RestClientInterface';

export class CheerioScraper implements HtmlScraperInterface {
  constructor(private readonly restClient: RestClientInterface) {}

  async scrape(url: string): Promise<CheerioStatic> {
    try {
      const response = await this.restClient.get(url);

      if (response.data) {
        return cheerio.load(response.data);
      }

      return cheerio.load(response);
    } catch (err) {
      console.log(err.message);
    }
  }
}
