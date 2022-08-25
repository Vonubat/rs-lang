import HTMLConstructor from './constructor';

export default class Main {
  HTMLConstructor: HTMLConstructor;

  private previewText = 'Learn English Or DIE!';

  private videoSrc = 'https://www.youtube.com/embed/ZXsQAXx_ao0';

  private gitVonubat = 'https://github.com/vonubat';

  private gitSlavikusVOG = 'https://github.com/slavikusvog';

  private gitDerThun = 'https://github.com/der-thun';

  private TextbookText =
    'The electronic textbook consists of six sections. Each section has 30 pages of 20 words. The translation of the word, the thematic image, as well as the pronunciation of both the word separately and as part of the phrase are presented.';

  private DictionaryText =
    'The dictionary contains lists of studied words, words that do not need to be learned, as well as those that cause difficulties. The dictionary reflects statistics for each section and student progress.';

  private GamesText =
    'For learning words and reinforcing memorization, the application has games: Sprint and Audio Chalenge , which will help you to "pump" your vocabulary in a playful way.';

  private StatisticsText =
    'All the progress of training can be viewed in statistics, where data for the current day, as well as for the entire training period, are presented. The information is presented both in the form of a table and graphs, which is very convenient.';

  constructor() {
    this.HTMLConstructor = new HTMLConstructor();
  }

  view() {
    const main = this.HTMLConstructor.basic('main');
    const preview = this.preview();
    main.appendChild(preview);
    const ourAdvantages = this.advantages();
    main.appendChild(ourAdvantages);
    const posibilities = this.posibilities();
    main.appendChild(posibilities);
    const team = this.team();
    main.appendChild(team);

    return main;
  }

  private preview() {
    const previewSection = this.HTMLConstructor.basic('section', undefined, ['preview']);
    const previewContainer = this.HTMLConstructor.basic('div', undefined, [
      'container-fluid',
      'justify-content-around',
      'd-flex',
    ]);
    const previewCard = this.card('preview', 'RS Lang', 'If you can dream it, you can do it', this.previewText);
    const cardBody = previewCard.querySelector('.card-body') as HTMLElement;
    const button = this.HTMLConstructor.basic('button', undefined, ['btn', 'btn-primary']);
    button.innerText = "Let's start";
    cardBody.appendChild(button);
    previewContainer.appendChild(previewCard);

    const previewImg = this.HTMLConstructor.img('../../assets/favicons/favicon-180.png', 'preview-img', [
      'preview-img',
    ]);
    previewContainer.appendChild(previewImg);
    previewSection.appendChild(previewContainer);
    return previewSection;
  }

  private advantages() {
    const advantagesSection = this.HTMLConstructor.basic('section', undefined, ['ourAdvantages']);
    const advantagesContainer = this.HTMLConstructor.basic('div', undefined, ['container-fluid']);
    const title = this.HTMLConstructor.basic('h2', undefined, ['text-center', 'section-title']);
    title.innerText = 'Our advantages';
    advantagesContainer.appendChild(title);
    const cardWrapper = this.HTMLConstructor.div(['d-flex', 'justify-content-around', 'flex-wrap', 'gap-5']);
    const TextbookCard = this.card('ourAdvantages', 'Textbook', '', this.TextbookText, '../../assets/img/textbook.svg');
    const DictionaryCard = this.card(
      'ourAdvantages',
      'Dictionary',
      '',
      this.DictionaryText,
      '../../assets/img/dictionary.svg'
    );
    const GamesCard = this.card('ourAdvantages', 'Games', '', this.GamesText, '../../assets/img/games.svg');
    const StatisticsCard = this.card(
      'ourAdvantages',
      'Statistics',
      '',
      this.StatisticsText,
      '../../assets/img/statistics.svg'
    );
    cardWrapper.appendChild(TextbookCard);
    cardWrapper.appendChild(DictionaryCard);
    cardWrapper.appendChild(GamesCard);
    cardWrapper.appendChild(StatisticsCard);
    advantagesContainer.appendChild(cardWrapper);
    advantagesSection.appendChild(advantagesContainer);
    return advantagesSection;
  }

  private posibilities() {
    const posibilitiesSection = this.HTMLConstructor.basic('section', undefined, ['ourPosibilities']);
    const title = this.HTMLConstructor.basic('h3', undefined, ['text-center', 'section-title']);
    title.innerText = 'Our posibilities';
    posibilitiesSection.appendChild(title);
    const posibilitiesContainer = this.HTMLConstructor.basic('div', undefined, ['container-fluid']);
    const videoContainer = this.HTMLConstructor.basic('div', undefined, ['video-container']);
    const videoWrapper = this.HTMLConstructor.basic('div', undefined, ['video-wrapper']);
    const video = this.HTMLConstructor.basic('iframe', undefined, ['video'], [['src', this.videoSrc]]);
    videoWrapper.appendChild(video);
    videoContainer.appendChild(videoWrapper);
    posibilitiesContainer.appendChild(videoContainer);
    posibilitiesSection.appendChild(posibilitiesContainer);
    return posibilitiesSection;
  }

  private team() {
    const teamSection = this.HTMLConstructor.basic('section', undefined, ['ourTeam']);
    const title = this.HTMLConstructor.basic('h3', undefined, ['text-center', 'section-title']);
    title.innerText = 'Our team';
    teamSection.appendChild(title);
    const teamContainer = this.HTMLConstructor.div(['container-fluid', 'gap-5']);
    const vonubat = this.card(
      'ourteam',
      'Vonubat',
      'Team leader',
      'Out team leader',
      '../../assets/img/vonubat.jpg',
      this.gitVonubat
    );
    const slavikusVOG = this.card(
      'ourteam',
      'SlavikusVOG',
      'Frontend developer',
      'Frontend developer',
      '../../assets/img/slavikusvog.jpg',
      this.gitSlavikusVOG
    );
    const derThun = this.card(
      'ourteam',
      'Der_Thun',
      'Frontend developer',
      'Frontend developer',
      '../../assets/img/der-thun.jpg',
      this.gitDerThun
    );
    teamContainer.appendChild(vonubat);
    teamContainer.appendChild(slavikusVOG);
    teamContainer.appendChild(derThun);
    teamSection.appendChild(teamContainer);
    return teamSection;
  }

  private card(type: string, title: string, subtitle: string, text: string, img?: string, git?: string) {
    const card = this.HTMLConstructor.basic('div', undefined, ['card', `card-${type}`]);
    if (img) {
      const cardImg = this.HTMLConstructor.img(img, title, ['card-img', `card-img-${type}`]);
      card.appendChild(cardImg);
    }
    const cardBody = this.HTMLConstructor.basic('div', undefined, ['card-body', `card-body-${type}`]);
    const cardTitle = this.HTMLConstructor.basic('h3', undefined, ['card-title']);
    cardTitle.innerText = title;
    cardBody.appendChild(cardTitle);
    const cardSubTitle = this.HTMLConstructor.basic('h4', undefined, ['card-subtitle', 'text-muted']);
    cardSubTitle.innerText = subtitle;
    cardBody.appendChild(cardSubTitle);
    const cardText = this.HTMLConstructor.basic('p', undefined, ['card-text']);
    cardText.innerHTML = text;
    cardBody.appendChild(cardText);
    if (git) {
      const cardGit = this.HTMLConstructor.a(git, ['card-git-link']);
      const cardGitSvg = this.HTMLConstructor.svg('github', ['git-svg']);
      cardGit.appendChild(cardGitSvg);
      cardBody.appendChild(cardGit);
    }
    card.appendChild(cardBody);
    return card;
  }
}
