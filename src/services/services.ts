import HeaderService from './components/header-service';
import TextbookService from './textbook/textbook-service';

export class Services {
  textbookService: TextbookService;

  headerService: HeaderService;

  constructor() {
    this.textbookService = new TextbookService();
    this.headerService = new HeaderService();
  }
}

export const services: Services = new Services();

services.textbookService.drawPage();
services.headerService.draw();
