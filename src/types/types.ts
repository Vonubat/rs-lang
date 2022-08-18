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

/* API Request classes */

export interface WordsClass {
  rawResponse: Response;
  getWords({ groupNumber, pageNumber }: { groupNumber: number; pageNumber: number }): Promise<WordsResponseSchema[]>;
  getWordById({ wordId }: { wordId: string }): Promise<WordsResponseSchema>;
}
