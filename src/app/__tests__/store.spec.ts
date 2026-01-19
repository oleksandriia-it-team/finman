import { appStore } from '../store';
import { ReduxStateActions, ReduxStore } from '../../client/shared/models/store.model';
import { describe, expect, it } from 'vitest';

describe('stateReducer', () => {
  it('should change theme to dark mode', () => {
    appStore.dispatch({ type: ReduxStateActions.Mode, payload: 'dark' });

    expect((appStore.getState() as ReduxStore).mode).toBe('dark');
  });
});