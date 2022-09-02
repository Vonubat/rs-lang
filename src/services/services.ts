import AuthService from './auth/auth-service';
import PageConfig from './components/page-config';
import DictionaryService from './dictionary/dictionary-service';
import TextbookService from './textbook/textbook-service';

export class Services {
  textbookService: TextbookService;

  authService: AuthService;

  pageConfig: PageConfig;

  dictionaryService: DictionaryService;

  constructor() {
    this.textbookService = new TextbookService();
    this.pageConfig = new PageConfig();
    this.authService = new AuthService();
    this.dictionaryService = new DictionaryService();
  }
}

export const services: Services = new Services();
