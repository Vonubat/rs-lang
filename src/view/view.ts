import { services } from '../services/services';
import HTMLConstructor from './components/constructor';
import Header from './components/header';
import Loading from './components/loading';
import Footer from './components/footer';
import MainView from './main/main-view';
import Menu from './menu/menu';
import TextbookView from './textbook/textbook-view';
import DictionaryView from './dictionary/dictionary-view';
import Statistics from './statistics/statistics-view';

export class View {
  htmlConstructor: HTMLConstructor;

  menu: Menu;

  header: Header;

  footer: Footer;

  mainView: MainView;

  textbookView: TextbookView;

  loading: Loading;

  dictionaryView: DictionaryView;

  statistics: Statistics;

  constructor() {
    this.htmlConstructor = new HTMLConstructor();
    this.menu = new Menu();
    this.header = new Header();
    this.footer = new Footer();
    this.mainView = new MainView();
    this.textbookView = new TextbookView();
    this.dictionaryView = new DictionaryView();
    this.loading = new Loading();
    this.statistics = new Statistics();
  }

  drawHeader(): DocumentFragment {
    const headerElement: DocumentFragment = this.header.view();
    return headerElement;
  }

  drawFooter(): HTMLElement {
    const footerElement: HTMLElement = this.footer.view();
    return footerElement;
  }

  async drawTextbook(): Promise<void> {
    await services.textbookService.drawPage();
  }

  async drawDictionary(): Promise<void> {
    await services.dictionaryService.drawPage();
  }

  async drawStatistics() {
    // throw new Error('Method not implemented.');
    await this.statistics.drawPage();
  }

  drawMainPage(): void {
    const body: HTMLElement = document.getElementById('body') as HTMLElement;
    const appWrapper: HTMLDivElement = this.htmlConstructor.div(['app-wrapper', 'd-flex', 'flex-nowrap']);
    body.append(appWrapper);

    const menuElement: HTMLDivElement = this.menu.getMenu();
    const appElement: HTMLDivElement = this.htmlConstructor.div(['app']);
    const mainElement: HTMLElement = this.htmlConstructor.createHtmlElement('main', undefined, 'main');
    const mainContent: DocumentFragment = this.mainView.view();
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
