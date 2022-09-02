/* eslint-disable @typescript-eslint/no-var-requires */
import { WordsResponseSchema, PaginatedResult } from '../../types/types';
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

  createTimerConfig(
    element: HTMLElement,
    duration: number,
    cb?: (words: WordsResponseSchema[] | PaginatedResult[]) => void,
    words?: WordsResponseSchema[] | PaginatedResult[]
  ) {
    const newTimer = new CanvasCircularCountdown(
      element,
      {
        duration,
        radius: 50,
        progressBarWidth: 20,
        progressBarOffset: 0,
        elapsedTime: 0,
        circleBackgroundColor: 'transparent',
        emptyProgressBarBackgroundColor: '#b9c1c7',
        filledProgressBarBackgroundColor: 'yellow',
        captionColor: 'black',
        captionFont:
          '22px system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", "Liberation Sans", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
        showCaption: true,
      },
      (
        _percentage: never,
        time: { elapsed: number },
        instance: { style: (arg0: { captionText: string }) => void }
      ): void => {
        instance.style({ captionText: `${Math.ceil((duration - time.elapsed) / 1000)}` });
        if (time.elapsed > duration) {
          if (words && cb) {
            cb(words);
          }
        }
      }
    ).start();

    return newTimer;
  }
}
