import Chart, { ChartConfiguration, ChartConfigurationCustomTypesPerDataset, ChartTypeRegistry } from 'chart.js/auto';
import Constants from '../../constants';
import HTMLConstructor from '../components/constructor';
import { services } from '../../services/services';
import {
  AudioChallengeSchema,
  DailyStatAudioChallenge,
  DailyStatSprint,
  LongStatSprint,
  SprintSchema,
  Statistics,
} from '../../types/types';

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
    if (data) statsPerDay.append(this.authSection());
    statistics.append(words, statsPerDay);
    fragment.append(statistics);
    return fragment;
  }

  async drawPage(): Promise<void> {
    const main: HTMLElement | null = document.getElementById(this.mainId);
    let data: Statistics | Response | null = await services.statisticsService.getStatisticsData();
    if (data instanceof Response) {
      data = null;
    }
    if (main) {
      main.innerHTML = '';
      main.append(this.view(data));
      if (data) {
        console.log(data);
        this.drawDiagrams(data, 'Progress');
        this.drawDiagrams(data, 'Learned words');
        this.drawDiagrams(data, 'New Words');
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
    const newWords = this.htmlConstructor.div(['card-body', 'today-newWords']);
    const newWordsAmount = this.htmlConstructor.createHtmlElement('h2', ['newWords-today-amount']);
    if (data) {
      newWordsAmount.innerText = `${this.newWordsDaily(data)}`;
    } else newWordsAmount.innerText = '0';
    const newWordsTitle = this.htmlConstructor.createHtmlElement('h3', ['card-title', 'newWords-today-title']);
    newWordsTitle.innerText = 'New Words';
    newWords.append(newWordsAmount, newWordsTitle);
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
    section.append(wordsLearned, newWords, accuracy, topRow);
    return section;
  }

  private newWordsDaily(data: Statistics) {
    let word = 0;
    const folderSprint = data.optional?.dailyStatSprint;
    const folderAudioChallenge = data.optional?.dailyStatAudioChallenge;
    if (typeof folderSprint === 'object') word += Object.values(folderSprint)[0].newWordsCounterSprint as number;
    if (typeof folderAudioChallenge === 'object')
      word += Object.values(folderAudioChallenge)[0].newWordsCounterAudioChallenge as number;
    return word;
  }

  private wordsDaily(data: Statistics) {
    let word = 0;
    const folderSprint = data.optional?.dailyStatSprint;
    const folderAudioChallenge = data.optional?.dailyStatAudioChallenge;
    if (typeof folderSprint === 'object') word += Object.values(folderSprint)[0].learnedWordsCounterSprint as number;
    if (typeof folderAudioChallenge === 'object')
      word += Object.values(folderAudioChallenge)[0].learnedWordsCounterAudioChallenge as number;
    return word;
  }

  private accuracyDaily(data: Statistics) {
    const folderSprint = data.optional?.dailyStatSprint;
    const folderAudioChallenge = data.optional?.dailyStatAudioChallenge;
    const accuracySprint =
      typeof folderSprint === 'object' ? (Object.values(folderSprint)[0].accuracySprint as number) : 0;
    const accuracyAudioChallenge =
      typeof folderAudioChallenge === 'object'
        ? (Object.values(folderAudioChallenge)[0].accuracyAudioChallenge as number)
        : 0;
    const accuracy = Math.floor((100 * (accuracySprint + accuracyAudioChallenge)) / 2) / 100;
    return `${accuracy}%`;
  }

  private topInRowDaily(data: Statistics) {
    const folderSprint = data.optional?.dailyStatSprint;
    const folderAudioChallenge = data.optional?.dailyStatAudioChallenge;
    const valuesSprint = typeof folderSprint === 'object' ? (Object.values(folderSprint)[0].inARowSprint as number) : 0;
    const valuesAudioChallenge =
      typeof folderAudioChallenge === 'object'
        ? (Object.values(folderAudioChallenge)[0].inARowAudioChallenge as number)
        : 0;
    const topRow = valuesSprint > valuesAudioChallenge ? valuesSprint : valuesAudioChallenge;
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
    const newWordsWrapper = this.htmlConstructor.div(['card-body', 'stat-wrapper']);
    const newWordsAmount = this.htmlConstructor.createHtmlElement('h4');
    if (data) {
      newWordsAmount.innerText = `${this.gameNewWordsDaily(data, gameName)}`;
    } else newWordsAmount.innerText = '0';
    const newWordsTitle = this.htmlConstructor.createHtmlElement('h3', ['card-title']);
    newWordsTitle.innerText = 'new words';
    newWordsWrapper.append(newWordsAmount, newWordsTitle);
    const accuracyWrapper = this.htmlConstructor.div(['card-body', 'stat-wrapper']);
    const accuracyAmount = this.htmlConstructor.createHtmlElement('h4');
    if (data) {
      const value = this.gameAccuracyDaily(data, gameName);
      accuracyAmount.innerText = value;
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
    body.append(wordsWrapper, newWordsWrapper, accuracyWrapper, inRowWrapper);
    section.append(title, body);
    return section;
  }

  private gameTopInRowDaily(data: Statistics, type: 'AudioChallenge' | 'Sprint'): number {
    let top = 0;
    let folder: DailyStatSprint | DailyStatAudioChallenge | undefined;
    if (data.optional) {
      folder = data.optional[`dailyStat${type}`];

      if (typeof folder === 'object') {
        const values: SprintSchema[] | AudioChallengeSchema[] = Object.values(folder);
        if (type === 'Sprint') {
          top = (values[0] as SprintSchema).inARowSprint as number;
        } else {
          top = (values[0] as AudioChallengeSchema).inARowAudioChallenge as number;
        }
      }
    }

    return top;
  }

  private gameAccuracyDaily(data: Statistics, type: 'AudioChallenge' | 'Sprint'): string {
    let sum = 0;
    let folder: DailyStatSprint | DailyStatAudioChallenge | undefined;
    if (data.optional) {
      folder = data.optional[`dailyStat${type}`];

      if (typeof folder === 'object') {
        const values: SprintSchema[] | AudioChallengeSchema[] = Object.values(folder);
        if (type === 'Sprint') {
          sum = (values[0] as SprintSchema).accuracySprint as number;
        } else {
          sum = (values[0] as AudioChallengeSchema).accuracyAudioChallenge as number;
        }
      }
    }

    return `${sum}%`;
  }

  private gameWordsDaily(data: Statistics, type: 'AudioChallenge' | 'Sprint'): number {
    let words = 0;
    let folder: DailyStatSprint | DailyStatAudioChallenge | undefined;
    if (data.optional) {
      folder = data.optional[`dailyStat${type}`];

      if (typeof folder === 'object') {
        const values: SprintSchema[] | AudioChallengeSchema[] = Object.values(folder);
        if (type === 'Sprint') {
          words = (values[0] as SprintSchema).learnedWordsCounterSprint as number;
        } else {
          words = (values[0] as AudioChallengeSchema).learnedWordsCounterAudioChallenge as number;
        }
      }
    }

    return words;
  }

  private gameNewWordsDaily(data: Statistics, type: 'AudioChallenge' | 'Sprint'): number {
    let words = 0;
    let folder: DailyStatSprint | DailyStatAudioChallenge | undefined;
    if (data.optional) {
      folder = data.optional[`dailyStat${type}`];
      if (typeof folder === 'object') {
        const values: SprintSchema[] | AudioChallengeSchema[] = Object.values(folder);
        if (type === 'Sprint') {
          words = (values[0] as SprintSchema).newWordsCounterSprint as number;
        } else {
          words = (values[0] as AudioChallengeSchema).newWordsCounterAudioChallenge as number;
        }
      }
    }
    return words;
  }

  private authSection() {
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

    const newWordsGraphWrapper = this.htmlConstructor.div(['card', 'card-body', 'newWordsGraphWrapper']);
    const newWordsGraphTitle = this.htmlConstructor.createHtmlElement('h3', ['card-title', 'graph-title']);
    newWordsGraphTitle.innerText = 'New Words';
    const newWordsGraphBody = this.htmlConstructor.createHtmlElement('canvas', ['graph-body'], 'newWordsGraphBody');
    newWordsGraphWrapper.append(newWordsGraphTitle, newWordsGraphBody);

    fragment.append(allTimeTitle, learnedGraphWrapper, progressGraphWrapper, newWordsGraphWrapper);
    return fragment;
  }

  private drawDiagrams(data: Statistics, type: 'Progress' | 'Learned words' | 'New Words') {
    const dataForGraphs = this.dataForGraphs(data, type);
    const labels = dataForGraphs.map((value) => value[0]);
    let color = 'rgba(54, 162, 235, 1)';
    if (type === 'Learned words') color = 'rgb(255, 99, 132)';
    if (type === 'New Words') color = 'rgba(75, 192, 192, 1)';
    const graphData = {
      labels,
      datasets: [
        {
          label: `${type}`,
          backgroundColor: color,
          borderColor: color,
          data: dataForGraphs.map((value) => value[1]),
        },
      ],
    };
    const config:
      | ChartConfiguration<keyof ChartTypeRegistry, number[], string | Date>
      | ChartConfigurationCustomTypesPerDataset<keyof ChartTypeRegistry, number[], string | Date> = {
      type: 'line',
      data: graphData,
      options: {},
    };

    let graphID = 'progressGraphBody';
    if (type === 'Learned words') graphID = 'learnedGraphBody';
    if (type === 'New Words') graphID = 'newWordsGraphBody';
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const myChart = new Chart(document.getElementById(graphID) as HTMLCanvasElement, config);
  }

  private dataForGraphs(data: Statistics, type: 'Progress' | 'Learned words' | 'New Words'): [Date | string, number][] {
    let result: [Date | string, number][] = [];
    const folderSprint: LongStatSprint | undefined = data.optional?.longStatSprint;
    if (folderSprint) {
      const keys: string[] = Object.keys(folderSprint);
      keys.forEach((key: string): void => {
        const value =
          type === 'New Words' ? folderSprint[key].newWordsCounterSprint : folderSprint[key].learnedWordsCounterSprint;
        result.push([key, value as number]);
      });
    }
    const folderAudioChallenge = data.optional?.longStatAudioChallenge;
    if (folderAudioChallenge) {
      const keys: string[] = Object.keys(folderAudioChallenge);
      keys.forEach((key: string): void => {
        const value =
          type === 'New Words'
            ? folderAudioChallenge[key].newWordsCounterAudioChallenge
            : folderAudioChallenge[key].learnedWordsCounterAudioChallenge;
        result.push([key, value as number]);
      });
    }
    result.sort();
    result = result.map((e: [Date | string, number]): [Date | string, number] => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      [(e[0] = new Date(+e[0])), e[1]];
      return [e[0], e[1]];
    });
    result = this.zipData(result);
    if (type === 'Progress') {
      for (let i = 1; i < result.length; i += 1) {
        // eslint-disable-next-line operator-assignment
        result[i][1] = (result[i][1] as number) + (result[i - 1][1] as number);
      }
    }
    return result;
  }

  private zipData(data: [Date | string, number][]): [Date | string, number][] {
    const datesAreOnSameDay = (first: Date, second: Date) =>
      first &&
      second &&
      first.getFullYear() === second.getFullYear() &&
      first.getMonth() === second.getMonth() &&
      first.getDate() === second.getDate();
    const result: [Date, number][] = [];
    let date: Date | number | string;
    let amount = 0;
    for (let i = 0; i < data.length; i += 1) {
      [date] = data[i];
      if (i < data.length - 1 && datesAreOnSameDay(data[i][0] as Date, data[i + 1][0] as Date)) {
        amount += data[i][1];
      } else if (i === data.length - 1 && datesAreOnSameDay(data[i][0] as Date, data[i - 1][0] as Date)) {
        amount += data[i][1];
        result.push([date as Date, amount]);
      } else {
        result.push([date as Date, amount]);
        date = 0;
        amount = 0;
      }
    }
    // if (amount) result.push([date, amount]);
    result.forEach((elem: [Date | string, number]): void => {
      const buffer = `${(elem[0] as Date).getDate()}.${(elem[0] as Date).getMonth()}.${(elem[0] as Date).getFullYear()}`;
      // eslint-disable-next-line no-param-reassign
      elem[0] = buffer;
    });
    return result;
  }
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
