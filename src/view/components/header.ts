import HTMLConstructor from './constructor';
import Modal from '../auth/modal';
import { burger } from '../../services/components/burger';

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
      'bg-dark',
    ]);
    header.appendChild(burger.draw());
    const div = this.div(['header-wrapper']);
    const h1 = this.createHtmlElement('h1', ['header-title']);
    h1.innerText = 'Main';
    div.appendChild(h1);
    div.appendChild(this.modal.modal('Login'));
    div.appendChild(this.modal.modal('Registration'));
    const buttonWrapper: HTMLDivElement = this.div(['login-btn-wrapper']);
    const loginButton: HTMLElement = this.createHtmlElement('a', ['btn', 'btn-outline-light'], 'login-btn', [
      ['data-bs-toggle', 'modal'],
      ['data-bs-target', '#login-modal'],
    ]);
    loginButton.setAttribute('data-bs-toggle', 'modal');
    loginButton.setAttribute('data-bs-target', '#login-modal');
    const svg: SVGSVGElement = this.svg('lock', ['login-svg']);
    loginButton.innerText = 'Log In';
    loginButton.appendChild(svg);
    buttonWrapper.appendChild(loginButton);
    div.appendChild(buttonWrapper);
    header.appendChild(div);
    fragment.appendChild(header);
    this.icon = svg;
    return fragment;
  }
}
