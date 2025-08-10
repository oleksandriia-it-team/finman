import { ReduxStateActions, ReduxStateChange, ReduxStore } from '../shared/models/store.model';
import { createStore } from 'redux';
import { isEmpty } from '../shared/utils/is-empty.util';

const initialState: ReduxStore = {
  mode: 'light',
  language: 'en',
  userName: '',
  preferableLocale: 'en',
  isLoggedIn: false,
};

function stateReducer<T extends ReduxStateActions>(state: ReduxStore = initialState, action: ReduxStateChange<T>): ReduxStore {

  switch (action.type) {
    case ReduxStateActions.Mode:
      return { ...state, mode: action.payload };
    case ReduxStateActions.Auth:
      return { ...state, ...action.payload, isLoggedIn: !isEmpty(action.payload.userName) };
    default:
      return state;
  }

}

export const appStore = createStore(stateReducer);
