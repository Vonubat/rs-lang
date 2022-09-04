import AuthService from './auth/auth-service';
import PageConfig from './components/page-config';
import SoundHelper from './components/sound-helper';
import DictionaryService from './dictionary/dictionary-service';
import GamesService from './games/games-service';
import TextbookService from './textbook/textbook-service';

export class Services {
  textbookService: TextbookService;

  authService: AuthService;

  pageConfig: PageConfig;

  dictionaryService: DictionaryService;

  gamesService: GamesService;

  soundHelper: SoundHelper;

  constructor() {
    this.textbookService = new TextbookService();
    this.pageConfig = new PageConfig();
    this.soundHelper = new SoundHelper();
    this.authService = new AuthService();
    this.dictionaryService = new DictionaryService();
    this.gamesService = new GamesService();
  }
}
export const services: Services = new Services();
