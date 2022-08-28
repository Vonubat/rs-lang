import HTMLConstructor from './constructor';
import Modal from '../auth/modal';

export default class Header extends HTMLConstructor {
  modal: Modal;

  icon!: SVGSVGElement;

  loginBtn!: HTMLElement;

  constructor() {
    super();
    this.modal = new Modal();
  }

  view(): DocumentFragment {
    const fragment: DocumentFragment = document.createDocumentFragment();
    const header: HTMLElement = this.createHtmlElement('header', [
      'justify-content-between',
      'd-flex',
      'text-center',
      'align-items-center',
      'header',
    ]);
    const a: HTMLAnchorElement = this.a('..main/index.html', ['logo-link']);
    const img: HTMLImageElement = this.img('../../assets/favicons/favicon-96.png', 'logo', ['logo-img']);
    a.appendChild(img);
    header.appendChild(a);
    header.appendChild(this.modal.modal('Login'));
    header.appendChild(this.modal.modal('Registration'));
    const buttonWrapper: HTMLDivElement = this.div(['login-btn-wrapper']);
    const loginButton: HTMLElement = this.createHtmlElement('a', ['btn', 'btn-outline-dark'], 'login-btn', [
      ['data-bs-toggle', 'modal'],
      ['data-bs-target', '#login-modal'],
    ]);
    loginButton.setAttribute('data-bs-toggle', 'modal');
    loginButton.setAttribute('data-bs-target', '#login-modal');
    const svg: SVGSVGElement = this.svg('lock', ['login-svg']);
    loginButton.innerText = 'Log In';
    loginButton.appendChild(svg);
    buttonWrapper.appendChild(loginButton);
    header.appendChild(buttonWrapper);
    fragment.appendChild(header);

    this.icon = svg;
    return fragment;
  }
}
