import AuthService from './auth/auth-service';
import PageConfig from './components/page-config';
import SoundHelper from './components/sound-helper';
import DictionaryService from './dictionary/dictionary-service';
import GamesService from './games/games-service';
import Timer from './games/timer';
import StatisticsService from './statistics/statistics-service';
import TextbookService from './textbook/textbook-service';

export class Services {
  textbookService: TextbookService;

  authService: AuthService;

  pageConfig: PageConfig;

  dictionaryService: DictionaryService;

  gamesService: GamesService;

  soundHelper: SoundHelper;

  timer: Timer;

  statisticsService: StatisticsService;

  constructor() {
    this.textbookService = new TextbookService();
    this.pageConfig = new PageConfig();
    this.authService = new AuthService();
    this.dictionaryService = new DictionaryService();
    this.gamesService = new GamesService();
    this.soundHelper = new SoundHelper();
    this.timer = new Timer();
    this.statisticsService = new StatisticsService();
  }
}

export const services: Services = new Services();
