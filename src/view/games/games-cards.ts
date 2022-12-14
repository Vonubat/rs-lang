import HTMLConstructor from '../components/constructor';

export default class GamesCards extends HTMLConstructor {
  private _sprintCardText: string;

  private _audioChallengeCardText: string;

  constructor() {
    super();
    this._sprintCardText =
      'Check how much points you can get in one minute, making educated guesses about what is right and what is wrong.';
    this._audioChallengeCardText =
      'Check your listening skills, trying to pick the right meaning after hearing a word. Be careful, as you just have one guess.';
  }

  private createCardsWrapper(page: 'dictionary' | 'textbook' | 'minigames'): HTMLElement {
    const classList: string[] = ['d-flex', 'flex-wrap', 'justify-content-center', 'align-items-center', 'text-center'];

    if (page !== 'minigames') {
      classList.push(`mini-card-wrapper-games-${page}`, 'shadow', 'bg-primary', 'bg-gradient');
    } else {
      classList.push('card-wrapper-games', 'flex-row');
    }
    const cardsWrapper: HTMLElement = this.createHtmlElement('div', classList, undefined, undefined);
    return cardsWrapper;
  }

  private createCard(
    typeOfCard: 'sprint' | 'audio-challenge',
    page: 'dictionary' | 'textbook' | 'minigames'
  ): HTMLElement {
    const classList: string[] = [
      'card',
      'rounded',
      'shadow',
      'd-flex',
      'justify-content-center',
      'align-items-center',
      'bg-light',
      'bg-gradient',
      `card-${page}-${typeOfCard}`,
    ];

    if (page !== 'minigames') {
      classList.push('flex-row');
    } else {
      classList.push('flex-column');
    }

    const card: HTMLElement = this.createHtmlElement('div', classList, `card-${page}-${typeOfCard}`, undefined);
    return card;
  }

  private createSvg(
    boxWidth: number,
    boxHeight: number,
    typeOfIcon: string,
    typeOfCard: 'sprint' | 'audio-challenge'
  ): SVGSVGElement {
    const svg: SVGSVGElement = this.createFreeSvg(
      './assets/bootstrap-icons.svg',
      typeOfIcon,
      [`icon-${typeOfCard}`],
      undefined,
      undefined,
      boxWidth,
      boxHeight
    );
    return svg;
  }

  private createCardBody(
    typeOfCard: 'sprint' | 'audio-challenge',
    page: 'dictionary' | 'textbook' | 'minigames'
  ): HTMLElement {
    const classList: string[] = [`card-body-${typeOfCard}`];
    if (page === 'minigames') {
      classList.push('card-body');
    }
    const cardBody: HTMLElement = this.createHtmlElement('div', classList);
    return cardBody;
  }

  private createCardTitle(
    typeOfCard: 'sprint' | 'audio-challenge',
    page: 'dictionary' | 'textbook' | 'minigames'
  ): HTMLElement {
    const innerHtml: 'Sprint' | 'Audio Challenge' = typeOfCard === 'sprint' ? 'Sprint' : 'Audio Challenge';
    const type: 'h3' | 'span' = page === 'minigames' ? 'h3' : 'span';
    const classList: string[] = [`card-title-${typeOfCard}`];
    if (page === 'minigames') {
      classList.push('card-title');
    }
    const cardTitle: HTMLElement = this.createHtmlElement(type, classList, undefined, undefined, innerHtml);
    return cardTitle;
  }

  private createCardText(typeOfCard: 'sprint' | 'audio-challenge'): HTMLElement {
    const innerHtml: string = typeOfCard === 'sprint' ? this._sprintCardText : this._audioChallengeCardText;
    const cardText: HTMLElement = this.createHtmlElement(
      'p',
      ['card-text', `card-text-${typeOfCard}`],
      undefined,
      undefined,
      innerHtml
    );
    return cardText;
  }

  private generateSprintCard(): HTMLElement {
    const sprintCard: HTMLElement = this.createCard('sprint', 'minigames');
    const sprintSvg: SVGSVGElement = this.createSvg(85, 85, 'speedometer2', 'sprint');
    const sprintCardBody: HTMLElement = this.createCardBody('sprint', 'minigames');
    const sprintCardTitle: HTMLElement = this.createCardTitle('sprint', 'minigames');
    const sprintCardText: HTMLElement = this.createCardText('sprint');
    sprintCardBody.append(sprintCardTitle, sprintCardText);
    sprintCard.append(sprintSvg, sprintCardBody);
    return sprintCard;
  }

  private generateAudioChallengeCard(): HTMLElement {
    const audioChallengeCard: HTMLElement = this.createCard('audio-challenge', 'minigames');
    const audioChallengeSvg: SVGSVGElement = this.createSvg(85, 85, 'file-earmark-music', 'audio-challenge');
    const audioChallengeCardBody: HTMLElement = this.createCardBody('audio-challenge', 'minigames');
    const audioChallengeCardTitle: HTMLElement = this.createCardTitle('audio-challenge', 'minigames');
    const audioChallengeCardText: HTMLElement = this.createCardText('audio-challenge');
    audioChallengeCardBody.append(audioChallengeCardTitle, audioChallengeCardText);
    audioChallengeCard.append(audioChallengeSvg, audioChallengeCardBody);
    return audioChallengeCard;
  }

  public generateCards(): HTMLElement {
    const cardsWrapper: HTMLElement = this.createCardsWrapper('minigames');
    const sprintCard: HTMLElement = this.generateSprintCard();
    const audioChallengeCard: HTMLElement = this.generateAudioChallengeCard();
    cardsWrapper.append(sprintCard, audioChallengeCard);
    return cardsWrapper;
  }

  private generateMiniSprintCard(page: 'dictionary' | 'textbook'): HTMLElement {
    const miniSprintCard: HTMLElement = this.createCard('sprint', page);
    const miniSprintSvg: SVGSVGElement = this.createSvg(32, 32, 'speedometer2', 'sprint');
    const miniSprintCardBody: HTMLElement = this.createCardBody('sprint', page);
    const miniSprintCardTitle: HTMLElement = this.createCardTitle('sprint', page);
    miniSprintCardBody.append(miniSprintCardTitle);
    miniSprintCard.append(miniSprintSvg, miniSprintCardBody);
    return miniSprintCard;
  }

  private generateMiniAudioChallengeCard(page: 'dictionary' | 'textbook'): HTMLElement {
    const miniAudioChallengeCard: HTMLElement = this.createCard('audio-challenge', page);
    const miniAudioChallengeSprintSvg: SVGSVGElement = this.createSvg(32, 32, 'file-earmark-music', 'audio-challenge');
    const miniAudioChallengeCardBody: HTMLElement = this.createCardBody('audio-challenge', page);
    const miniAudioChallengeCardTitle: HTMLElement = this.createCardTitle('audio-challenge', page);
    miniAudioChallengeCardBody.append(miniAudioChallengeCardTitle);
    miniAudioChallengeCard.append(miniAudioChallengeSprintSvg, miniAudioChallengeCardBody);
    return miniAudioChallengeCard;
  }

  public generateMiniCards(page: 'dictionary' | 'textbook'): HTMLElement {
    const miniCardsWrapper: HTMLElement = this.createCardsWrapper(page);
    const miniSprintCard: HTMLElement = this.generateMiniSprintCard(page);
    const miniAudioChallengeCard: HTMLElement = this.generateMiniAudioChallengeCard(page);
    miniCardsWrapper.append(miniSprintCard, miniAudioChallengeCard);

    return miniCardsWrapper;
  }
}
