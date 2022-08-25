import { api, Api } from '../api/api';
import { view, View } from '../view/view';

export class Controller {
  public api: Api;

  public view: View;

  constructor(value: Api, value2: View) {
    this.api = value;
    this.view = value2;
  }
}

export const controller: Controller = new Controller(api, view);
console.log(controller.api.words.getWords());
