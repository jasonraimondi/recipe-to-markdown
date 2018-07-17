import { readFileSync } from 'fs';
import { resolve } from 'path';

import { RestClientInterface } from '../../src/rest/RestClientInterface';

export class StubRestClient implements RestClientInterface {
  private responsesRoot = resolve(__dirname, './responses');
  
  get(fileName: string) {
    try {
      return readFileSync(`${this.responsesRoot}/${fileName}`, 'utf8');
    } catch (e) {
      console.log('Error:', e.stack);
    }
  }
}
