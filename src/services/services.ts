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
  private _textbookService: TextbookService;

  private _authService: AuthService;

  private _pageConfig: PageConfig;

  private _dictionaryService: DictionaryService;

  private _gamesService: GamesService;

  private _soundHelper: SoundHelper;

  private _statisticsService: StatisticsService;

  private _timer: Timer;

  private _gamesData: GamesData;

  private _sprintService: SprintService;

  constructor() {
    this._textbookService = new TextbookService();
    this._pageConfig = new PageConfig();
    this._soundHelper = new SoundHelper();
    this._authService = new AuthService();
    this._dictionaryService = new DictionaryService();
    this._gamesService = new GamesService();
    this._statisticsService = new StatisticsService();
    this._soundHelper = new SoundHelper();
    this._timer = new Timer();
    this._gamesData = new GamesData();
    this._sprintService = new SprintService();
  }

  get textbookService(): TextbookService {
    return this._textbookService;
  }

  public get authService(): AuthService {
    return this._authService;
  }

  public get pageConfig(): PageConfig {
    return this._pageConfig;
  }

  public get dictionaryService(): DictionaryService {
    return this._dictionaryService;
  }

  public get gamesService(): GamesService {
    return this._gamesService;
  }

  public get soundHelper(): SoundHelper {
    return this._soundHelper;
  }

  public get statisticsService(): StatisticsService {
    return this._statisticsService;
  }

  public get timer(): Timer {
    return this._timer;
  }

  public get gamesData(): GamesData {
    return this._gamesData;
  }

  public get sprintService(): SprintService {
    return this._sprintService;
  }
}
export const services: Services = new Services();
