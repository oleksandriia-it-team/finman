import { UserInformation } from '../../data-access/user-information/models/user-infomation.model';

// TODO add later
export interface ReduxStore {
  mode: 'dark' | 'light';
  userName: string | null;
  language: string;
  preferableLocale: string;
  isLoggedIn: boolean;
}

export const enum ReduxStateActions {
  Mode = 'mode',
  Auth = 'auth'
}

export interface ReduxStateChangeTypes {
  [ReduxStateActions.Mode]: 'dark' | 'light';
  [ReduxStateActions.Auth]: UserInformation;
}

export interface ReduxStateChange<T extends ReduxStateActions> {
  type: T;
  payload: ReduxStateChangeTypes[T];
}

export type UseDispatch = <T extends ReduxStateActions>(data: ReduxStateChange<T>) => void;