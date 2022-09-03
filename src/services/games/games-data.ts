import { api } from '../../api/api';
import { AggregatedWords, PaginatedResult, WordsResponseSchema } from '../../types/types';
import Utils from '../../utilities/utils';
import AuthService from '../auth/auth-service';
import Credentials from '../auth/credentials';
import { services } from '../services';

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

    words = await this.requestFromTextbookPage();

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
      services.pageConfig.setTotalCount(aggregatedWords.totalCount[0].count);
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
    services.pageConfig.setTotalCount(aggregatedWords.totalCount[0].count);
    const words: WordsResponseSchema[] | PaginatedResult[] = Utils.shuffleWords(aggregatedWords.paginatedResults);
    return words;
  }

  async requestFromTextbookPage(): Promise<WordsResponseSchema[] | PaginatedResult[]> {
    let words: WordsResponseSchema[] | PaginatedResult[];
    if (AuthService.checkUser()) {
      const aggregatedWords: AggregatedWords = await api.usersAggregatedWords.getAllUserAggregatedWords(
        Credentials.getUserId(),
        '',
        20,
        services.pageConfig.getGroupNumber(),
        services.pageConfig.getPageNumber()
      );
      services.pageConfig.setTotalCount(20);
      words = Utils.shuffleWords(aggregatedWords.paginatedResults);
      return words;
    }
    const chunkOfWords: WordsResponseSchema[] = await api.words.getWords(
      services.pageConfig.getGroupNumber(),
      services.pageConfig.getPageNumber()
    );
    words = Utils.shuffleWords(chunkOfWords);
    return words;
  }

  randomPageNumber(): number {
    return Math.floor(29 * Math.random());
  }
}
