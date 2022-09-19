import Constants from '../../constants';
import { Statistics } from '../../types/types';
import HttpClient from '../http-client';

export default class UsersStatistics extends HttpClient {
  /**
   * Endpoint: /users/{id}/statistics [GET method].
   * Gets statistics.
   * @param {string} userId - id of user.
   * @returns {Promise<Statistics>} return statistics.
   */

  public async getStatistics(userId: string): Promise<Statistics | Response> {
    this.checkId(userId);

    const url: URL = new URL(`${Constants.BASE_URL}/users/${userId}/statistics`);
    const response: Response = await this.get(url);

    if (!response.ok) {
      // status 400 -> Bad request
      // status 401 -> Access token is missing or invalid
      return response;
    }

    const content: Statistics = await response.json();

    return content;
  }

  /**
   * Endpoint: /users/{id}/statistics [PUT method].
   * Upserts new statistics.
   * @param {string} userId - id of user.
   * @param {Object} body - Object (request body) should contains:
   * [Example] -> { "learnedWords": "number",  "optional": { ... }}.
   * @returns {Promise<Statistics>} return statistics.
   */

  public async setStatistics(userId: string, body: Statistics): Promise<Statistics | Response> {
    this.checkId(userId);

    const url: URL = new URL(`${Constants.BASE_URL}/users/${userId}/statistics`);
    const response: Response = await this.put(url, JSON.stringify(body));

    if (!response.ok) {
      // status 400 -> Bad request
      // status 401 -> Access token is missing or invalid
      return response;
    }

    const content: Statistics = await response.json();

    return content;
  }
}
