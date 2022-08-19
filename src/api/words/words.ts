import Constants from '../../constants';
import HttpClient from '../http-client';
import { WordsResponseSchema } from '../../types/types';

class Words {
  public rawResponse!: Response;

  /**
   * Endpoint: /words [GET method].
   * Get a chunk of words.
   * @param {Object} Parameters - contains groupNumber, pageNumber.
   * @param {number} Parameters.groupNumber - # of a group (total: 6 groups, from 0 to 5).
   * @param {number} Parameters.pageNumber - # of page in the group (total: 30 pages in the group, from 0 to 29). Every page contains 20 words (from 0 to 19).
   * @return {Promise<WordsResponseSchema[]>} - array of 20 words according input Parameters
   */

  public async getWords({
    groupNumber = 0,
    pageNumber = 0,
  }: {
    groupNumber: number;
    pageNumber: number;
  }): Promise<WordsResponseSchema[]> {
    this.rawResponse = await HttpClient.get(`${Constants.BASE_URL}/words?group=${groupNumber}&page=${pageNumber}`);

    const content: WordsResponseSchema[] = await this.rawResponse.json();
    // console.log(content);
    return content;
  }

  /**
   * Endpoint: /words/{id} [GET method].
   * Gets a word with assets by id.
   * @param {Object} Parameters - contains wordId.
   * @param {number} Parameters.wordId - unique id for word.
   * @return {Promise<WordsResponseSchema>} - object with a certain word.
   */

  public async getWordById({ wordId }: { wordId: string }): Promise<WordsResponseSchema> {
    if (wordId.length !== Constants.WORD_ID_LENGTH) {
      throw new Error('wordId is not correct');
    }
    this.rawResponse = await HttpClient.get(`${Constants.BASE_URL}/words/${wordId}`);

    const content: WordsResponseSchema = await this.rawResponse.json();
    // console.log(content);
    return content;
  }
}

// const test = new Words();
// test.getWords({ groupNumber: 5, pageNumber: 25 });
// test.getWordById({ wordId: '5e9f5ee45eb9e72bc21b024c' });
export default Words;
