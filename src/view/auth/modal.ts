import HTMLConstructor from '../components/constructor';

export default class Modal extends HTMLConstructor {
  modal(type: string): DocumentFragment {
    const fragment = document.createDocumentFragment();
    const modal = this.createHtmlElement('div', ['modal', 'fade'], `${type}Modal`, [
      ['aria-hidden', 'true'],
      ['aria-labelledby', 'popTitleLabel'],
      ['tabindex', '-1'],
    ]);
    const modalDial = this.div(['modal-dialog', 'modal-dialog-centered']);
    const modalContent = this.div(['modal-content']);
    const modalHeader = this.modalHeader(type);
    const form = this.createHtmlElement('form', ['modal-body']);
    if (type === 'Registration') {
      const formName = this.formInput('Name', 'text');
      form.appendChild(formName);
    }
    const formLogin = this.formInput('Email', 'email');
    const formPass = this.formInput('Password', 'password');
    const modalFooter = this.modalFooter(type);
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

  private formInput(name: string, type: string): DocumentFragment {
    const fragment = document.createDocumentFragment();
    const div = this.div([`form-div-${name}`]);
    const label = this.createHtmlElement('label', ['form-label'], undefined, [['for', `${name}InputLabel`]]);
    const input = this.createHtmlElement('input', ['form-control'], `${name}InputLabel`, [
      ['placeholder', `${name}`],
      ['type', type],
    ]) as HTMLInputElement;
    input.required = true;
    if (type === 'password') input.setAttribute('minlength', '8');
    div.appendChild(label);
    div.appendChild(input);
    fragment.appendChild(div);
    return fragment;
  }

  private modalHeader(type: string): DocumentFragment {
    const fragment = document.createDocumentFragment();
    const header = this.div(['modal-header']);
    const title = this.createHtmlElement('h5', ['modal-title', 'text-center'], `${type}popTitleLabel`);
    title.innerText = type;
    const closeButton = this.createHtmlElement('button', ['btn-close'], undefined, [
      ['data-bs-dismiss', 'modal'],
      ['aria-label', 'Закрыть'],
    ]);
    header.appendChild(title);
    header.appendChild(closeButton);
    fragment.appendChild(header);
    return fragment;
  }

  private modalFooter(type: string): DocumentFragment {
    const fragment = document.createDocumentFragment();
    const footer = this.div(['modal-footer', 'flex-column']);
    const button = this.button(['btn', 'btn-primary'], 'submit');
    const linkTo = this.createHtmlElement('a', [], undefined, [['data-bs-toggle', 'modal']]);
    if (type === 'Login') {
      button.innerText = 'SIGN IN';
      linkTo.setAttribute('href', '#RegistrationModal');
      linkTo.innerText = "Don't have an account? Sign Up";
    }
    if (type === 'Registration') {
      button.innerText = 'SIGN UP';
      linkTo.setAttribute('href', '#LoginModal');
      linkTo.innerText = 'Do you have an account? Sign In';
    }
    footer.appendChild(button);
    footer.appendChild(linkTo);
    fragment.appendChild(footer);
    return fragment;
  }
}
