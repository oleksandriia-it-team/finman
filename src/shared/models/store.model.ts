// TODO add later
export interface ReduxStore {
  mode: 'dark' | 'light';
}

export const enum ReduxStateActions {
  Mode = 'mode'
}

export interface ReduxStateChangeTypes {
  [ReduxStateActions.Mode]: 'dark' | 'light';
}

export interface ReduxStateChange<T extends ReduxStateActions> {
  type: T;
  payload: ReduxStateChangeTypes[T];
}

export type UseDispatch = <T extends ReduxStateActions>(data: ReduxStateChange<T>) => void;