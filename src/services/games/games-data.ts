import { api } from '../../api/api';
import { AggregatedWords, PaginatedResult, WordsResponseSchema } from '../../types/types';
import Utils from '../../utilities/utils';
import AuthService from '../auth/auth-service';
import Credentials from '../auth/credentials';

export default class GamesData {
  async prepareData(id: string, level?: number): Promise<WordsResponseSchema[] | PaginatedResult[]> {
    let words: WordsResponseSchema[] | PaginatedResult[];
    if (level !== undefined) {
      words = await this.requestFromGamesPage(level);
      return words;
    }

    if (id.includes('dictionary')) {
      words = await this.requestFromDictionaryPage();
      return words;
    }

    /* if (id.includes('textbook')) {
    } */

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
    const chunkOfWords: WordsResponseSchema[] = await api.words.getWords(level, this.randomPageNumber());
    words = Utils.shuffleWords(chunkOfWords);
    return words;
  }

  async requestFromDictionaryPage(): Promise<WordsResponseSchema[] | PaginatedResult[]> {
    const aggregatedWords: AggregatedWords = await api.usersAggregatedWords.getAllUserAggregatedWords(
      Credentials.getUserId(),
      '{"$or":[{"userWord.difficulty":"hard"},{"userWord.difficulty":"learned"}]}',
      600
    );
    const words: WordsResponseSchema[] | PaginatedResult[] = Utils.shuffleWords(aggregatedWords.paginatedResults);
    return words;
  }

  randomPageNumber(): number {
    return Math.floor(29 * Math.random());
  }
}
