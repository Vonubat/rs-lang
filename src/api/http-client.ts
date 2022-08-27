import Credentials from '../services/auth/credentials';
import CheckApiParams from '../utilities/check-api-params';

export default class HttpClient extends CheckApiParams {
  public async get(link: RequestInfo | URL, token: string = Credentials.getToken()): Promise<Response> {
    this.checkTokens(token);

    const props: RequestInit = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };
    const response: Response = await fetch(link, props);
    return response;
  }

  public async put(
    link: RequestInfo | URL,
    body: BodyInit | null,
    token: string = Credentials.getToken()
  ): Promise<Response> {
    this.checkTokens(token);

    const props: RequestInit = {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body,
    };
    const response: Response = await fetch(link, props);
    return response;
  }

  public async post(
    link: RequestInfo | URL,
    body: BodyInit | null,
    token: string = Credentials.getToken()
  ): Promise<Response> {
    this.checkTokens(token);

    const props: RequestInit = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body,
    };
    const response: Response = await fetch(link, props);
    return response;
  }

  public async delete(link: RequestInfo | URL, token: string = Credentials.getToken()): Promise<Response> {
    this.checkTokens(token);

    const props: RequestInit = {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };
    const response: Response = await fetch(link, props);
    return response;
  }
}
