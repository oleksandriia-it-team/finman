import { useEffect } from 'react';
import { ReduxStateActions, UseDispatch } from '../shared/models/store.model';
import { useDispatch } from 'react-redux';
import { useInject } from '../shared/contexts/use-inject.context';
import { authServiceProvider } from '../data-access/auth-service/auth.service';
import { ChildrenComponentProps } from '../shared/models/component-with-chilren.model';

export default function InitApplication({ children }: ChildrenComponentProps) {
  const dispatch: UseDispatch = useDispatch() as UseDispatch;
  const authService = useInject(authServiceProvider, true);

  useEffect(() => {
    const user = authService.getUser();

    if (user) {
      dispatch({
        type: ReduxStateActions.Auth,
        payload: {
          userName: user.userName,
          preferableLocale: user.preferableLocale,
          language: user.language,
        },
      });
    }
  }, [ authService, dispatch ]);
  return children;
}