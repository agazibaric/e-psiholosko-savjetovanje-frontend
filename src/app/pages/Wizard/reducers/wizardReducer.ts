import { Service } from 'types';

export interface WizardState {
  selectedService: Service;
  answers: Array<any>;
  doctors: Array<any>;
}

export const initialWizardState = {
  selectedService: {} as Service,
  answers: [],
  doctors: [],
} as WizardState;

export enum WizardActionType {
  SET_SERVICE = 'SET_SERVICE',
  SET_ANSWERS = 'SET_ANSWERS',
  SET_DOCTORS = 'SET_DOCTORS',
}

export interface WizardPayload {
  service?: Service;
  answers?: any;
  doctors?: any;
}

export interface WizardAction {
  type: WizardActionType;
  payload: WizardPayload;
}

export const wizardReducer = (state: WizardState, action: WizardAction) => {
  switch (action.type) {
    case WizardActionType.SET_SERVICE:
      return { ...state, selectedService: action.payload.service as Service };
    case WizardActionType.SET_ANSWERS:
      return { ...state, answers: action.payload.answers as any };
    case WizardActionType.SET_DOCTORS:
      return { ...state, doctors: action.payload.doctors as any };
    default:
      throw new Error(`Invalid Wizard action type: ${action.type}`);
  }
};
