import { ReduxStateActions, ReduxStateChange, ReduxStore } from '../client/shared/models/store.model';
import { createStore } from 'redux';
import { isEmpty } from '../common/utils/is-empty.util';

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
      return { ...state, mode: (action as ReduxStateChange<ReduxStateActions.Mode>).payload };
    case ReduxStateActions.Auth:
      return {
        ...state, ...(action as ReduxStateChange<ReduxStateActions.Auth>).payload,
        isLoggedIn: !isEmpty((action as ReduxStateChange<ReduxStateActions.Auth>).payload.userName)
      };
    default:
      return state;
  }

}

export const appStore = createStore(stateReducer as never);
