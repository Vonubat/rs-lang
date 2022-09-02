import AuthService from './auth/auth-service';
import PageConfig from './components/page-config';
import SoundHelper from './components/sound-helper';
import DictionaryService from './dictionary/dictionary-service';
import GamesData from './games/games-data';
import GamesService from './games/games-service';
import SprintService from './games/sprint/sprint-service';
import Timer from './games/timer';
import TextbookService from './textbook/textbook-service';

export class Services {
  textbookService: TextbookService;

  authService: AuthService;

  pageConfig: PageConfig;

  dictionaryService: DictionaryService;

  gamesService: GamesService;

  soundHelper: SoundHelper;

  timer: Timer;

  gamesData: GamesData;

  sprintService: SprintService;

  constructor() {
    this.textbookService = new TextbookService();
    this.pageConfig = new PageConfig();
    this.authService = new AuthService();
    this.dictionaryService = new DictionaryService();
    this.gamesService = new GamesService();
    this.soundHelper = new SoundHelper();
    this.timer = new Timer();
    this.gamesData = new GamesData();
    this.sprintService = new SprintService();
  }
}

export const services: Services = new Services();
