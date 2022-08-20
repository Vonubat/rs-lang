import Constants from '../../constants';
import { Statistics } from '../../types/types';
import HttpClient from '../http-client';

const baseUrl = Constants.BASE_URL ? `${Constants.BASE_URL}/users` : null;

export default class UsersStatistics {
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  public getStatistics(id: string) {
    if (baseUrl) {
      const url = new URL(`${baseUrl}/${id}/statistics`);
      const statistics = this.httpClient.get(url);
      return statistics;
    }
    return null;
  }

  public setStatistics(id: string, learnedWords: Statistics) {
    if (baseUrl) {
      const url = new URL(`${baseUrl}/${id}/statistics`);
      const result = this.httpClient.put(url, JSON.stringify(learnedWords));
      return result;
    }
    return null;
  }
}
