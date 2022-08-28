import Constants from '../../constants';
import Credentials from '../../services/auth/credentials';
import { CredentialsSchema, UserResponseSchema, UserSchema, TokensSchema } from '../../types/types';
import HttpClient from '../http-client';

export default class Users extends HttpClient {
  /**
   * Endpoint: /users [POST method].
   * Creates a new user.
   * @param {Object} user - User that we want to create. Object (request body) should contains:
   * [Example] -> { "name": "string", "email": "string", "password": "string}.
   * @returns {Promise<UserResponseSchema>} return created user.
   */

  public async createUser(user: UserSchema): Promise<UserResponseSchema | Response> {
    const { email, password } = user;
    this.checkEmail(email);
    this.checkPassword(password);

    const url: URL = new URL(`${Constants.BASE_URL}/users`);
    const response: Response = await this.post(url, JSON.stringify(user));

    if (!response.ok) {
      // status 422 -> Email address is already registered
      // status 422 -> Incorrect e-mail or password
      return response;
    }

    const content: UserResponseSchema = await response.json();

    // console.log(content);
    return content;
  }

  /**
   * Endpoint: /users/{id} [GET method].
   * Gets user.
   * @param {string} userId -> id of user that we want to get.
   * @returns {Promise<UserSchema>} returned specific user.
   */

  public async getUser(userId: string): Promise<UserSchema | Response> {
    this.checkId(userId);

    const url: URL = new URL(`${Constants.BASE_URL}/users/${userId}`);
    const response: Response = await this.get(url);

    if (!response.ok) {
      // status 401 -> Access token is missing or invalid
      // status 404 -> User not found
      return response;
    }

    const content: UserSchema = await response.json();

    // console.log(content);
    return content;
  }

  /**
   * Endpoint: /users/{id} [PUT method].
   * Updates a user.
   * @param {string} userId - id of user that we want to update.
   * @param {Object} credentials - credentials of user. Object (request body) should contains: [Example] -> { "email": "string", "password": "string"}.
   * @returns {Promise<UserResponseSchema>} - return updated has been updated.
   */

  public async updateUser(userId: string, credentials: CredentialsSchema): Promise<UserResponseSchema | Response> {
    const { email, password } = credentials;
    this.checkEmail(email);
    this.checkPassword(password);
    this.checkId(userId);

    const url: URL = new URL(`${Constants.BASE_URL}/users/${userId}`);
    const response: Response = await this.put(url, JSON.stringify(credentials));

    if (!response.ok) {
      // status 400 -> Bad request
      // status 401 -> Access token is missing or invalid
      return response;
    }

    const content: UserResponseSchema = await response.json();

    // console.log(content);
    return content;
  }

  /**
   * Endpoint: /users/{id} [DELETE method].
   * Deletes a user by id.
   * @param {string} userId - id of user that we want to delete.
   * @returns {Promise<void>} - return nothing.
   */

  public async deleteUser(userId: string): Promise<Response> {
    this.checkId(userId);

    const url: URL = new URL(`${Constants.BASE_URL}/users/${userId}`);
    const response: Response = await this.delete(url);

    if (!response.ok) {
      // status 401 -> Access token is missing or invalid
      return response;
    }

    // status 204 -> The user has been deleted
    return response;
  }

  /**
   * Endpoint: /users/{id}/tokens [GET method].
   * Gets new user tokens.
   * @param {string} userId - id of user that we want to get new token and refreshToken.
   * @returns {Promise<Tokens>} - object with new token and refreshToken.
   */

  public async getNewUserTokens(userId: string): Promise<TokensSchema | Response> {
    this.checkId(userId);

    const url: URL = new URL(`${Constants.BASE_URL}/users/${userId}/tokens`);
    const response: Response = await this.get(url, Credentials.getRefreshToken());

    if (!response.ok) {
      // status 403 -> Access token is missing, expired or invalid
      return response;
    }

    const content: TokensSchema = await response.json();
    const { token, refreshToken } = content;
    Credentials.setToken(token);
    Credentials.setRefreshToken(refreshToken);

    // console.log(content);
    return content;
  }
}
