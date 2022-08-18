import Tokens from '../models/tokens';

export default class HttpClient extends Tokens {
  private static responseHandler(res: Response): Response {
    if (!res.ok) {
      throw Error(res.statusText);
    }
    return res;
  }

  public static getHeaders(token: string | null): HeadersInit {
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

  public static async get(link: RequestInfo | URL): Promise<Response> {
    const props: RequestInit = {
      method: 'GET',
      headers: HttpClient.getHeaders(Tokens.getToken()),
    };
    const response = await fetch(link, props);
    return HttpClient.responseHandler(response);
  }

  public static async put(link: RequestInfo | URL, body: BodyInit | null): Promise<Response> {
    const props: RequestInit = {
      method: 'PUT',
      headers: HttpClient.getHeaders(Tokens.getToken()),
      body,
    };
    const response = await fetch(link, props);
    return HttpClient.responseHandler(response);
  }

  public static async post(link: RequestInfo | URL, body: BodyInit | null): Promise<Response> {
    const props: RequestInit = {
      method: 'POST',
      headers: HttpClient.getHeaders(Tokens.getToken()),
      body,
    };
    const response = await fetch(link, props);
    return HttpClient.responseHandler(response);
  }

  public static async delete(link: RequestInfo | URL): Promise<Response> {
    const props: RequestInit = {
      method: 'POST',
      headers: HttpClient.getHeaders(Tokens.getToken()),
    };
    const response = await fetch(link, props);
    return HttpClient.responseHandler(response);
  }
}
