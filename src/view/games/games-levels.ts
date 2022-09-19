import Constants from '../../constants';
import { Color } from '../../types/types';
import Utils from '../../utilities/utils';
import HTMLConstructor from '../components/constructor';

export default class GamesLevels extends HTMLConstructor {
  private createWrapper(game: 'sprint' | 'audio-challenge'): HTMLElement {
    const classList: string[] = [
      'd-flex',
      'flex-column',
      'justify-content-center',
      'align-items-center',
      'text-center',
      `wrapper-levels`,
    ];
    const cardsWrapper: HTMLElement = this.createHtmlElement('div', classList, `wrapper-levels-${game}`);
    return cardsWrapper;
  }

  private createName(game: 'sprint' | 'audio-challenge'): HTMLElement {
    const classList: string[] = [];
    const name: HTMLElement = this.createHtmlElement('h2', classList, `${Utils.capitalizeFirstLetter(game)}`);
    return name;
  }

  private createText(): HTMLElement {
    const classList: string[] = ['text-muted'];
    const text: HTMLElement = this.createHtmlElement('h4', classList, undefined, undefined, `Select the Level`);
    return text;
  }

  private createLevelsContainer(game: 'sprint' | 'audio-challenge'): HTMLElement {
    const classList: string[] = [
      'd-flex',
      'flex-row',
      'justify-content-center',
      'align-items-center',
      'flex-wrap',
      'rounded',
      'shadow',
      'bg-light',
      'bg-gradient',
      `levels-container`,
    ];
    const levelsContainer: HTMLElement = this.createHtmlElement('div', classList, `levels-container-${game}`);
    return levelsContainer;
  }

  private createCircle(color: Color, i: number): HTMLElement {
    const classList: string[] = ['btn', `level`];
    const circle: HTMLElement = this.createHtmlElement('button', classList, `level-${i}`, [['type', 'button']], `${i}`);
    circle.style.backgroundColor = color;
    return circle;
  }

  private createBackBtn(): HTMLElement {
    const classList: string[] = ['btn', 'btn-primary', `back-btn-to-games`];
    const backBtn: HTMLElement = this.createHtmlElement(
      'button',
      classList,
      undefined,
      [['type', 'button']],
      `BACK TO GAMES`
    );
    return backBtn;
  }

  public generateGamesLevels(game: 'sprint' | 'audio-challenge'): HTMLElement {
    const wrapper: HTMLElement = this.createWrapper(game);
    const name: HTMLElement = this.createName(game);
    const text: HTMLElement = this.createText();
    const levelContainer: HTMLElement = this.createLevelsContainer(game);
    const colors: Color[] = Object.values(Constants.CONTAINER_COLORS) as Color[];
    for (let i = 1; i <= colors.length; i += 1) {
      const circle: HTMLElement = this.createCircle(colors[i - 1], i);
      levelContainer.append(circle);
    }
    const backBtn: HTMLElement = this.createBackBtn();
    wrapper.append(name, text, levelContainer, backBtn);
    return wrapper;
  }
}
