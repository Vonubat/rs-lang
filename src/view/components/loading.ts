import Constants from '../../constants';
import HTMLConstructor from './constructor';

export default class Loading extends HTMLConstructor {
  private body: HTMLElement;

  private spinnersWrapper!: HTMLElement;

  constructor() {
    super();
    this.body = document.getElementById('body') as HTMLElement;
  }

  public createSpinners(): void {
    this.body.classList.add('disabled');
    const spinnersWrapper: HTMLElement = this.createHtmlElement(
      'div',
      [
        'position-fixed',
        'top-50',
        'start-50',
        'translate-middle',
        'd-flex',
        'flex-wrap',
        'justify-content-center',
        'gap-2',
        'spinners-wrapper',
      ],
      'spinners-wrapper',
      [['role', 'status']]
    );

    spinnersWrapper.style.zIndex = '10';

    Constants.BOOTSTRAP_TEXT_COLORS.forEach((item: string): void => {
      const spinner: HTMLElement = this.createHtmlElement('div', ['spinner-grow', `${item}`], undefined, [
        ['role', 'status'],
      ]);
      spinnersWrapper.append(spinner);
    });

    this.body.append(spinnersWrapper);
  }

  public delSpinners(): void {
    this.spinnersWrapper = document.getElementById('spinners-wrapper') as HTMLElement;
    this.spinnersWrapper.remove();

    this.body.classList.remove('disabled');
  }
}
