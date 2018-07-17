export interface HtmlScraperInterface {
  scrape(url: string): Promise<CheerioStatic>;
}
