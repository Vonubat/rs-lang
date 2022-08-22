import Constants from '../../constants';
import { Settings } from '../../types/types';
import CheckApiParams from '../../utilities/check-api-params';
import HttpClient from '../http-client';

export default class UserSettings {
  private httpClient: HttpClient;

  private checkApiParams: CheckApiParams;

  constructor(httpClient: HttpClient, checkApiParams: CheckApiParams) {
    this.httpClient = httpClient;
    this.checkApiParams = checkApiParams;
  }

  /**
   * Endpoint: /users/{id}/settings [GET method].
   * Gets settings.
   * @param {string} userId - id of user.
   * @returns {Promise<Settings>} return settings.
   */

  public async getSettings(userId: string): Promise<Settings> {
    this.checkApiParams.checkId(userId);

    const url: URL = new URL(`${Constants.BASE_URL}/users/${userId}/settings`);
    const response: Response = await this.httpClient.get(url);
    const content: Settings = await response.json();

    // console.log(content);
    return content;
  }

  /**
   * Endpoint: /users/{id}/settings [PUT method].
   * Upserts new settings.
   * @param {string} userId - id of user.
   * @param {Object} body - Object (request body) should contains:
   * [Example] -> { "wordsPerDay": "number",  "optional": { ... }}.
   * @returns {Promise<Settings>} return settings.
   */

  public async setSettings(userId: string, body: Settings): Promise<Settings> {
    this.checkApiParams.checkId(userId);

    const url: URL = new URL(`${Constants.BASE_URL}/users/${userId}/settings`);
    const response: Response = await this.httpClient.put(url, JSON.stringify(body));
    const content: Settings = await response.json();

    // console.log(content);
    return content;
  }
}
