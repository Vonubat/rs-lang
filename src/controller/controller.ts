import { api, Api } from '../api/api';
import { services, Services } from '../services/services';

export class Controller {
  public api: Api;

  public services: Services;

  constructor(value: Api, value2: Services) {
    this.api = value;
    this.services = value2;
  }
}

export const controller: Controller = new Controller(api, services);
console.log(controller.api.words.getWords());
