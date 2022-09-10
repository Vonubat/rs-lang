import Constants from '../../constants';
import { view } from '../../view/view';

export default class SoundHelper {
  i!: number;

  audioArray!: string[];

  audio!: HTMLAudioElement;

  playWordPronouncing(elem: SVGSVGElement): void {
    if (this.audio) {
      this.pause();
    }

    view.htmlConstructor.changeSvg(elem.firstChild as SVGUseElement, 'stop-fill');
    this.audio = new Audio(`${Constants.BASE_URL}/${elem.dataset.audio}`);
    this.audio.play();
    this.audio.addEventListener('ended', (): void => {
      view.htmlConstructor.changeSvg(elem.firstChild as SVGUseElement, 'volume-up-fill');
    });
  }

  playGameSound(path: string): void {
    if (this.audio) {
      this.pause();
    }
    this.audio = new Audio(path);
    this.audio.play();
  }

  playQueue(elem: SVGSVGElement): void {
    const audioPath = `${Constants.BASE_URL}/${elem.dataset.audio}`;
    const audioMeaningPath = `${Constants.BASE_URL}/${elem.dataset.audioMeaning}`;
    const audioExamplePath = `${Constants.BASE_URL}/${elem.dataset.audioExample}`;

    view.htmlConstructor.changeSvg(elem.firstChild as SVGUseElement, 'stop-fill');

    this.audioArray = [audioPath, audioMeaningPath, audioExamplePath];
    this.i = 0;
    this.playCallBack(elem);
  }

  playCallBack(elem: SVGSVGElement): void {
    if (this.audio) {
      this.pause();
    }
    this.audio = new Audio(this.audioArray[this.i]);
    this.audio.play();

    this.audio.addEventListener('ended', (): void => {
      this.i += 1;
      this.playCallBack(elem);
    });

    this.audio.addEventListener('ended', (): void => {
      if (this.i === 3) {
        view.htmlConstructor.changeSvg(elem.firstChild as SVGUseElement, 'volume-up-fill');
      }
    });
  }

  pause(): void {
    this.audio.pause();
  }
}