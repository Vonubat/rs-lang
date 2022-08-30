import AuthService from './auth/auth-service';
import PageConfig from './textbook/page-config';
import TextbookService from './textbook/textbook-service';

export class Services {
  textbookService: TextbookService;

  authService: AuthService;

  pageConfig: PageConfig;

  constructor() {
    this.textbookService = new TextbookService();
    this.pageConfig = new PageConfig();
    this.authService = new AuthService();
  }
}

export const services: Services = new Services();
