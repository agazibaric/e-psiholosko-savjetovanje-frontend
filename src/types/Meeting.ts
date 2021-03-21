export interface AnswerOptions {
  options: Array<string>;
  hasOther: boolean;
}

export interface Question {
  id: number;
  isMultiSelect: boolean;
  content: string;
  answers?: AnswerOptions;
  isMandatory: boolean;
}

export interface Answer {
  id: number;
  questionId: number;
  answer?: string;
}
