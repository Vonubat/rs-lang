/* Response Schemas */
export interface WordsResponseSchema {
  id: string;
  group: number;
  page: number;
  word: string;
  image: string;
  audio: string;
  audioMeaning: string;
  audioExample: string;
  textMeaning: string;
  textExample: string;
  transcription: string;
  wordTranslate: string;
  textMeaningTranslate: string;
  textExampleTranslate: string;
}

export interface TokensSchema {
  token: string;
  refreshToken: string;
}

export interface AuthResponseSchema extends TokensSchema {
  message: string;
  userId: string;
  name: string;
}

export interface CredentialsSchema {
  email: string;
  password: string;
}

export interface UserSchema extends CredentialsSchema {
  name: string;
}

export interface UserResponseSchema extends CredentialsSchema {
  id: string;
}

export interface UsersWordsResponseSchema {
  id: string;
  difficulty: string;
  wordId: string;
  optional?: Optional;
}

export interface UsersWordsRequestSchema {
  difficulty: string;
  optional?: Optional;
}

export interface AggregatedWords {
  paginatedResults: PaginatedResult[];
  totalCount: TotalCount[];
}

export interface PaginatedResult {
  _id: string;
  group: number;
  page: number;
  word: string;
  image: string;
  audio: string;
  audioMeaning: string;
  audioExample: string;
  textMeaning: string;
  textExample: string;
  transcription: string;
  textExampleTranslate: string;
  textMeaningTranslate: string;
  wordTranslate: string;
  userWord?: UserWord;
}

export interface UserWord {
  difficulty: string;
  optional?: Optional;
}

interface TotalCount {
  count: number;
}

interface Optional {
  [index: string]: string;
}

export interface Statistics {
  learnedWords: number;
  id?: string;
  optional?: Optional;
}

export interface Settings {
  wordsPerDay: number;
  id?: string;
  optional?: Optional;
}

// https://gist.github.com/daxartio/f387e811ba38eca5d5f8bff53f9fadb1
export type CookiesOptions = {
  expires?: Date | number | string;
  path?: string;
  domain?: string;
  secure?: boolean;
  'max-age'?: number;
};

export enum StatusCodes {
  IncorrectEmailOrPassword = 403,
}

export type Action = '+' | '-';

export interface PageConfigResponce {
  pageNumber: number;
  groupNumber: number;
}

export type TypeOfPagination = 'Page' | 'Group';

export interface Team {
  name: string;
  github: string;
}

export function TypeOfWordIsPaginatedResult(word: WordsResponseSchema | PaginatedResult): word is PaginatedResult {
  return '_id' in word;
}

type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;

export type Color = RGB | RGBA | HEX;

export interface WordsStatistics {
  [key: string]: WordsStatistic;
}

export interface WordsStatistic {
  word: string;
  wordId: string;
  wordTranslate: string;
  audio: string;
  correctAttempts: number;
  incorrectAttempts: number;
  difficulty?: string | null;
}
