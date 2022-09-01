import { api } from '../../api/api';
import Constants from '../../constants';
import {
  AuthResponseSchema,
  PageConfigResponce,
  PaginatedResult,
  TokensSchema,
  UserResponseSchema,
  WordsResponseSchema,
} from '../../types/types';
import CheckApiParams from '../../utilities/check-api-params';
import { view } from '../../view/view';
import { Route } from '../routing/routing';
import { services } from '../services';
import Credentials from './credentials';

export default class AuthService {
  checkParams: CheckApiParams;

  loginBtn!: HTMLButtonElement;

  signUpButton!: HTMLButtonElement;

  signInButton!: HTMLButtonElement;

  errorMessageLogin!: HTMLSpanElement;

  errorMessageRegistration!: HTMLSpanElement;

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
    if (response.status === 422) {
      this.errorMessageRegistration.innerHTML = 'Name or email address is not valid';
      this.errorMessageRegistration.style.display = '';
    }
    if (response.status === 417) {
      this.errorMessageRegistration.innerHTML = 'Email address is already registered';
      this.errorMessageRegistration.style.display = '';
    }
    if (response.status === 403) {
      this.errorMessageLogin.innerHTML = 'Incorrect e-mail or password';
      this.errorMessageLogin.style.display = '';
    }
    if (response.status === 404) {
      this.errorMessageLogin.innerHTML = 'Failed to connect';
      this.errorMessageLogin.style.display = '';
      this.errorMessageRegistration.style.display = '';
    }
    return false;
  }

  static checkUser(): boolean {
    const userName: string | null = localStorage.getItem('userName');
    if (userName) {
      return true;
    }
    return false;
  }

  async checkTokenExpiring(): Promise<void> {
    if (AuthService.checkUser()) {
      const userId: string = Credentials.getUserId();
      const currentTime: number = Date.now();
      const tokenCreationTime: number = Credentials.getTimeStamp();
      const delta: number = currentTime - tokenCreationTime;

      if (delta > Constants.TOKEN_LIFE_TIME) {
        const response: Response | TokensSchema = await api.users.getNewUserTokens(userId);
        if (response instanceof Response) {
          this.logOut();
        }
      }
    }
  }

  changeBtnState(): void {
    const icon: SVGUseElement = view.header.icon.firstChild as SVGUseElement;
    if (AuthService.checkUser()) {
      const email: string = Credentials.getEmail();
      this.loginBtn.dataset.bsToggle = '';
      (this.loginBtn.childNodes[0] as Text).data = `Log Out (${email})`;
      view.htmlConstructor.changeSvg(icon, 'box-arrow-in-right');
      services.dictionaryService.hideDictionaryItems();
    } else {
      this.loginBtn.dataset.bsToggle = 'modal';
      (this.loginBtn.childNodes[0] as Text).data = `Log In`;
      view.htmlConstructor.changeSvg(icon, 'lock');
      services.dictionaryService.hideDictionaryItems();
    }
  }

  logOut(): boolean {
    const content: string = (this.loginBtn.childNodes[0] as Text).data;
    if (content.includes('Log Out')) {
      Credentials.delCredentials();

      if (Route.checkUrl('dictionary')) {
        window.location.hash = 'textbook';
      }

      if (Route.checkUrl('textbook')) {
        this.updateCardsState();
      }

      this.changeBtnState();
      return true;
    }
    return false;
  }

  async signIn(event: Event): Promise<boolean> {
    try {
      this.errorMessageLogin.style.display = 'none';

      const email: string = this.emailLoginInput.value;
      const password: string = this.passwordLoginInput.value;
      this.checkParams.checkEmail(email);
      this.checkParams.checkPassword(password);
      event.preventDefault();

      const response: AuthResponseSchema | Response = await api.auth.signIn({ email, password });

      if (response instanceof Response) {
        return this.errorHandler(response);
      }

      const { token, refreshToken, userId, name } = response;
      Credentials.setCredentials(token, refreshToken, userId, name, email);
      this.closeModalLogin.dispatchEvent(new Event('click'));

      this.changeBtnState();
      if (Route.checkUrl('textbook')) {
        this.updateCardsState();
      }
      return true;
    } catch {
      return false;
    }
  }

  async signUp(event: Event): Promise<boolean> {
    try {
      this.errorMessageRegistration.style.display = 'none';

      let response: AuthResponseSchema | UserResponseSchema | Response;
      const email: string = this.emailRegistrationInput.value;
      const password: string = this.passwordRegistrationInput.value;
      const userName: string = this.nameRegistrationInput.value;

      this.checkParams.checkEmail(email);
      this.checkParams.checkPassword(password);
      event.preventDefault();

      response = await api.users.createUser({ name: userName, email, password });
      if (response instanceof Response) {
        return this.errorHandler(response);
      }
      response = await api.auth.signIn({ email, password });
      if (response instanceof Response) {
        return this.errorHandler(response);
      }

      const { token, refreshToken, userId } = response;
      Credentials.setCredentials(token, refreshToken, userId, userName, email);
      this.closeModalRegistration.dispatchEvent(new Event('click'));

      this.changeBtnState();
      if (Route.checkUrl('textbook')) {
        this.updateCardsState();
      }
      return true;
    } catch {
      return false;
    }
  }

  async updateCardsState(): Promise<void> {
    const pageConfig: PageConfigResponce = services.pageConfig.getPageConfigResponse();
    const words: WordsResponseSchema[] | PaginatedResult[] = await services.textbookService.getWords(pageConfig);
    view.textbookView.drawCardsContainer(words, pageConfig);
    services.textbookService.setCardsItems();
    services.textbookService.listenCards();
  }

  setModalWindowsItems(): void {
    this.loginBtn = document.getElementById('login-btn') as HTMLButtonElement;
    this.signInButton = document.getElementById('sign-in') as HTMLButtonElement;
    this.signUpButton = document.getElementById('sign-up') as HTMLButtonElement;
    this.errorMessageLogin = document.getElementById('error-message-login') as HTMLSpanElement;
    this.errorMessageRegistration = document.getElementById('error-message-registration') as HTMLSpanElement;
    this.closeModalLogin = document.getElementById('close-modal-login') as HTMLButtonElement;
    this.closeModalRegistration = document.getElementById('close-modal-registration') as HTMLButtonElement;
    this.emailLoginInput = document.getElementById('email-login-input') as HTMLInputElement;
    this.passwordLoginInput = document.getElementById('password-login-input') as HTMLInputElement;
    this.nameRegistrationInput = document.getElementById('name-registration-input') as HTMLInputElement;
    this.emailRegistrationInput = document.getElementById('email-registration-input') as HTMLInputElement;
    this.passwordRegistrationInput = document.getElementById('password-registration-input') as HTMLInputElement;
  }

  listenAuth(): void {
    this.signInButton.addEventListener('click', this.signIn.bind(this));
    this.signUpButton.addEventListener('click', this.signUp.bind(this));
    this.loginBtn.addEventListener('click', this.logOut.bind(this));
    document.addEventListener('DOMContentLoaded', this.checkTokenExpiring.bind(this));
    document.addEventListener('DOMContentLoaded', this.changeBtnState.bind(this));
    document.addEventListener('DOMContentLoaded', services.dictionaryService.hideDictionaryItems.bind(this));
  }
}
