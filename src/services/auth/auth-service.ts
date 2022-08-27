import { api } from '../../api/api';
import CheckApiParams from '../../utilities/check-api-params';

export default class AuthService {
  checkParams: CheckApiParams;

  signUpButton!: HTMLButtonElement;

  signInButton!: HTMLButtonElement;

  closeModalLogin!: HTMLButtonElement;

  closeModalRegistration!: HTMLButtonElement;

  emailLoginInput!: HTMLInputElement;

  passwordLoginInput!: HTMLInputElement;

  nameRegistrationInput!: HTMLInputElement;

  emailRegistrationInput!: HTMLInputElement;

  passwordRegistrationInput!: HTMLInputElement;

  constructor() {
    this.checkParams = new CheckApiParams();
  }

  checkUser(): boolean {
    const userName: string | null = localStorage.getItem('userName');
    if (userName) {
      return true;
    }
    return false;
  }

  signIn(): boolean {
    try {
      const email: string = this.emailLoginInput.value;
      const password: string = this.passwordLoginInput.value;
      this.checkParams.checkEmail(email);
      this.checkParams.checkPassword(password);
      api.auth.signIn({ email, password });
      this.closeModalLogin.dispatchEvent(new Event('click'));
      return true;
    } catch {
      return false;
    }
  }

  setModalWindowsItems(): void {
    this.signInButton = document.getElementById('sign-in') as HTMLButtonElement;
    this.signUpButton = document.getElementById('sign-up') as HTMLButtonElement;
    this.closeModalLogin = document.getElementById('close-modal-login') as HTMLButtonElement;
    this.closeModalRegistration = document.getElementById('close-modal-registration') as HTMLButtonElement;
    this.emailLoginInput = document.getElementById('email-login-input') as HTMLInputElement;
    this.passwordLoginInput = document.getElementById('password-login-input') as HTMLInputElement;
    this.nameRegistrationInput = document.getElementById('name-registration-input') as HTMLInputElement;
    this.emailRegistrationInput = document.getElementById('email-registration-input') as HTMLInputElement;
    this.passwordRegistrationInput = document.getElementById('password-registration-input') as HTMLInputElement;
  }

  listenModalWindows() {
    this.signInButton.addEventListener('click', this.signIn.bind(this));
  }
}
