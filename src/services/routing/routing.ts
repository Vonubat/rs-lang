import { View } from '../../view/view';

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

  constructor() {
    this.view = new View();
  }

  /* routing(): void {
    window.onpopstate = this.handleLocation;
    (window as any).route = this.route;
    this.handleLocation();
  } */

  routingHash(): void {
    window.addEventListener('hashchange', this.handleLocation);
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
    const path = window.location.hash;
    const id = `menu-${path === '' ? 'main' : path.slice(1)}`;
    this.onNavigate();
    this.onActiveNav(id);
    this.pageName(id);
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
        rootDiv?.append(this.view.mainView.view());
        break;
      case 'textbook':
        this.view.drawTextbook();
        break;
      case 'dictionary':
        this.view.drawDictionary();
        break;
      case 'minigames':
        // TO DO
        break;
      case 'statistics':
        // TO DO
        break;
      default:
        break;
    }
    // this.oldId = id;
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
}

export const routing: Route = new Route();
