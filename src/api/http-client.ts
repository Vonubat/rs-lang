import Tokens from '../models/tokens';

export default class HttpClient {
  private responseHandler(res: Response): Response {
    if (!res.ok) {
      throw Error(res.statusText);
    }
    return res;
  }

  public getHeaders(token: string | null): HeadersInit {
    if (!token) {
      return {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      };
    }
    return {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
  }

  public async get(link: RequestInfo | URL): Promise<Response> {
    const props: RequestInit = {
      method: 'GET',
      headers: this.getHeaders(Tokens.getToken()),
    };
    const response = await fetch(link, props);
    return this.responseHandler(response);
  }

  public async put(link: RequestInfo | URL, body: BodyInit | null): Promise<Response> {
    const props: RequestInit = {
      method: 'PUT',
      headers: this.getHeaders(Tokens.getToken()),
      body,
    };
    const response = await fetch(link, props);
    return this.responseHandler(response);
  }

  public async post(link: RequestInfo | URL, body: BodyInit | null): Promise<Response> {
    const props: RequestInit = {
      method: 'POST',
      headers: this.getHeaders(Tokens.getToken()),
      body,
    };
    const response = await fetch(link, props);
    return this.responseHandler(response);
  }

  public async delete(link: RequestInfo | URL): Promise<Response> {
    const props: RequestInit = {
      method: 'POST',
      headers: this.getHeaders(Tokens.getToken()),
    };
    const response = await fetch(link, props);
    return this.responseHandler(response);
  }
}
