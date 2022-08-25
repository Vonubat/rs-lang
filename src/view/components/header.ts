import HTMLConstructor from './constructor';

export default class Header {
  HTMLConstructor: HTMLConstructor;

  constructor() {
    this.HTMLConstructor = new HTMLConstructor();
  }

  view() {
    const fragment = document.createDocumentFragment();

    const header = this.HTMLConstructor.basic('header', undefined, [
      'header',
      'container-fluid',
      'justify-content-between',
      'd-flex',
      'text-center',
      'align-items-center',
    ]);
    const a = this.HTMLConstructor.basic('a', undefined, ['logo-link'], [['href', '..main/index.html']]);
    const img = this.HTMLConstructor.basic(
      'img',
      undefined,
      ['logo-img'],
      [
        ['src', '../../assets/favicons/favicon-96.png'],
        ['alt', 'logo'],
      ]
    );
    a.appendChild(img);
    header.appendChild(a);
    const buttonWrapper = this.HTMLConstructor.basic('div');
    const loginButton = this.HTMLConstructor.basic(
      'button',
      undefined,
      ['btn', 'btn-outline-dark'],
      [['type', 'button']]
    );
    const svg = this.HTMLConstructor.svg('lock', ['login-svg']);
    loginButton.innerText = 'Login';
    loginButton.appendChild(svg);
    buttonWrapper.appendChild(loginButton);
    header.appendChild(buttonWrapper);

    fragment.appendChild(header);

    return fragment;
  }
}
