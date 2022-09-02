import { View } from '../../view/view';
import NotFound from '../../view/components/not_found';
import DomHelper from '../../utilities/DOM-helpers';

export class Route {
  /* private urlTitle = 'RS Lang';

  private routes = {
    404: {
      template: '',
      title: `404 | ${this.urlTitle}`,
      description: '',
    },
    '/': {
      template: '',
      title: `Main | ${this.urlTitle}`,
      description: '',
    },
    '/textbook': {
      template: '',
      title: `Textbook | ${this.urlTitle}`,
      description: '',
    },
    '/dictionary': {
      template: '',
      title: `Dictionary | ${this.urlTitle}`,
      description: '',
    },
    '/minigames': {
      template: '',
      title: `Games | ${this.urlTitle}`,
      description: '',
    },
    '/statistics': {
      template: '',
      title: `Statistics | ${this.urlTitle}`,
      description: '',
    },
  }; */

  view: View;

  notFound: NotFound;

  constructor() {
    this.view = new View();
    this.notFound = new NotFound();
  }

  /* routing(): void {
    window.onpopstate = this.handleLocation;
    (window as any).route = this.route;
    this.handleLocation();
  } */

  routingHash(): void {
    window.addEventListener('hashchange', (): void => {
      this.handleLocation();
      this.pageBG();
    });
    this.handleLocation();
    /* window.onpopstate = this.handleLocation;
    (window as any).route = this.route;
    this.handleLocation(); */
  }

  /* private route = (event: Event) => {
    event = event || window.event;
    event.preventDefault();
    window.history.pushState({}, '', (event.target as HTMLAnchorElement).href);
    this.handleLocation();
  }; */

  private handleLocation = () => {
    this.onNavigate();
    const path = window.location.hash;
    const id = `menu-${path === '' ? 'main' : path.slice(1)}`;
    if (document.getElementById(id)) {
      this.onActiveNav(id);
      this.pageName(id);
    } else {
      this.onActiveNav('Page not found');
      this.pageName('.....Page not found');
    }
  };

  private onNavigate = (): void => {
    const rootDiv = document.getElementById('main') as HTMLElement;
    rootDiv.innerHTML = '';
    // let path = window.location.pathname;
    let path = window.location.hash.replace('#', '');
    if (path.length === 0) {
      path = '/';
    }
    switch (path) {
      case '/':
        rootDiv.append(this.view.mainView.view());
        break;
      case 'textbook':
        this.view.drawTextbook();
        break;
      case 'dictionary':
        this.view.drawDictionary();
        break;
      case 'minigames':
        this.view.drawGamesCards();
        break;
      case 'statistics':
        // TO DO
        break;
      default:
        rootDiv.append(this.notFound.notFound());
        break;
    }
  };

  private onActiveNav = (id: string): void => {
    const links = document.querySelectorAll('.nav-link');
    links.forEach((link) => {
      link.classList.remove('active');
      if (link.id === id) link.classList.add('active');
    });
  };

  static checkUrl(address: string): boolean {
    const url: string = window.location.hash.slice(1);
    if (url === address) {
      return true;
    }
    return false;
  }

  private pageName = (id: string): void => {
    const name = id.slice(5).toUpperCase();
    const menuTitle = document.querySelector('.header-title') as HTMLElement;
    menuTitle.innerText = name;
  };

  private pageBG(): void {
    const main: HTMLElement = document.getElementById('main') as HTMLElement;
    DomHelper.resetBackground(main);
  }
}

export const routing: Route = new Route();
