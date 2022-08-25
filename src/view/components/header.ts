import HTMLConstructor from './constructor';

export default class Header {
  HTMLConstructor: HTMLConstructor;

  constructor() {
    this.HTMLConstructor = new HTMLConstructor();
  }

  view() {
    const fragment = document.createDocumentFragment();

    const header = this.HTMLConstructor.createHtmlElement('header', [
      'header',
      'container-fluid',
      'justify-content-between',
      'd-flex',
      'text-center',
      'align-items-center',
    ]);
    const a = this.HTMLConstructor.createHtmlElement('a', ['logo-link'], undefined, [['href', '..main/index.html']]);
    const img = this.HTMLConstructor.createHtmlElement(
      'img',

      ['logo-img'],
      undefined,
      [
        ['src', '../../assets/favicons/favicon-96.png'],
        ['alt', 'logo'],
      ]
    );
    a.appendChild(img);
    header.appendChild(a);
    const buttonWrapper = this.HTMLConstructor.div();
    const loginButton = this.HTMLConstructor.button(['btn', 'btn-outline-dark']);
    const svg = this.HTMLConstructor.svg('lock', ['login-svg']);
    loginButton.innerText = 'Login';
    loginButton.appendChild(svg);
    buttonWrapper.appendChild(loginButton);
    header.appendChild(buttonWrapper);

    fragment.appendChild(header);

    return fragment;
  }
}
