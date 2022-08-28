import Main from '../../view/main/main';
import TextbookService from '../textbook/textbook-service';

export class Rout {
  private routes = [
    ['menuMain', '/'],
    ['menuTextbook', '/textbook'],
    ['menuDictionary', '/dictionary'],
    ['menuMinigames', '/games'],
    ['menuStatistics', '/statistic'],
  ];

  private main: Main;

  private textbookService: TextbookService;

  private textbook = '/textbook';

  private dictionary = '/dictionary';

  private games = '/games';

  private statistic = '/statistic';

  private oldId = 'menuMain';

  constructor() {
    this.main = new Main();
    this.textbookService = new TextbookService();
  }

  routing(event: Event): void {
    const target = event.target as HTMLElement;
    if (target.classList.contains('nav-link')) {
      const { id } = target;
      if (id !== this.oldId) {
        this.onNavigate(id);
        this.onActiveNav(id);
      }
    }
  }

  private onNavigate = (id: string): void => {
    const rootDiv = document.getElementById('main') as HTMLElement;
    rootDiv.innerHTML = '';
    switch (id) {
      case 'menuMain':
        window.history.pushState({}, '/', `${window.location.origin}/`);
        rootDiv?.append(this.main.view());
        break;
      case 'menuTextbook':
        window.history.pushState({}, '/textbook', `${window.location.origin}/textbook`);
        this.textbookService.drawPage();
        break;
      case 'menuDictionary':
        window.history.pushState({}, '/dictionary', `${window.location.origin}/dictionary`);
        // TO DO
        break;
      case 'menuMinigames':
        window.history.pushState({}, '/games', `${window.location.origin}/games`);
        // TO DO
        break;
      case 'menuStatistics':
        window.history.pushState({}, '/statistic', `${window.location.origin}/statistic`);
        // TO DO
        break;
      default:
        break;
    }
    this.oldId = id;
  };

  private onActiveNav = (id: string): void => {
    const links = document.querySelectorAll('.nav-link');
    links.forEach((link) => {
      link.classList.remove('active');
      if (link.id === id) link.classList.add('active');
    });
  };
}

export const routing: Rout = new Rout();
