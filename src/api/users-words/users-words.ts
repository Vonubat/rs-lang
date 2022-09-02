import Constants from '../../constants';
import { UsersWordsRequestSchema, UsersWordsResponseSchema } from '../../types/types';
import HttpClient from '../http-client';

export default class UsersWords extends HttpClient {
  /**
   * Endpoint: /users/{id}/words [GET method].
   * Gets all user words.
   * @param {string} userId - id of user.
   * @returns {Promise<UsersWordsResponseSchema[]>} return all user words.
   */

  public async getAllUserWords(userId: string): Promise<UsersWordsResponseSchema[] | Response> {
    this.checkId(userId);

    const url: URL = new URL(`${Constants.BASE_URL}/users/${userId}/words/`);
    const response: Response = await this.get(url);

    if (!response.ok) {
      // status 402 -> Access token is missing or invalid
      return response;
    }

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
    this.checkId(userId);
    this.checkId(wordId);

    const url: URL = new URL(`${Constants.BASE_URL}/users/${userId}/words/${wordId}`);
    const response: Response = await this.post(url, JSON.stringify(body));

    if (!response.ok) {
      if (response.status === 400) {
        throw new Error('Bad request');
      }
      if (response.status === 401) {
        throw new Error(`Access token is missing or invalid`);
      }
    }

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

  public async getUserWordById(userId: string, wordId: string): Promise<UsersWordsResponseSchema | Response> {
    this.checkId(userId);
    this.checkId(wordId);

    const url: URL = new URL(`${Constants.BASE_URL}/users/${userId}/words/${wordId}`);
    const response: Response = await this.get(url);

    if (!response.ok) {
      return response;
    }

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
    this.checkId(userId);
    this.checkId(wordId);

    const url: URL = new URL(`${Constants.BASE_URL}/users/${userId}/words/${wordId}`);
    const response: Response = await this.put(url, JSON.stringify(body));

    if (!response.ok) {
      if (response.status === 400) {
        throw new Error('Bad request');
      }
      if (response.status === 401) {
        throw new Error(`Access token is missing or invalid`);
      }
    }

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

  public async deleteUserWord(userId: string, wordId: string): Promise<Response> {
    this.checkId(userId);
    this.checkId(wordId);

    const url: URL = new URL(`${Constants.BASE_URL}/users/${userId}/words/${wordId}`);
    const response: Response = await this.delete(url);

    if (!response.ok) {
      // status 401 -> Access token is missing or invalid
      return response;
    }

    // status 204 -> The user word has been deleted
    return response;
  }
}
