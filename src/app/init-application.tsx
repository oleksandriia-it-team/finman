import { useEffect } from 'react';
import { ReduxStateActions, UseDispatch } from '../client/shared/models/store.model';
import { useDispatch } from 'react-redux';
import { userInformationService, } from '../client/entities/user-information/user-information.service';
import { ChildrenComponentProps } from '../client/shared/models/component-with-chilren.model';
import { databaseService } from '../client/database/database.service';

export default function InitApplication({ children }: ChildrenComponentProps) {
  const dispatch: UseDispatch = useDispatch() as UseDispatch;

  useEffect(() => {
    const user = userInformationService.getAllUserInformation();

    databaseService.connect();

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
  }, [ dispatch ]);
  return children;
}