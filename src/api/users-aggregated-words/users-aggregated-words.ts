import Constants from '../../constants';
import { AggregatedWords, PaginatedResult } from '../../types/types';
import HttpClient from '../http-client';

export default class UsersAggregatedWords extends HttpClient {
  /**
   * Endpoint: /users/{id}/aggregatedWords [GET method].
   * Gets all user aggregated words.
   * @param {string} userId - id of user.
   * @param {number} groupNumber - # of a group (total: 6 groups, from 0 to 5).
   * @param {number} pageNumber - # of page in the group (total: 30 pages in the group, from 0 to 29). Every page contains 20 words (from 0 to 19).
   * @param {number} wordsPerPage - words per page.
   * @param {string} filter - filter by aggregated word fields. Filter by aggregated word fields. It should be a stringified object which meet MongoDB Query object conditions.
   *
   * Get all words that have difficult="hard AND optional.key="value:
   * {"$and":[{"userWord.difficulty":"hard", "userWord.optional.key":"value"}]}
   *
   * Get all words that have difficulty equal="easy" OR do not have the linked userWord:
   * {"$or":[{"userWord.difficulty":"easy"},{"userWord":null}]}
   *
   * Get all words that have BOTH difficulty equal="easy" AND optional.repeat=true, OR do not have the linked userWord:
   * {"$or":[{"$and":[{"userWord.difficulty":"easy", "userWord.optional.repeat":true}]},{"userWord":null}]}
   * @returns {Promise<AggregatedWords[]>} return array of user aggregated words.
   */

  public async getAllUserAggregatedWords(
    userId: string,
    filter: string,
    wordsPerPage = 5,
    groupNumber = 0,
    pageNumber = 0
  ): Promise<AggregatedWords[] | Response> {
    this.checkId(userId);
    this.checkGroupsPagesOfWords(groupNumber, pageNumber);

    const url: URL = new URL(
      `${Constants.BASE_URL}/users/${userId}/aggregatedWords?group=${groupNumber}&page=${pageNumber}&wordsPerPage=${wordsPerPage}&filter=${filter}`
    );

    const response: Response = await this.get(url);

    if (!response.ok) {
      // status 401 -> Access token is missing or invalid
      return response;
    }

    const content: AggregatedWords[] = await response.json();

    // console.log(content);
    return content;
  }

  /**
   * Endpoint: /users/{id}/aggregatedWords/{wordId} [GET method].
   * Gets a user aggregated word by id
   * @param {string} userId - id of user.
   * @param {string} wordId - id of word.
   * @returns {Promise<PaginatedResult>} return a user aggregated word by id.
   */

  public async getUserAggregatedWordById(userId: string, wordId: string) {
    this.checkId(userId);
    this.checkId(wordId);

    const url: URL = new URL(`${Constants.BASE_URL}/users/${userId}/aggregatedWords/${wordId}/`);
    const response: Response = await this.get(url);

    if (!response.ok) {
      // status 401 -> Access token is missing or invalid
      // status 404 -> User's word not found
      return response;
    }

    const content: PaginatedResult = await response.json();

    // console.log(content);
    return content;
  }
}
