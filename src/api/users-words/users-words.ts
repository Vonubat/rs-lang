import Constants from '../../constants';
import { UsersWordsRequestSchema, UsersWordsResponseSchema } from '../../types/types';
import CheckApiParams from '../../utilities/check-api-params';
import HttpClient from '../http-client';

export default class UsersWords {
  private httpClient: HttpClient;

  private checkApiParams: CheckApiParams;

  constructor(httpClient: HttpClient, checkApiParams: CheckApiParams) {
    this.httpClient = httpClient;
    this.checkApiParams = checkApiParams;
  }

  /**
   * Endpoint: /users/{id}/words [GET method].
   * Gets all user words.
   * @param {string} userId - id of user.
   * @returns {Promise<UsersWordsResponseSchema[]>} return all user words.
   */

  public async getAllUserWords(userId: string): Promise<UsersWordsResponseSchema[]> {
    this.checkApiParams.checkId(userId);

    const url: URL = new URL(`${Constants.BASE_URL}/users/${userId}/words/`);
    const response: Response = await this.httpClient.get(url);
    const content: UsersWordsResponseSchema[] = await response.json();

    // console.log(content);
    return content;
  }

  /**
   * Endpoint: /users/{id}/words/{wordId} [POST method].
   * Create a user word by id.
   * @param {string} userId - id of user.
   * @param {string} wordId - id of word.
   * @param {Object} body - Object (request body) should contains:
   * [Example] -> { "difficulty": "string",  "optional": { ... }}.
   * @returns {Promise<UsersWordsResponseSchema>} return created word.
   */

  public async createUserWord(
    userId: string,
    wordId: string,
    body: UsersWordsRequestSchema
  ): Promise<UsersWordsResponseSchema> {
    this.checkApiParams.checkId(userId);
    this.checkApiParams.checkId(wordId);

    const url: URL = new URL(`${Constants.BASE_URL}/users/${userId}/words/${wordId}`);
    const response: Response = await this.httpClient.post(url, JSON.stringify(body));
    const content: UsersWordsResponseSchema = await response.json();

    // console.log(content);
    return content;
  }

  /**
   * Endpoint: /users/{id}/words/{wordId} [GET method].
   * Gets a user word by id.
   * @param {string} userId - id of user.
   * @param {string} wordId - id of word.
   * @returns {Promise<UsersWordsResponseSchema>} return specific word.
   */

  public async getUserWordById(userId: string, wordId: string): Promise<UsersWordsResponseSchema> {
    this.checkApiParams.checkId(userId);
    this.checkApiParams.checkId(wordId);

    const url: URL = new URL(`${Constants.BASE_URL}/users/${userId}/words/${wordId}`);
    const response: Response = await this.httpClient.get(url);
    const content: UsersWordsResponseSchema = await response.json();

    // console.log(content);
    return content;
  }

  /**
   * Endpoint: /users/{id}/words/{wordId} [PUT method].
   * Updates a user word by id
   * @param {string} userId - id of user.
   * @param {string} wordId - id of word.
   * @param {Object} body - Object (request body) should contains:
   * [Example] -> { "difficulty": "string",  "optional": { ... }}.
   * @returns {Promise<UsersWordsResponseSchema>} return updated word.
   */

  public async updateUserWord(
    userId: string,
    wordId: string,
    body: UsersWordsRequestSchema
  ): Promise<UsersWordsResponseSchema> {
    this.checkApiParams.checkId(userId);
    this.checkApiParams.checkId(wordId);

    const url: URL = new URL(`${Constants.BASE_URL}/users/${userId}/words/${wordId}`);
    const response: Response = await this.httpClient.put(url, JSON.stringify(body));
    const content: UsersWordsResponseSchema = await response.json();

    // console.log(content);
    return content;
  }

  /**
   * Endpoint: /users/{id}/words/{wordId} [Delete method].
   * Deletes user words by id.
   * @param {string} userId - id of user.
   * @param {string} wordId - id of word.
   * @returns {Promise<void>} return nothing.
   */

  public async deleteUserWord(userId: string, wordId: string): Promise<void> {
    this.checkApiParams.checkId(userId);
    this.checkApiParams.checkId(wordId);

    const url: URL = new URL(`${Constants.BASE_URL}/users/${userId}/words/${wordId}`);
    await this.httpClient.delete(url);
  }
}
