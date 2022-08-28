import HTMLConstructor from '../components/constructor';

export default class Modal extends HTMLConstructor {
  modal(typeofModal: 'Login' | 'Registration'): DocumentFragment {
    const fragment: DocumentFragment = document.createDocumentFragment();
    const modal: HTMLElement = this.createHtmlElement(
      'div',
      ['modal', 'fade'],
      `${typeofModal.toLocaleLowerCase()}-modal`,
      [
        ['aria-hidden', 'true'],
        ['aria-labelledby', 'popTitleLabel'],
        ['tabindex', '-1'],
      ]
    );
    const modalDial: HTMLDivElement = this.div(['modal-dialog', 'modal-dialog-centered']);
    const modalContent: HTMLDivElement = this.div(['modal-content']);
    const modalHeader: DocumentFragment = this.modalHeader(typeofModal);
    const form: HTMLElement = this.createHtmlElement('form', ['modal-body']);
    if (typeofModal === 'Registration') {
      const formName: DocumentFragment = this.formInput('Name', 'text', typeofModal);
      form.appendChild(formName);
    }
    const formLogin: DocumentFragment = this.formInput(`Email`, 'email', typeofModal);
    const formPass: DocumentFragment = this.formInput(`Password`, 'password', typeofModal);
    const modalFooter: DocumentFragment = this.modalFooter(typeofModal);
    form.appendChild(formLogin);
    form.appendChild(formPass);
    modalContent.appendChild(modalHeader);
    form.appendChild(modalFooter);
    modalContent.appendChild(form);
    modalDial.appendChild(modalContent);
    modal.appendChild(modalDial);
    fragment.appendChild(modal);
    return fragment;
  }

  private formInput(
    name: string,
    typeOfInput: 'email' | 'password' | 'text',
    typeofModal: 'Login' | 'Registration'
  ): DocumentFragment {
    const fragment: DocumentFragment = document.createDocumentFragment();
    const div: HTMLDivElement = this.div([`form-div-${name}`]);
    const label: HTMLElement = this.createHtmlElement('label', ['form-label'], undefined, [
      ['for', `${name}InputLabel`],
    ]);
    const input: HTMLInputElement = this.createHtmlElement(
      'input',
      ['form-control'],
      `${name.toLowerCase()}-${typeofModal.toLowerCase()}-input`,
      [
        ['placeholder', `${name}`],
        ['type', typeOfInput],
      ]
    ) as HTMLInputElement;
    input.required = true;
    input.autocomplete = 'off';
    if (typeOfInput === 'password') input.setAttribute('minlength', '8');
    div.appendChild(label);
    div.appendChild(input);
    fragment.appendChild(div);
    return fragment;
  }

  private modalHeader(typeofModal: 'Login' | 'Registration'): DocumentFragment {
    const fragment: DocumentFragment = document.createDocumentFragment();
    const header: HTMLDivElement = this.div(['modal-header']);
    const title: HTMLElement = this.createHtmlElement(
      'h5',
      ['modal-title', 'text-center'],
      `${typeofModal}popTitleLabel`
    );
    title.innerText = typeofModal;
    const closeButton: HTMLElement = this.createHtmlElement(
      'button',
      ['btn-close'],
      `close-modal-${typeofModal.toLocaleLowerCase()}`,
      [
        ['data-bs-dismiss', 'modal'],
        ['aria-label', 'Закрыть'],
      ]
    );
    header.appendChild(title);
    header.appendChild(closeButton);
    fragment.appendChild(header);
    return fragment;
  }

  private modalFooter(typeofModal: 'Login' | 'Registration'): DocumentFragment {
    const fragment: DocumentFragment = document.createDocumentFragment();
    const footer: HTMLDivElement = this.div(['modal-footer', 'flex-column']);
    const errorMessage: HTMLElement = this.createHtmlElement(
      'span',
      ['text-danger'],
      `error-message-${typeofModal.toLocaleLowerCase()}`,
      undefined,
      'Failed to connect'
    );
    errorMessage.style.display = 'none';
    const button: HTMLButtonElement = this.button(['btn', 'btn-primary'], 'submit');
    const linkTo: HTMLElement = this.createHtmlElement('a', [], undefined, [['data-bs-toggle', 'modal']]);
    if (typeofModal === 'Login') {
      button.innerText = 'SIGN IN';
      button.id = 'sign-in';
      linkTo.setAttribute('href', '#registration-modal');
      linkTo.innerText = "Don't have an account? Sign Up";
    }
    if (typeofModal === 'Registration') {
      button.innerText = 'SIGN UP';
      button.id = 'sign-up';
      linkTo.setAttribute('href', '#login-modal');
      linkTo.innerText = 'Do you have an account? Sign In';
    }
    footer.appendChild(errorMessage);
    footer.appendChild(button);
    footer.appendChild(linkTo);
    fragment.appendChild(footer);
    return fragment;
  }
}
