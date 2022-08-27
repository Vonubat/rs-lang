import { api } from '../../api/api';
import { AuthResponseSchema } from '../../types/types';
import CheckApiParams from '../../utilities/check-api-params';
import Credentials from './credentials';

export default class AuthService {
  checkParams: CheckApiParams;

  signUpButton!: HTMLButtonElement;

  signInButton!: HTMLButtonElement;

  errorMessageLogin!: HTMLSpanElement;

  errorMessageRegistarion!: HTMLSpanElement;

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

  errorHandler(response: Response): false {
    if (response.status === 403) {
      this.errorMessageLogin.innerHTML = 'Incorrect e-mail or password';
      this.errorMessageLogin.style.display = '';
    }
    if (response.status === 404) {
      this.errorMessageLogin.innerHTML = 'Failed to connect';
      this.errorMessageLogin.style.display = '';
    }
    return false;
  }

  checkUser(): boolean {
    const userName: string | null = localStorage.getItem('userName');
    if (userName) {
      return true;
    }
    return false;
  }

  async signIn(): Promise<boolean> {
    try {
      this.errorMessageLogin.style.display = 'none';

      const email: string = this.emailLoginInput.value;
      const password: string = this.passwordLoginInput.value;
      this.checkParams.checkEmail(email);
      this.checkParams.checkPassword(password);

      const response: AuthResponseSchema | Response = await api.auth.signIn({ email, password });

      if (response instanceof Response) {
        return this.errorHandler(response);
      }

      const { token, refreshToken, userId, name } = response;
      Credentials.setToken(token);
      Credentials.setRefreshToken(refreshToken);
      Credentials.setUserId(userId);
      Credentials.setName(name);
      Credentials.setEmail(email);
      this.closeModalLogin.dispatchEvent(new Event('click'));

      return true;
    } catch {
      return false;
    }
  }

  setModalWindowsItems(): void {
    this.signInButton = document.getElementById('sign-in') as HTMLButtonElement;
    this.signUpButton = document.getElementById('sign-up') as HTMLButtonElement;
    this.errorMessageLogin = document.getElementById('error-message-login') as HTMLSpanElement;
    this.errorMessageRegistarion = document.getElementById('error-message-registration') as HTMLSpanElement;
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
