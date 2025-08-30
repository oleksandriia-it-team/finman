import { useEffect } from 'react';
import { ReduxStateActions, UseDispatch } from '../shared/models/store.model';
import { useDispatch } from 'react-redux';
import { useInject } from '../shared/contexts/use-inject.context';
import { userInformationServiceProvider } from '../data-access/user-information/user-information.service';
import { ChildrenComponentProps } from '../shared/models/component-with-chilren.model';

export default function InitApplication({ children }: ChildrenComponentProps) {
  const dispatch: UseDispatch = useDispatch() as UseDispatch;
  const authService = useInject(userInformationServiceProvider, true);

  useEffect(() => {
    const user = authService.getAllUserInformation();

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