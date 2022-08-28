import Constants from '../../constants';
import HTMLConstructor from './constructor';

export default class Loading extends HTMLConstructor {
  spinnersWrapper!: HTMLElement;

  createSpinners(): void {
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

    this.spinnersWrapper = spinnersWrapper;
    spinnersWrapper.style.zIndex = '10';

    Constants.BOOTSTRAP_COLORS.forEach((item) => {
      const spinner: HTMLElement = this.createHtmlElement('div', ['spinner-grow', `${item}`], undefined, [
        ['role', 'status'],
      ]);
      spinnersWrapper.append(spinner);
    });

    const body: HTMLElement = document.getElementById('body') as HTMLElement;
    body.append(spinnersWrapper);
  }

  delSpinners(): void {
    this.spinnersWrapper.remove();
  }
}
