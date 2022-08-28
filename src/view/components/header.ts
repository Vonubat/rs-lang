import HTMLConstructor from './constructor';
import Modal from '../auth/modal';

export default class Header extends HTMLConstructor {
  modal: Modal;

  constructor() {
    super();
    this.modal = new Modal();
  }

  view(): DocumentFragment {
    const fragment = document.createDocumentFragment();
    const header = this.createHtmlElement('header', [
      'header',
      'container-fluid',
      'justify-content-between',
      'd-flex',
      'text-center',
      'align-items-center',
      'header',
    ]);
    const a = this.a('..main/index.html', ['logo-link']);
    const img = this.img('../../assets/favicons/favicon-96.png', 'logo', ['logo-img']);
    a.appendChild(img);
    header.appendChild(a);
    header.appendChild(this.modal.modal('Login'));
    header.appendChild(this.modal.modal('Registration'));
    const buttonWrapper = this.div(['login-btn-wrapper']);
    const loginButton = this.a('#LoginModal', ['btn', 'btn-outline-dark']);
    const logened = this.inSystem();
    header.appendChild(logened);
    loginButton.setAttribute('data-bs-toggle', 'modal');
    loginButton.setAttribute('data-bs-target', '#LoginModal');
    const svg = this.svg('lock', ['login-svg']);
    loginButton.innerText = 'Login';
    loginButton.appendChild(svg);
    buttonWrapper.appendChild(loginButton);
    header.appendChild(buttonWrapper);
    fragment.appendChild(header);
    return fragment;
  }

  private inSystem(): DocumentFragment {
    const fragment = document.createDocumentFragment();
    const wrapper = this.div(['logined', 'd-flex', 'flex-column']);
    const name = this.span(['logined-name']);
    // ToDO сюда вставить имя пользователя из localStore
    name.innerText = '';
    const email = this.span(['logined-email']);
    // ToDO сюда вставить email пользователя из localStore
    email.innerText = '';
    wrapper.appendChild(name);
    wrapper.appendChild(email);
    fragment.appendChild(wrapper);
    return fragment;
  }
}
