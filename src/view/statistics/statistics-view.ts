// import d3, { range } from 'd3';
import Chart from 'chart.js/auto';
import Constants from '../../constants';
import HTMLConstructor from '../components/constructor';
import { services } from '../../services/services';
import { Statistics } from '../../types/types';

export default class Statistic {
  private mainId: string = Constants.MAIN_ID;

  private htmlConstructor: HTMLConstructor = new HTMLConstructor();

  // private statistics: HTMLDivElement;

  // private words: HTMLDivElement;

  // private statsPerDay: HTMLDivElement;

  // private statisticsData: Optional;

  /* constructor() {
    // services.statisticsService.setView();
    // services.statisticsService.getStatisticsData();
  } */

  private view(data: Statistics | null): DocumentFragment {
    const fragment = document.createDocumentFragment();
    const statistics = this.htmlConstructor.div(['statistics']);
    const words = this.htmlConstructor.div(['statistics__words']);
    words.id = 'statistics-words-id';
    const statsPerDay = this.htmlConstructor.div(['statistics__stats-per-day']);
    const todayTitle = this.htmlConstructor.createHtmlElement('h2', ['today-title']);
    todayTitle.innerText = 'TODAY';
    statsPerDay.append(
      todayTitle,
      this.sectionTodayWordsLearned(),
      this.sectionGameLearned('Sprint', data),
      this.sectionGameLearned('AudioChallenge', data)
    );
    if (data) statsPerDay.append(this.authSection(data));
    statistics.append(words, statsPerDay);
    fragment.append(statistics);
    return fragment;
  }

  async drawPage() {
    const main = document.getElementById(this.mainId);
    const data = await services.statisticsService.getStatisticsData();
    if (main) {
      main.innerHTML = '';
      main.append(this.view(data));
      if (data) {
        this.drawDiagrams(data, 'Progress');
        this.drawDiagrams(data, 'Learned words');
      }
    }
  }

  private sectionTodayWordsLearned() {
    const section = this.htmlConstructor.div(['card', 'today-wrapper']);
    const wordsLearned = this.htmlConstructor.div(['card-body', 'today-words-learned']);
    const wordAmount = this.htmlConstructor.createHtmlElement('h2', ['words-learned']);
    wordAmount.innerText = '0';
    const body = this.htmlConstructor.div(['card-body']);
    const wordtitle = this.htmlConstructor.createHtmlElement('h3', ['card-title', 'words-learned-title']);
    wordtitle.innerText = 'words';
    const subTitle = this.htmlConstructor.createHtmlElement('h4', ['card-subtitle', 'text-muted']);
    subTitle.innerText = 'were learned';
    body.append(wordtitle, subTitle);
    wordsLearned.append(wordAmount, body);
    const accuracy = this.htmlConstructor.div(['card-body', 'today-accuracy']);
    const accuracyAmount = this.htmlConstructor.createHtmlElement('h2', ['accuracy-today-amount']);
    accuracyAmount.innerText = '0%';
    const accuracyTitle = this.htmlConstructor.createHtmlElement('h3', ['card-title', 'accuracy-today-title']);
    accuracyTitle.innerText = 'Accuracy';
    accuracy.append(accuracyAmount, accuracyTitle);
    const topRow = this.htmlConstructor.div(['card-body', 'today-topRow']);
    const topRowAmount = this.htmlConstructor.createHtmlElement('h2', ['topRow-today-amount']);
    topRowAmount.innerText = '0%';
    const topRowTitle = this.htmlConstructor.createHtmlElement('h3', ['card-title', 'topRow-today-title']);
    topRowTitle.innerText = 'top in a row';
    topRow.append(topRowAmount, topRowTitle);
    section.append(wordsLearned, accuracy, topRow);
    return section;
  }

  private sectionGameLearned(gameName: 'Sprint' | 'AudioChallenge', data: Statistics | null) {
    const section = this.htmlConstructor.div(['card', `game-${gameName.toLowerCase()}-learned`]);
    const title = this.htmlConstructor.createHtmlElement('h2', [`game-${gameName.toLowerCase()}-title`, 'game-title']);
    title.innerText = gameName;
    const body = this.htmlConstructor.div(['card-body']);
    const wordsWrapper = this.htmlConstructor.div(['card-body', 'stat-wrapper']);
    const wordsAmount = this.htmlConstructor.createHtmlElement('h4', [`game-${gameName.toLowerCase()}-wordsAmount`]);
    if (data) {
      wordsAmount.innerText = `${this.wordsDaily(data, gameName)}`;
    } else wordsAmount.innerText = '0';
    const wordsTitle = this.htmlConstructor.createHtmlElement('h3', [
      'card-title',
      `game-${gameName.toLowerCase()}-text`,
    ]);
    wordsTitle.innerText = 'words';
    wordsWrapper.append(wordsAmount, wordsTitle);
    const accuracyWrapper = this.htmlConstructor.div(['card-body', 'stat-wrapper']);
    const accuracyAmount = this.htmlConstructor.createHtmlElement('h4', [
      `game-${gameName.toLowerCase()}-accuracyAmount`,
    ]);
    if (data) {
      accuracyAmount.innerText = this.accuracyMiddleDaily(data, gameName);
    } else accuracyAmount.innerText = '0%';
    const accuracyTitle = this.htmlConstructor.createHtmlElement('h3', [
      'card-title',
      `game-${gameName.toLowerCase()}-text`,
    ]);
    accuracyTitle.innerText = 'accuracy';
    accuracyWrapper.append(accuracyAmount, accuracyTitle);
    const inRowWrapper = this.htmlConstructor.div(['card-body', 'stat-wrapper']);
    const inRowAmount = this.htmlConstructor.createHtmlElement('h4', [`game-${gameName.toLowerCase()}-inRowAmount`]);
    if (data) {
      inRowAmount.innerText = `${this.topInRowDaily(data, gameName)}`;
    } else inRowAmount.innerText = '0';
    const inRowTitle = this.htmlConstructor.createHtmlElement('h3', [
      'card-title',
      `game-${gameName.toLowerCase()}-text`,
    ]);
    inRowTitle.innerText = 'in a row';
    inRowWrapper.append(inRowAmount, inRowTitle);
    body.append(wordsWrapper, accuracyWrapper, inRowWrapper);
    section.append(title, body);
    return section;
  }

