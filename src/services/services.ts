import TextbookService from './textbook/textbook-service';

export class Services {
  textbookService: TextbookService;

  constructor() {
    this.textbookService = new TextbookService();
  }
}

export const services: Services = new Services();


/* services.textbookService.drawPage(); 
services.headerService.draw();
services.authService.setModalWindowsItems();
services.authService.listenAuth();
services.textbookService.drawPage(); */

