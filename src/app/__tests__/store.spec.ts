import { appStore } from '../store';
import { ReduxStateActions } from '../../shared/models/store.model';
import { describe, expect, it } from 'vitest';

describe('stateReducer', () => {
  it('should change theme to dark mode', () => {
    appStore.dispatch({ type: ReduxStateActions.Mode, payload: 'dark' });

    expect(appStore.getState().mode).toBe('dark');
  });
});