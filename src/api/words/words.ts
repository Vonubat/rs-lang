import Constants from '../../constants';
import HttpClient from '../http-client';
import { WordsResponseSchema } from '../../types/types';

export default class Words extends HttpClient {
  /**
   * Endpoint: /words [GET method].
   * Get a chunk of words.
   * @param {number} groupNumber - # of a group (total: 6 groups, from 0 to 5).
   * @param {number} pageNumber - # of page in the group (total: 30 pages in the group, from 0 to 29). Every page contains 20 words (from 0 to 19).
   * @return {Promise<WordsResponseSchema[]>} - array of 20 words according input Parameters.
   */

  public async getWords(groupNumber = 0, pageNumber = 0): Promise<WordsResponseSchema[]> {
    this.checkGroupsPagesOfWords(groupNumber, pageNumber);

    const url: URL = new URL(`${Constants.BASE_URL}/words?group=${groupNumber}&page=${pageNumber}`);
    const response: Response = await this.get(url);

    if (!response.ok) {
      throw new Error(`Can't get a chunk of words`);
    }

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
    this.checkId(wordId);

    const url: URL = new URL(`${Constants.BASE_URL}/words/${wordId}`);
    const response: Response = await this.get(url);

    if (!response.ok) {
      throw new Error(`Can't gets a word with assets by id`);
    }

    const content: WordsResponseSchema = await response.json();

    // console.log(content);
    return content;
  }
}
