import { View } from '../../view/view';
import NotFound from '../../view/components/not_found';
import Utils from '../../utilities/utils';

export class Route {
  private view: View;

  private notFound: NotFound;

  constructor() {
    this.view = new View();
    this.notFound = new NotFound();
  }

  public routingHash(): void {
    window.addEventListener('hashchange', (): void => {
      this.handleLocation();
      this.pageBG();
    });
    this.handleLocation();
  }

  private handleLocation: () => void = (): void => {
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

  private onNavigate: () => void = (): void => {
    const rootDiv: HTMLElement = document.getElementById('main') as HTMLElement;
    rootDiv.innerHTML = '';

    let path: string = window.location.hash.replace('#', '');
    if (path.length === 0) {
      path = '/';
    }
    switch (path) {
      case '/':
        rootDiv.append(this.view.mainView.view());
        this.view.footer.showFooter();
        break;
      case 'textbook':
        this.view.drawTextbook();
        this.view.footer.showFooter();
        break;
      case 'dictionary':
        this.view.drawDictionary();
        this.view.footer.showFooter();
        break;
      case 'games':
        this.view.drawGamesCards();
        this.view.footer.hideFooter();
        break;
      case 'statistics':
        this.view.footer.showFooter();
        this.view.drawStatistics();
        break;
      default:
        rootDiv.append(this.notFound.notFound());
        break;
    }
  };

  private onActiveNav: (id: string) => void = (id: string): void => {
    const links: NodeListOf<HTMLElement> = document.querySelectorAll('.nav-link');
    links.forEach((link: HTMLElement): void => {
      link.classList.remove('active');
      if (link.id === id) link.classList.add('active');
    });
  };

  public static checkUrl(address: string): boolean {
    const url: string = window.location.hash.slice(1);
    if (url === address) {
      return true;
    }
    return false;
  }

  private pageName: (id: string) => void = (id: string): void => {
    const name: string = id.slice(5).toUpperCase();
    const menuTitle: HTMLElement = document.querySelector('.header-title') as HTMLElement;
    menuTitle.innerText = name;
  };

  private pageBG(): void {
    const main: HTMLElement = document.getElementById('main') as HTMLElement;
    Utils.resetBackground(main);
  }
}

export const routing: Route = new Route();
