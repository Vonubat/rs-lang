import HTMLConstructor from '../../view/components/constructor';

export class Burger extends HTMLConstructor {
  draw() {
    const fragment = document.createDocumentFragment();
    const a = this.div(['burger']);
    const svg = this.svg('list');
    a.append(svg);
    fragment.append(a);
    return fragment;
  }

  listener() {
    const burger = document.querySelector('.burger') as HTMLElement;
    const navWrapper = document.querySelector('.offcanvas-md') as HTMLElement;
    const headerTitle = document.querySelector('.header-title') as HTMLElement;
    const nav = document.querySelector('.nav') as HTMLElement;
    burger.addEventListener('click', () => {
      navWrapper.classList.toggle('show');
      headerTitle.classList.toggle('hide');
      burger.classList.toggle('active');
    });

    nav.addEventListener('click', (event) => {
      if ((event.target as HTMLElement).classList.contains('nav-link')) {
        navWrapper.classList.remove('show');
        headerTitle.classList.remove('hide');
        burger.classList.remove('active');
      }
    });
  }
}

export const burger = new Burger();
