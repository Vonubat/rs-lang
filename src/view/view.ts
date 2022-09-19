import { services } from '../services/services';
import HTMLConstructor from './components/constructor';
import Header from './components/header';
import Loading from './components/loading';
import Footer from './components/footer';
import MainView from './main/main-view';
import Menu from './menu/menu';
import TextbookView from './textbook/textbook-view';
import DictionaryView from './dictionary/dictionary-view';
import GamesView from './games/games-view';
import Statistics from './statistics/statistics-view';

export class View {
  private _htmlConstructor: HTMLConstructor;

  public get htmlConstructor(): HTMLConstructor {
    return this._htmlConstructor;
  }

  private _menu: Menu;

  public get menu(): Menu {
    return this._menu;
  }

  private _header: Header;

  public get header(): Header {
    return this._header;
  }

  private _footer: Footer;

  public get footer(): Footer {
    return this._footer;
  }

  private _mainView: MainView;

  public get mainView(): MainView {
    return this._mainView;
  }

  private _textbookView: TextbookView;

  public get textbookView(): TextbookView {
    return this._textbookView;
  }

  private _loading: Loading;

  public get loading(): Loading {
    return this._loading;
  }

  private _dictionaryView: DictionaryView;

  public get dictionaryView(): DictionaryView {
    return this._dictionaryView;
  }

  private _gamesView: GamesView;

  public get gamesView(): GamesView {
    return this._gamesView;
  }

  private _statistics: Statistics;

  public get statistics(): Statistics {
    return this._statistics;
  }

  constructor() {
    this._htmlConstructor = new HTMLConstructor();
    this._menu = new Menu();
    this._header = new Header();
    this._footer = new Footer();
    this._mainView = new MainView();
    this._textbookView = new TextbookView();
    this._dictionaryView = new DictionaryView();
    this._gamesView = new GamesView();
    this._loading = new Loading();
    this._statistics = new Statistics();
  }

  drawHeader(): DocumentFragment {
    const headerElement: DocumentFragment = this._header.view();
    return headerElement;
  }

  drawFooter(): HTMLElement {
    const footerElement: HTMLElement = this._footer.view();
    return footerElement;
  }

  async drawTextbook(): Promise<void> {
    await services.textbookService.drawPage();
  }

  async drawDictionary(): Promise<void> {
    await services.dictionaryService.drawPage();
  }

  drawGamesCards(): void {
    services.gamesService.drawPage();
  }

  async drawStatistics(): Promise<void> {
    await this._statistics.drawPage();
  }

  drawMainPage(): void {
    const body: HTMLElement = document.getElementById('body') as HTMLElement;
    const appWrapper: HTMLDivElement = this._htmlConstructor.div(['app-wrapper', 'd-flex', 'flex-nowrap']);
    body.append(appWrapper);

    const menuElement: HTMLDivElement = this._menu.getMenu();
    const appElement: HTMLDivElement = this._htmlConstructor.div(['app']);
    const mainElement: HTMLElement = this._htmlConstructor.createHtmlElement('main', undefined, 'main');
    const mainContent: DocumentFragment = this._mainView.view();
    mainElement.append(mainContent);

    const footerElement: HTMLElement = this.drawFooter();
    const headerElement: DocumentFragment = this.drawHeader();

    appElement.append(headerElement, mainElement, footerElement);
    appWrapper.append(menuElement, appElement);

    services.authService.setModalWindowsItems();
    services.authService.listenAuth();
  }
}

export const view: View = new View();
