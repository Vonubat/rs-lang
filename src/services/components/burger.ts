import HTMLConstructor from '../../view/components/constructor';

export class Burger extends HTMLConstructor {
  public draw(): DocumentFragment {
    const fragment: DocumentFragment = document.createDocumentFragment();
    const a: HTMLDivElement = this.div(['burger']);
    const svg: SVGSVGElement = this.svg('list');
    a.append(svg);
    fragment.append(a);
    return fragment;
  }

  public listener(): void {
    const burger: HTMLElement = document.querySelector('.burger') as HTMLElement;
    const navWrapper: HTMLElement = document.querySelector('.sidebarmenu') as HTMLElement;
    const headerTitle: HTMLElement = document.querySelector('.header-title') as HTMLElement;
    const nav: HTMLElement = document.querySelector('.nav') as HTMLElement;
    const headerWrapper: HTMLElement = document.querySelector('.header-wrapper') as HTMLElement;
    const main: HTMLElement = document.getElementById('main') as HTMLElement;
    const body: HTMLElement = document.getElementById('body') as HTMLElement;
    burger.addEventListener('click', () => {
      navWrapper.classList.toggle('show-menu');
      headerTitle.classList.toggle('hide');
      burger.classList.toggle('active');
      headerWrapper.classList.toggle('disabled');
      main.classList.toggle('disabled');
      body.classList.toggle('hidden');
    });

    nav.addEventListener('click', (event: MouseEvent): void => {
      if ((event.target as HTMLElement).classList.contains('nav-link')) {
        navWrapper.classList.remove('show-menu');
        headerTitle.classList.remove('hide');
        burger.classList.remove('active');
        headerWrapper.classList.remove('disabled');
        main.classList.remove('disabled');
        body.classList.remove('hidden');
      }
    });
  }
}

export const burger: Burger = new Burger();
