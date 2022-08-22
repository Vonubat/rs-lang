import CheckApiParams from '../utilities/check-api-params';

export default class HttpClient {
  private checkApiParams: CheckApiParams;

  constructor(checkApiParams: CheckApiParams) {
    this.checkApiParams = checkApiParams;
  }

  private responseHandler(res: Response): Response {
    if (!res.ok) {
      throw Error(res.statusText);
    }
    return res;
  }

  public async get(link: RequestInfo | URL, token: string): Promise<Response> {
    this.checkApiParams.checkTokens(token);

    const props: RequestInit = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(link, props);
    return this.responseHandler(response);
  }

  public async put(link: RequestInfo | URL, body: BodyInit | null, token: string): Promise<Response> {
    this.checkApiParams.checkTokens(token);

    const props: RequestInit = {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body,
    };
    const response = await fetch(link, props);
    return this.responseHandler(response);
  }

  public async post(link: RequestInfo | URL, body: BodyInit | null, token: string): Promise<Response> {
    this.checkApiParams.checkTokens(token);

    const props: RequestInit = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body,
    };
    const response = await fetch(link, props);
    return this.responseHandler(response);
  }

  public async delete(link: RequestInfo | URL, token: string): Promise<Response> {
    this.checkApiParams.checkTokens(token);

    const props: RequestInit = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(link, props);
    return this.responseHandler(response);
  }
}
