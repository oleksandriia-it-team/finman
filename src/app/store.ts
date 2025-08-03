import { ReduxStateActions, ReduxStateChange, ReduxStore } from '../shared/models/store.model';
import { createStore } from 'redux';

const initialState: ReduxStore = {
  mode: 'light'
}

function stateReducer<T extends ReduxStateActions>(state: ReduxStore = initialState, action: ReduxStateChange<T>): ReduxStore {

  switch (action.type) {
    case ReduxStateActions.Mode: return { ...state, mode: action.payload };
    default: return state;
  }

}

export const appStore = createStore(stateReducer);
