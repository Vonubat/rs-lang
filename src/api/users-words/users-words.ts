import Constants from '../../constants';
import { WordsResponseSchema } from '../../types/types';
import HttpClient from '../http-client';

const baseUrl = Constants.BASE_URL ? `${Constants.BASE_URL}/users` : null;

export default class UsersWords {
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  /**
   * Get all user words
   * @param {string} id - user id
   * @returns - all user words
   */
  public async getAllUserWords(id: string) {
    if (baseUrl) {
      const url = new URL(`${baseUrl}/${id}/words/`);
      const words = this.httpClient.get(url);
      return words;
    }
    return null;
  }

  /**
   * Create new word
   * @param {string} id - user id
   * @param {string} wordId - word id
   * @param {WordsResponseSchema} newWord - new word data
   * @returns new word
   */
  public createNewWord(id: string, wordId: string, newWord: WordsResponseSchema) {
    if (baseUrl) {
      const url = new URL(`${baseUrl}/${id}/words/${wordId}`);
      // TODO: check type
      const words = this.httpClient.post(url, JSON.stringify(newWord));
      return words;
    }
    return null;
  }

  /**
   * Get user word by word id
   * @param id - user id
   * @param wordId - word id
   * @returns user word
   */
  public getUserWordById(id: string, wordId: string) {
    if (baseUrl) {
      const url = new URL(`${baseUrl}/${id}/words/${wordId}`);
      const word = this.httpClient.get(url);
      return word;
    }
    return null;
  }

  /**
   * Update user word
   * @param {string} id - user id
   * @param {string} wordId - word id
   * @param {WordsResponseSchema} word - word data
   * @returns updated word
   */
  public updateUserWord(id: string, wordId: string, word: WordsResponseSchema) {
    if (baseUrl) {
      const url = new URL(`${baseUrl}/${id}/words/${wordId}`);
      const result = this.httpClient.put(url, JSON.stringify(word));
      return result;
    }
    return null;
  }

  /**
   * Delete word
   * @param id - user id
   * @param wordId - word id
   * @returns success status
   */
  public deleteUserWord(id: string, wordId: string) {
    if (baseUrl) {
      const url = new URL(`${baseUrl}/${id}/words/${wordId}`);
      const result = this.httpClient.delete(url);
      return result;
    }
    return null;
  }
}
