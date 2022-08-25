import TextbookService from './textbook/textbook-service';

export class Services {
  textbookService: TextbookService;

  constructor() {
    this.textbookService = new TextbookService();
  }
}

export const services: Services = new Services();
