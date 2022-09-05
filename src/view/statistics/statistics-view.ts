// import d3, { range } from 'd3';
import Chart from 'chart.js/auto';
import Constants from '../../constants';
import HTMLConstructor from '../components/constructor';
import { services } from '../../services/services';
import { SprintSchema, Statistics } from '../../types/types';

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
      this.sectionTodayWordsLearned(data),
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
    console.log(data);
    if (main) {
      main.innerHTML = '';
      main.append(this.view(data));
      if (data) {
        this.drawDiagrams(data, 'Progress');
        this.drawDiagrams(data, 'Learned words');
      }
    }
  }

  private sectionTodayWordsLearned(data: Statistics | null) {
    const section = this.htmlConstructor.div(['card', 'today-wrapper']);
    const wordsLearned = this.htmlConstructor.div(['card-body', 'today-words-learned']);
    const wordAmount = this.htmlConstructor.createHtmlElement('h2', ['words-learned']);
    if (data) {
      wordAmount.innerText = `${this.wordsDaily(data)}`;
    } else wordAmount.innerText = '0';
    const body = this.htmlConstructor.div(['card-body']);
    const wordtitle = this.htmlConstructor.createHtmlElement('h3', ['card-title', 'words-learned-title']);
    wordtitle.innerText = 'words';
    const subTitle = this.htmlConstructor.createHtmlElement('h4', ['card-subtitle', 'text-muted']);
    subTitle.innerText = 'were learned';
    body.append(wordtitle, subTitle);
    wordsLearned.append(wordAmount, body);
    const accuracy = this.htmlConstructor.div(['card-body', 'today-accuracy']);
    const accuracyAmount = this.htmlConstructor.createHtmlElement('h2', ['accuracy-today-amount']);
    if (data) {
      accuracyAmount.innerText = this.accuracyDaily(data);
    } else accuracyAmount.innerText = '0%';
    const accuracyTitle = this.htmlConstructor.createHtmlElement('h3', ['card-title', 'accuracy-today-title']);
    accuracyTitle.innerText = 'Accuracy';
    accuracy.append(accuracyAmount, accuracyTitle);
    const topRow = this.htmlConstructor.div(['card-body', 'today-topRow']);
    const topRowAmount = this.htmlConstructor.createHtmlElement('h2', ['topRow-today-amount']);
    if (data) {
      topRowAmount.innerText = `${this.topInRowDaily(data)}`;
    } else topRowAmount.innerText = '0';
    const topRowTitle = this.htmlConstructor.createHtmlElement('h3', ['card-title', 'topRow-today-title']);
    topRowTitle.innerText = 'top in a row';
    topRow.append(topRowAmount, topRowTitle);
    section.append(wordsLearned, accuracy, topRow);
    return section;
  }

  private wordsDaily(data: Statistics) {
    let word = 0;
    const folderSprint = data.optional?.dailyStatSprint;
    const folderAudioChallenge = data.optional?.dailyStatAudioChallenge;
    if (typeof folderSprint === 'object' && typeof folderAudioChallenge === 'object') {
      const valuesSprint = Object.values(folderSprint)[0].learnedWordsCounterSprint as number;
      const valuesAudioChallenge = Object.values(folderAudioChallenge)[0].learnedWordsCounterAudioChallenge as number;
      word = valuesSprint + valuesAudioChallenge;
    }
    return word;
  }

  private accuracyDaily(data: Statistics) {
    let accuracy = 0;
    const folderSprint = data.optional?.dailyStatSprint;
    const folderAudioChallenge = data.optional?.dailyStatAudioChallenge;
    if (typeof folderSprint === 'object' && typeof folderAudioChallenge === 'object') {
      const accuracySprint = Object.values(folderSprint)[0].accuracySprint as number;
      const accuracyAudioChallenge = Object.values(folderAudioChallenge)[0].accuracyAudioChallenge as number;
      accuracy = Math.floor((100 * (accuracySprint + accuracyAudioChallenge)) / 2) / 100;
    }
    return `${accuracy}%`;
  }

  private topInRowDaily(data: Statistics) {
    let topRow = 0;
    const folderSprint = data.optional?.dailyStatSprint;
    const folderAudioChallenge = data.optional?.dailyStatAudioChallenge;
    if (typeof folderSprint === 'object' && typeof folderAudioChallenge === 'object') {
      const valuesSprint = Object.values(folderSprint)[0].inARowSprint as number;
      const valuesAudioChallenge = Object.values(folderAudioChallenge)[0].inARowAudioChallenge as number;
      topRow = valuesSprint > valuesAudioChallenge ? valuesSprint : valuesAudioChallenge;
    }
    return topRow;
  }

  private sectionGameLearned(gameName: 'Sprint' | 'AudioChallenge', data: Statistics | null) {
    const section = this.htmlConstructor.div(['card', `game-${gameName.toLowerCase()}-learned`]);
    const title = this.htmlConstructor.createHtmlElement('h2', [`game-${gameName.toLowerCase()}-title`, 'game-title']);
    title.innerText = gameName;
    const body = this.htmlConstructor.div(['card-body']);
    const wordsWrapper = this.htmlConstructor.div(['card-body', 'stat-wrapper']);
    const wordsAmount = this.htmlConstructor.createHtmlElement('h4');
    if (data) {
      wordsAmount.innerText = `${this.gameWordsDaily(data, gameName)}`;
    } else wordsAmount.innerText = '0';
    const wordsTitle = this.htmlConstructor.createHtmlElement('h3', ['card-title']);
    wordsTitle.innerText = 'words';
    wordsWrapper.append(wordsAmount, wordsTitle);
    const accuracyWrapper = this.htmlConstructor.div(['card-body', 'stat-wrapper']);
    const accuracyAmount = this.htmlConstructor.createHtmlElement('h4');
    if (data) {
      accuracyAmount.innerText = this.gameAccuracyDaily(data, gameName);
    } else accuracyAmount.innerText = '0%';
    const accuracyTitle = this.htmlConstructor.createHtmlElement('h3', ['card-title']);
    accuracyTitle.innerText = 'accuracy';
    accuracyWrapper.append(accuracyAmount, accuracyTitle);
    const inRowWrapper = this.htmlConstructor.div(['card-body', 'stat-wrapper']);
    const inRowAmount = this.htmlConstructor.createHtmlElement('h4');
    if (data) {
      inRowAmount.innerText = `${this.gameTopInRowDaily(data, gameName)}`;
    } else inRowAmount.innerText = '0';
    const inRowTitle = this.htmlConstructor.createHtmlElement('h3', ['card-title']);
    inRowTitle.innerText = 'in a row';
    inRowWrapper.append(inRowAmount, inRowTitle);
    body.append(wordsWrapper, accuracyWrapper, inRowWrapper);
    section.append(title, body);
    return section;
  }

  private gameTopInRowDaily(data: Statistics, type: 'AudioChallenge' | 'Sprint'): number {
    let top = 0;
    const folder = (data.optional as SprintSchema)[`dailyStat${type}`];
    if (typeof folder === 'object') {
      const values = Object.values(folder) as SprintSchema[];
      top = values[0][`inARow${type}`] as number;
    }
    return top;
  }

  private gameAccuracyDaily(data: Statistics, type: 'AudioChallenge' | 'Sprint'): string {
    let sum = 0;
    const folder = (data.optional as SprintSchema)[`dailyStat${type}`];
    if (typeof folder === 'object') {
      const values = Object.values(folder) as SprintSchema[];
      sum = values[0][`accuracy${type}`] as number;
    }
    return `${sum}%`;
  }

  private gameWordsDaily(data: Statistics, type: 'AudioChallenge' | 'Sprint'): number {
    let words = 0;
    const folder = (data.optional as SprintSchema)[`dailyStat${type}`];
    if (typeof folder === 'object') {
      const values = Object.values(folder) as SprintSchema[];
      words = values[0][`learnedWordsCounter${type}`] as number;
    }
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
