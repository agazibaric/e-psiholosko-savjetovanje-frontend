import { Service } from 'types';
import { Doctor, Patient } from './User';

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

export interface Termin {
  id: number;
  terminStart: string;
  terminEnd: string;
  terminType: string;
  description: string;
}

export interface Meeting {
  id: number;
  patient: Patient;
  doctor: Doctor;
  termins: Array<Termin>;
  service: Service;
  description: string;
}

export interface Message {
  content: string;
  self: boolean;
  type: string;
  creationDate: string;
  meetingId: number;
}
