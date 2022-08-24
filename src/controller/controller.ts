import { api, Api } from '../api/api';

export class Controller {
  public api: Api;

  constructor(value: Api) {
    this.api = value;
  }
}

export const controller: Controller = new Controller(api);
