export default class HttpClient {
  private static responseHandler(response: Response) {
    if (response.ok) {
      return response;
    }
    // TODO: what should we do with other code responses?
    return null;
  }

  public static async get(link: RequestInfo | URL) {
    const someHeaders = {};
    const props: RequestInit = {
      method: 'GET',
      headers: someHeaders,
    };
    const response = await fetch(link, props);
    return this.responseHandler(response);
  }

  public static async put(link: RequestInfo | URL, body: BodyInit | null) {
    const someHeaders = {};
    const props: RequestInit = {
      method: 'PUT',
      headers: someHeaders,
      body,
    };
    const response = await fetch(link, props);
    return this.responseHandler(response);
  }

  public static async post(link: RequestInfo | URL, body: BodyInit | null) {
    const someHeaders = {};
    const props: RequestInit = {
      method: 'POST',
      headers: someHeaders,
      body,
    };
    const response = await fetch(link, props);
    return this.responseHandler(response);
  }

  public static async delete(link: RequestInfo | URL) {
    const someHeaders = {};
    const props: RequestInit = {
      method: 'POST',
      headers: someHeaders,
    };
    const response = await fetch(link, props);
    return this.responseHandler(response);
  }
}
