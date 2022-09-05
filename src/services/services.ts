import AuthService from './auth/auth-service';
import PageConfig from './components/page-config';
import SoundHelper from './components/sound-helper';
import DictionaryService from './dictionary/dictionary-service';
import GamesService from './games/games-service';
import StatisticsService from './statistics/statistics-service';
/* <<<<<<< HEAD
import SprintService from './games/sprint/sprint-service';
import Timer from './games/timer';

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

  statisticsService: StatisticsService;

  /* <<<<<<< HEAD
  timer: Timer;

  gamesData: GamesData;

  sprintService: SprintService;

  

=======
>>>>>>> minigames */
  constructor() {
    this.textbookService = new TextbookService();
    this.pageConfig = new PageConfig();
    this.soundHelper = new SoundHelper();
    this.authService = new AuthService();
    this.dictionaryService = new DictionaryService();
    this.gamesService = new GamesService();
    this.statisticsService = new StatisticsService();
    /* <<<<<<< HEAD
    this.soundHelper = new SoundHelper();
    this.timer = new Timer();
    this.gamesData = new GamesData();
    this.sprintService = new SprintService();
   
=======
>>>>>>> minigames */
  }
}
export const services: Services = new Services();
