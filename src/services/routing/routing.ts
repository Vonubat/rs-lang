import { View } from '../../view/view';

export class Rout {
  private routes = [
    ['menuMain', '/'],
    ['menuTextbook', '/textbook'],
    ['menuDictionary', '/dictionary'],
    ['menuMinigames', '/games'],
    ['menuStatistics', '/statistic'],
  ];

  view: View;

  private textbook = '/textbook';

  private dictionary = '/dictionary';

  private games = '/games';

  private statistic = '/statistic';

  private oldId = 'menuMain';

  constructor() {
    this.view = new View();
  }

  routing(event: Event): void {
    const target = event.target as HTMLElement;
    if (target.classList.contains('nav-link')) {
      const { id } = target;
      if (id !== this.oldId) {
        this.onNavigate(id);
        this.onActiveNav(id);
        this.pageName(id);
      }
    }
  }

  private onNavigate = (id: string): void => {
    const rootDiv = document.getElementById('main') as HTMLElement;
    rootDiv.innerHTML = '';
    switch (id) {
      case 'menuMain':
        window.history.pushState({}, '/', `${window.location.origin}/`);
        rootDiv?.append(this.view.mainView.view());
        break;
      case 'menuTextbook':
        window.history.pushState({}, '/textbook', `${window.location.origin}/textbook`);
        this.view.drawTextbook();
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

  private pageName = (id: string): void => {
    const name = id.slice(4);
    const menuTitle = document.querySelector('.header-title') as HTMLElement;
    menuTitle.innerText = name;
  };

  /* private burger() {
    const burgerButton = document.querySelector('.burger') as HTMLElement;
    const menu = document.getElementById('navmenu') as HTMLElement;
    burgerButton.addEventListener('click', () => {
      menu.classList.toggle('hide');
    }) 
  } */
}

export const routing: Rout = new Rout();
