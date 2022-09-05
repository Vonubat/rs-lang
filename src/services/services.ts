import AuthService from './auth/auth-service';
import PageConfig from './components/page-config';
import SoundHelper from './components/sound-helper';
import DictionaryService from './dictionary/dictionary-service';
import GamesService from './games/games-service';
/* <<<<<<< HEAD
import SprintService from './games/sprint/sprint-service';
import Timer from './games/timer';
import StatisticsService from './statistics/statistics-service';
=======
>>>>>>> minigames */
import TextbookService from './textbook/textbook-service';

export class Services {
  textbookService: TextbookService;

  authService: AuthService;

  pageConfig: PageConfig;

  dictionaryService: DictionaryService;

  gamesService: GamesService;

  soundHelper: SoundHelper;

/* <<<<<<< HEAD
  timer: Timer;

  gamesData: GamesData;

  sprintService: SprintService;

  statisticsService: StatisticsService;

=======
>>>>>>> minigames */
  constructor() {
    this.textbookService = new TextbookService();
    this.pageConfig = new PageConfig();
    this.soundHelper = new SoundHelper();
    this.authService = new AuthService();
    this.dictionaryService = new DictionaryService();
    this.gamesService = new GamesService();
/* <<<<<<< HEAD
    this.soundHelper = new SoundHelper();
    this.timer = new Timer();
    this.gamesData = new GamesData();
    this.sprintService = new SprintService();
    this.statisticsService = new StatisticsService();
=======
>>>>>>> minigames */
  }
}
export const services: Services = new Services();
