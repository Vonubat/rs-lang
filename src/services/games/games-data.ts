import { api } from '../../api/api';
import { AggregatedWords, PaginatedResult, WordsResponseSchema } from '../../types/types';
import Utils from '../../utilities/utils';
import AuthService from '../auth/auth-service';
import Credentials from '../auth/credentials';

export default class GamesData {
  async prepareData(id: string, level: number): Promise<WordsResponseSchema[] | PaginatedResult[]> {
    const words: WordsResponseSchema[] | PaginatedResult[] = await this.requestFromGamesPage(level);
    /* if (level !== undefined) {

    } */

    /*     if (id.includes('dictionary')) {
    }

    if (id.includes('textbook')) {
    } */

    /* words = await this.requestFromGamesPage(level); */
    return words;
  }

  async requestFromGamesPage(level: number): Promise<WordsResponseSchema[] | PaginatedResult[]> {
    let words: WordsResponseSchema[] | PaginatedResult[];
    if (AuthService.checkUser()) {
      const aggregatedWords: AggregatedWords = await api.usersAggregatedWords.getAllUserAggregatedWords(
        Credentials.getUserId(),
        '',
        20,
        level,
        this.randomPageNumber()
      );
      words = Utils.shuffleWords(aggregatedWords.paginatedResults);
      return words;
    }
    const chunkOfWords = await api.words.getWords(level, this.randomPageNumber());
    words = Utils.shuffleWords(chunkOfWords);
    return words;
  }

  randomPageNumber(): number {
    return Math.floor(29 * Math.random());
  }
}
