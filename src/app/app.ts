import { api, ApiClass } from '../api/api';

class App {
  public API: ApiClass;

  constructor(value: ApiClass) {
    this.API = value;
  }
}

const app: App = new App(api);
console.log(app);
