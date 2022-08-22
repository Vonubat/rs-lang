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
  optional?: Optional;
}

export interface UserWord {
  difficulty: string;
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