  private topInRowDaily(data: Statistics, type: 'AudioChallenge' | 'Sprint'): number {
    const top = 10;
    /* const stat = data.optional[`dailyStat${type}`];
    console.log(stat);
    stat.forEach((elem) => {
      if (elem.inARowSprint > top) top = elem.inARowSprint;
    }); */
    return top;
  }

  private accuracyMiddleDaily(data: Statistics, type: 'AudioChallenge' | 'Sprint'): string {
    // const sum = 10;
    /* const stat = data.optional[`dailyStat${type}`];
    stat.forEach((elem) => {
      sum += elem[`accuracy${type}`];
    })
    return (sum / stat.length) + '%'; */
    return '10%';
  }

  private wordsDaily(data: Statistics, type: 'AudioChallenge' | 'Sprint'): number {
    const words = 10;
    /* const stat = data.optional[`dailyStat${type}`];
    stat.forEach((elem) => {
      sum += elem[`accuracy${type}`];
    })
    return (sum / stat.length) + '%'; */
    return words;
  }

  private authSection(data: Statistics) {
    const fragment = document.createDocumentFragment();
    const allTimeTitle = this.htmlConstructor.createHtmlElement('h2', ['today-title']);
    allTimeTitle.innerText = 'ALL TIME';
    const learnedGraphWrapper = this.htmlConstructor.div(['card', 'card-body', 'learnedGraphWrapper']);
    const learnedGraphTitle = this.htmlConstructor.createHtmlElement('h3', ['card-title', 'graph-title']);
    learnedGraphTitle.innerText = 'Learned words';
    const learnedGraphBody = this.htmlConstructor.createHtmlElement('canvas', ['graph-body'], 'learnedGraphBody');
    learnedGraphWrapper.append(learnedGraphTitle, learnedGraphBody);
    const progressGraphWrapper = this.htmlConstructor.div(['card', 'card-body', 'progressGraphWrapper']);
    const progressGraphTitle = this.htmlConstructor.createHtmlElement('h3', ['card-title', 'graph-title']);
    progressGraphTitle.innerText = 'Progress';
    const progressGraphBody = this.htmlConstructor.createHtmlElement('canvas', ['graph-body'], 'progressGraphBody');
    progressGraphWrapper.append(progressGraphTitle, progressGraphBody);
    fragment.append(allTimeTitle, learnedGraphWrapper, progressGraphWrapper);
    return fragment;
  }

  private drawDiagrams(data: Statistics, type: 'Progress' | 'Learned words') {
    const labels = new Array(7).fill('');
    const graphData = {
      labels,
      datasets: [
        {
          label: `${type}`,
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          data: [0, 10, 5, 2, 20, 30, 45],
        },
      ],
    };
    const config = {
      type: 'line',
      data: graphData,
      options: {},
    };

    const graphID = type === 'Progress' ? 'progressGraphBody' : 'learnedGraphBody';
    const myChart = new Chart(document.getElementById(graphID) as HTMLCanvasElement, config);
  }

  /* async drawDiagrams() {
    const statistics = await services.statisticsService.getStatisticsData();
    const width = 800;
    const height = 400;
    if (statistics) {
      // const { learnedWords } = statistics;
      const learnedWordsPerDay: Array<DailyStatistics> | undefined = statistics?.optional?.learnedWordsPerDay;
      if (learnedWordsPerDay) {
        const svg = d3.select('#statistics-words-id').append('svg').attr('width', width).attr('height', height);
        const x = d3.scaleTyme();
        DOMImplementation(
          d3.extent(learnedWordsPerDay, function (d) {
            return d.date;
          })
        );
        range([0, width]);
        svg.append('g').attr('transform', `translate(0, ${height})`).call(d3.axisBottom(x));
        const y = d3
          .scaleLinear()
          .domain([
            0,
            d3.max(data, function (d) {
              return +d.learnedWords;
            }),
          ])
          .range([height, 0]);

        svg.append('g').call(d3.axisLeft(y));

        svg
          .append('path')
          .datum(learnedWordsPerDay)
          .attr('stroke', 'black')
          .attr('fill', 'none')
          .attr(
            'd',
            d3
              .line()
              .x(function (d) {
                return x(d.date);
              })
              .y(function (d) {
                return y(d.learnedWords);
              })
          );
      }
    }
  } */
}
