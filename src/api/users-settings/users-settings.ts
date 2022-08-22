import Constants from '../../constants';
import { Settings } from '../../types/types';
import HttpClient from '../http-client';

const baseUrl = Constants.BASE_URL ? `${Constants.BASE_URL}/users` : null;

export default class UserSettings {
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  /**
   * Get settings
   * @param id - user id
   * @returns settings
   */
  public async getSettings(id: string) {
    if (baseUrl) {
      const url = new URL(`${baseUrl}/${id}/settings`);
      const settings = this.httpClient.get(url);
      return settings;
    }
    return null;
  }

  /**
   * Set settings
   * @param id - user id
   * @param settings settings to update
   * @returns updated settings
   */
  public async setSettings(id: string, settings: Settings) {
    if (baseUrl) {
      const url = new URL(`${baseUrl}/${id}/settings`);
      const result = this.httpClient.put(url, JSON.stringify(settings));
      return result;
    }
    return null;
  }
}
