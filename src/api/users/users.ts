import Constants from '../../constants';
import Tokens from '../../services/auth/tokens';
import { CredentialsSchema, UserResponseSchema, UserSchema, TokensSchema } from '../../types/types';
import CheckApiParams from '../../utilities/check-api-params';
import HttpClient from '../http-client';

export default class Users {
  private httpClient: HttpClient;

  private checkApiParams: CheckApiParams;

  constructor(httpClient: HttpClient, checkApiParams: CheckApiParams) {
    this.httpClient = httpClient;
    this.checkApiParams = checkApiParams;
  }

  /**
   * Endpoint: /users [POST method].
   * Creates a new user.
   * @param {Object} user - User that we want to create. Object (request body) should contains:
   * [Example] -> { "name": "string", "email": "string", "password": "string}
   * @returns {Promise<UserResponseSchema>} created user.
   */

  public async createUser(user: UserSchema): Promise<UserResponseSchema> {
    const { email, password } = user;
    this.checkApiParams.checkEmail(email);
    this.checkApiParams.checkPassword(password);

    const url: URL = new URL(`${Constants.BASE_URL}/users`);
    const response: Response = await this.httpClient.post(url, JSON.stringify(user), Tokens.getToken());
    const content: UserResponseSchema = await response.json();

    // console.log(content);
    return content;
  }

  /**
   * Endpoint: /users/{id} [GET method].
   * Gets user.
   * @param {string} userId - id of user that we want to get.
   * @returns {Promise<UserSchema>} returned user.
   */

  public async getUser(userId: string): Promise<UserSchema> {
    this.checkApiParams.checkId(userId);

    const url: URL = new URL(`${Constants.BASE_URL}/${userId}`);
    const response: Response = await this.httpClient.get(url, Tokens.getToken());
    const content: UserSchema = await response.json();

    // console.log(content);
    return content;
  }

  /**
   * Endpoint: /users/{id} [PUT method].
   * Updates a user.
   * @param {string} userId - id of user that we want to update.
   * @param {Object} credentials - credentials of user. Object (request body) should contains: [Example] -> { "email": "string", "password": "string}
   * @returns {Promise<UserResponseSchema>} - the user has been updated.
   */

  public async updateUser(userId: string, credentials: CredentialsSchema): Promise<UserResponseSchema> {
    const { email, password } = credentials;
    this.checkApiParams.checkEmail(email);
    this.checkApiParams.checkPassword(password);
    this.checkApiParams.checkId(userId);

    const url: URL = new URL(`${Constants.BASE_URL}/${userId}`);
    const response: Response = await this.httpClient.put(url, JSON.stringify(credentials), Tokens.getToken());
    const content: UserResponseSchema = await response.json();

    // console.log(content);
    return content;
  }

  /**
   * Endpoint: /users/{id} [DELETE method].
   * Deletes a user by id.
   * @param {string} userId - id of user that we want to delete.
   * @returns {Promise<UserResponseSchema>} - the user has been updated.
   */

  public async deleteUser(userId: string): Promise<void> {
    this.checkApiParams.checkId(userId);

    const url: URL = new URL(`${Constants.BASE_URL}/${userId}`);
    await this.httpClient.delete(url, Tokens.getToken());
  }

  /**
   * Endpoint: /users/{id}/tokens [GET method].
   * Gets new user tokens.
   * @param {string} userId - id of user that we want to get new token and refreshToken.
   * @returns {Promise<Tokens>} - object with new token and refreshToken.
   */

  public async getNewUserTokens(userId: string): Promise<TokensSchema> {
    this.checkApiParams.checkId(userId);

    const url: URL = new URL(`${Constants.BASE_URL}/${userId}/tokens`);
    const response: Response = await this.httpClient.get(url, Tokens.getRefreshToken());
    const content: TokensSchema = await response.json();
    const { token, refreshToken } = content;
    Tokens.setToken(token);
    Tokens.setRefreshToken(refreshToken);

    // console.log(content);
    return content;
  }
}
