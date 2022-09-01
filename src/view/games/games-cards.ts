import HTMLConstructor from '../components/constructor';

export default class GamesCards extends HTMLConstructor {
  sprintCardText: string;

  audioChallengeCardText: string;

  constructor() {
    super();
    this.sprintCardText =
      'Check how much points you can get in one minute, making educated guesses about what is right and what is wrong.';
    this.audioChallengeCardText =
      'Check your listening skills, trying to pick the right meaning after hearing a word. Be careful, as you just have one guess.';
  }

  createCardWrapper(): HTMLElement {
    const cardWrapper: HTMLElement = this.createHtmlElement(
      'div',
      [
        'card-wrapper-games',
        'd-flex',
        'flex-row',
        'flex-wrap',
        'justify-content-center',
        'align-items-center',
        'text-center',
      ],
      undefined,
      undefined
    );
    return cardWrapper;
  }

  createCard(typeOfCard: 'sprint' | 'audio-challenge'): HTMLElement {
    const card: HTMLElement = this.createHtmlElement(
      'div',
      [
        'card',
        'rounded',
        'shadow',
        'd-flex',
        'flex-column',
        'justify-content-center',
        'align-items-center',
        `card-${typeOfCard}`,
      ],
      `card-${typeOfCard}`,
      undefined
    );
    return card;
  }

  createSvg(
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

  createCardBody(typeOfCard: 'sprint' | 'audio-challenge'): HTMLElement {
    const cardBody: HTMLElement = this.createHtmlElement('div', ['card-body', `card-body-${typeOfCard}`]);
    return cardBody;
  }

  createCardTitle(typeOfCard: 'sprint' | 'audio-challenge'): HTMLElement {
    const innerHtml = typeOfCard === 'sprint' ? 'Sprint' : 'Audio Challenge';
    const cardTitle: HTMLElement = this.createHtmlElement(
      'h3',
      ['card-title', `card-title-${typeOfCard}`],
      undefined,
      undefined,
      innerHtml
    );
    return cardTitle;
  }

  createCardText(typeOfCard: 'sprint' | 'audio-challenge'): HTMLElement {
    const innerHtml = typeOfCard === 'sprint' ? this.sprintCardText : this.audioChallengeCardText;
    const cardText: HTMLElement = this.createHtmlElement(
      'p',
      ['card-text', `card-text-${typeOfCard}`],
      undefined,
      undefined,
      innerHtml
    );
    return cardText;
  }

  generateSprintCard(): HTMLElement {
    const sprintCard: HTMLElement = this.createCard('sprint');
    const sprintSvg: SVGSVGElement = this.createSvg(85, 85, 'speedometer2', 'sprint');
    const sprintCardBody: HTMLElement = this.createCardBody('sprint');
    const sprintCardTitle: HTMLElement = this.createCardTitle('sprint');
    const sprintCardText: HTMLElement = this.createCardText('sprint');
    sprintCardBody.append(sprintCardTitle, sprintCardText);
    sprintCard.append(sprintSvg, sprintCardBody);
    return sprintCard;
  }

  generateAudioChallengeCard(): HTMLElement {
    const audioChallengeCard: HTMLElement = this.createCard('audio-challenge');
    const audioChallengeSvg: SVGSVGElement = this.createSvg(85, 85, 'file-earmark-music', 'audio-challenge');
    const audioChallengeCardBody: HTMLElement = this.createCardBody('audio-challenge');
    const audioChallengeCardTitle: HTMLElement = this.createCardTitle('audio-challenge');
    const audioChallengeCardText: HTMLElement = this.createCardText('audio-challenge');
    audioChallengeCardBody.append(audioChallengeCardTitle, audioChallengeCardText);
    audioChallengeCard.append(audioChallengeSvg, audioChallengeCardBody);
    return audioChallengeCard;
  }

  generateCards(): HTMLElement {
    const cardWrapper: HTMLElement = this.createCardWrapper();
    const sprintCard: HTMLElement = this.generateSprintCard();
    const audioChallengeCard: HTMLElement = this.generateAudioChallengeCard();
    cardWrapper.append(sprintCard, audioChallengeCard);
    return cardWrapper;
  }
}
