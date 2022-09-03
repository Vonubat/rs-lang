import AuthService from './auth/auth-service';
import PageConfig from './components/page-config';
import DictionaryService from './dictionary/dictionary-service';
import StatisticsService from './statistics/statistics-service';
import TextbookService from './textbook/textbook-service';

export class Services {
  textbookService: TextbookService;

  authService: AuthService;

  pageConfig: PageConfig;

  dictionaryService: DictionaryService;

  statisticsService: StatisticsService;

  constructor() {
    this.textbookService = new TextbookService();
    this.pageConfig = new PageConfig();
    this.authService = new AuthService();
    this.dictionaryService = new DictionaryService();
    this.statisticsService = new StatisticsService();
  }
}

export const services: Services = new Services();
