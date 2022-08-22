import Constants from '../../constants';
import HttpClient from '../http-client';
import { WordsResponseSchema } from '../../types/types';
import CheckApiParams from '../../utilities/check-api-params';
import Tokens from '../../services/auth/tokens';

export default class Words {
  private httpClient: HttpClient;

  private checkApiParams: CheckApiParams;

  constructor(httpClient: HttpClient, checkApiParams: CheckApiParams) {
    this.httpClient = httpClient;
    this.checkApiParams = checkApiParams;
  }

  /**
   * Endpoint: /words [GET method].
   * Get a chunk of words.
   * @param {number} groupNumber - # of a group (total: 6 groups, from 0 to 5).
   * @param {number} pageNumber - # of page in the group (total: 30 pages in the group, from 0 to 29). Every page contains 20 words (from 0 to 19).
   * @return {Promise<WordsResponseSchema[]>} - array of 20 words according input Parameters
   */

  public async getWords(groupNumber = 0, pageNumber = 0): Promise<WordsResponseSchema[]> {
    this.checkApiParams.checkGroupsPagesOfWords(groupNumber, pageNumber);

    const url: URL = new URL(`${Constants.BASE_URL}/words?group=${groupNumber}&page=${pageNumber}`);
    const response: Response = await this.httpClient.get(url, Tokens.getToken());
    const content: WordsResponseSchema[] = await response.json();

    // console.log(content);
    return content;
  }

  /**
   * Endpoint: /words/{id} [GET method].
   * Gets a word with assets by id.
   * @param {string} wordId - unique id for word (WORD_ID_LENGTH === 24).
   * @return {Promise<WordsResponseSchema>} - object with a certain word.
   */

  public async getWordById(wordId: string): Promise<WordsResponseSchema> {
    this.checkApiParams.checkId(wordId);

    const url: URL = new URL(`${Constants.BASE_URL}/words/${wordId}`);
    const response = await this.httpClient.get(url, Tokens.getToken());
    const content: WordsResponseSchema = await response.json();

    // console.log(content);
    return content;
  }
}

// const test = new Words(new HttpClient());
// test.getWords({ groupNumber: 5, pageNumber: 25 });
// test.getWordById({ wordId: '5e9f5ee45eb9e72bc21b024c' });
