export interface RestClientInterface {
  get(
    path: string,
    queryParameters?: {},
    headers?: {},
    timeoutSeconds?: number
  ): any;
}
