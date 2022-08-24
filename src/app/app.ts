import { controller, Controller } from '../controller/controller';

class App {
  public controller: Controller;

  constructor(value: Controller) {
    this.controller = value;
  }
}

const app: App = new App(controller);
console.log(app);
