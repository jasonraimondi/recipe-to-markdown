import axios, { AxiosPromise } from 'axios';
import { RestClientInterface } from './RestClientInterface';

export class AxiosRestClient implements RestClientInterface {
  public get(
    path: string,
    params: any = {},
    headers?: any,
    timeoutSeconds?: number
  ): AxiosPromise {
    return axios.get(path, {
      headers,
      params,
      timeout: timeoutSeconds,
    });
  }
}
