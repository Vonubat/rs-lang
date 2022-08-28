import AuthService from './auth/auth-service';
import HeaderService from './components/header-service';
import TextbookService from './textbook/textbook-service';

export class Services {
  textbookService: TextbookService;

  headerService: HeaderService;

  authService: AuthService;

  constructor() {
    this.textbookService = new TextbookService();
    this.headerService = new HeaderService();
    this.authService = new AuthService();
  }
}

export const services: Services = new Services();

/* services.textbookService.drawPage(); 
services.headerService.draw();
services.authService.setModalWindowsItems();
services.authService.listenAuth(); */
