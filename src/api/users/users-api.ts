import Constants from '../../constants';
import { User } from '../../types/types';
import HttpClient from '../http-client';

const baseUrl = Constants.BASE_URL ? `${Constants.BASE_URL}/users` : null;

export default class Users {
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  /**
   * Create user.
   * @param {User} user - User that we want to create.
   * @returns created user.
   */
  public createUser(user: User) {
    if (baseUrl) {
      const url = new URL(`${baseUrl}/`);
      const newUser = this.httpClient.post(url, JSON.stringify(user));
      return newUser;
    }
    return null;
  }

  /**
   * Get user.
   * @param {string} id - User that we want to get.
   * @returns created user.
   */
  public getUser(id: string) {
    if (baseUrl) {
      const url = new URL(`${baseUrl}/${id}`);
      const user = this.httpClient.get(url);
      return user;
    }
    return null;
  }

  /**
   * Update user.
   * @param {string} id - User that we want to update.
   * @param {User} user - data to update
   * @returns updated user.
   */
  public updateUser(id: string, user: User) {
    if (baseUrl) {
      const url = new URL(`${baseUrl}/${id}`);
      const updatedUser = this.httpClient.put(url, JSON.stringify(user));
      return updatedUser;
    }
    return null;
  }

  /**
   * Delete user.
   * @param {string} id - User that we want to delete.
   * @returns is user deleted.
   */
  public deleteUser(id: string) {
    if (baseUrl) {
      const url = new URL(`${baseUrl}/${id}`);
      const isUserDeleted = this.httpClient.delete(url);
      return isUserDeleted;
    }
    return null;
  }

  /**
   * Get user tokens.
   * @param {string} id - user id.
   * @returns authenticate response schema.
   */
  public getUserTokens(id: string) {
    if (baseUrl) {
      const url = new URL(`${baseUrl}/${id}/tokens`);
      const authResponseSchema = this.httpClient.get(url);
      return authResponseSchema;
    }
    return null;
  }
}
