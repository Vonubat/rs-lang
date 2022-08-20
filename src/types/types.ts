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

export type User = {
  name: string;
  email: string;
  password: string;
};

// https://gist.github.com/daxartio/f387e811ba38eca5d5f8bff53f9fadb1
export type CookiesOptions = {
  expires?: Date | number | string;
  path?: string;
  domain?: string;
  secure?: boolean;
  'max-age'?: number;
};

export interface AuthResponseSchema {
  message: string;
  token: string;
  refreshToken: string;
  userId: string;
  name: string;
}

export enum StatusCodes {
  IncorrectEmailOrPassword = 403,
}

export type Statistics = {
  learnedWords: number;
  // TODO: check optional type
  // optional: Object
};
