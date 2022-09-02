/* eslint-disable @typescript-eslint/no-var-requires */
import { view } from '../../view/view';

const CanvasCircularCountdown = require('canvas-circular-countdown').default;

export default class Timer {
  startCount: number;

  constructor() {
    this.startCount = 0;
  }

  createTimerElement(id: string, stage: 'start' | 'game'): HTMLElement {
    const canvas = view.htmlConstructor.createHtmlElement(
      'canvas',
      [`countdown-canvas-${id}-${stage}`],
      `countdown-canvas-${id}`
    );
    return canvas;
  }

  createTimerConfig(element: HTMLElement, duration: number, cb: Function) {
    const newTimer = new CanvasCircularCountdown(
      element,
      {
        duration,
        radius: 50,
        progressBarWidth: 20,
        progressBarOffset: 0,
        elapsedTime: 0,
        circleBackgroundColor: '#f5f5f5',
        emptyProgressBarBackgroundColor: '#b9c1c7',
        filledProgressBarBackgroundColor: '#17a2b8',
        captionColor: '#6c757d',
        captionFont: '22px serif',
        showCaption: true,
      },
      (
        _percentage: never,
        time: { elapsed: number },
        instance: { style: (arg0: { captionText: string }) => void }
      ): void => {
        instance.style({ captionText: `${Math.floor(time.elapsed / 1000)}` });
        if (time.elapsed > duration) {
          /*  let a: number;
          if (id === 'sprint-start') {
            a = 1;
          }
          if (id === 'audio-challenge') {
            a = 1;
          } */
          cb('test');
        }
      }
    ).start();

    return newTimer;
  }
}
