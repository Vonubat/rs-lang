import Constants from '../../constants';
import HttpClient from '../http-client';

const baseUrl = Constants.BASE_URL ? `${Constants.BASE_URL}/users` : null;

export default class UsersAggregatedWords {
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  /**
   * Get all user aggregated words
   * @param {string} id - user id
   * @param {string} group - group
   * @param {number} page - page number
   * @param {number} wordsPerPage - words per page
   * @param {string} filter - filter by aggregated word fields
   * @returns aggregated words
   */
  public async getAllUserAggregatedWords(
    id: string,
    group: string,
    page: string,
    wordsPerPage: string,
    filter: string
  ) {
    if (baseUrl) {
      const url = new URL(`${baseUrl}/${id}//users/{id}/aggregatedWords`);
      const params = new URLSearchParams({
        group,
        page,
        wordsPerPage,
        filter,
      });
      const aggregatedWords = this.httpClient.get(`${url}?${params}`);
      return aggregatedWords;
    }
    return null;
  }

  /**
   * Gets a user aggregated word by id
   * @param id - user id
   * @param wordId word id
   * @returns aggregated word
   */
  public async getUserAggregatedWordById(id: string, wordId: string) {
    if (baseUrl) {
      const url = new URL(`${baseUrl}/${id}/words/${wordId}/`);
      const aggregatedWords = this.httpClient.get(url);
      return aggregatedWords;
    }
    return null;
  }
}
