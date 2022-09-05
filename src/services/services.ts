import AuthService from './auth/auth-service';
import PageConfig from './components/page-config';
import SoundHelper from './components/sound-helper';
import DictionaryService from './dictionary/dictionary-service';
import GamesService from './games/games-service';
import StatisticsService from './statistics/statistics-service';
import SprintService from './games/sprint/sprint-service';
import Timer from './games/timer';
import TextbookService from './textbook/textbook-service';
import GamesData from './games/games-data';

export class Services {
  textbookService: TextbookService;

  authService: AuthService;

  pageConfig: PageConfig;

  dictionaryService: DictionaryService;

  gamesService: GamesService;

  soundHelper: SoundHelper;

  statisticsService: StatisticsService;

  timer: Timer;

  gamesData: GamesData;

  sprintService: SprintService;

  constructor() {
    this.textbookService = new TextbookService();
    this.pageConfig = new PageConfig();
    this.soundHelper = new SoundHelper();
    this.authService = new AuthService();
    this.dictionaryService = new DictionaryService();
    this.gamesService = new GamesService();
    this.statisticsService = new StatisticsService();
    this.soundHelper = new SoundHelper();
    this.timer = new Timer();
    this.gamesData = new GamesData();
    this.sprintService = new SprintService();
  }
}
export const services: Services = new Services();
