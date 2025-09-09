import { useCallback, useEffect, useState } from 'react';
import { ReduxStateActions, UseDispatch } from '../shared/models/store.model';
import { useDispatch } from 'react-redux';
import { useInject } from '../shared/contexts/use-inject.context';
import { userInformationServiceProvider } from '../data-access/user-information/user-information.service';
import { ChildrenComponentProps } from '../shared/models/component-with-chilren.model';
import { useResource } from '../shared/hooks/use-resource.hook';
import { lookupsProvider } from '../data-access/lookups/lookups.service';
import { LookupsTypeEnum } from './api/lookups/shared/enums/lookups-type.enum';

// Example how you have to test this hook
export default function InitApplication({ children }: ChildrenComponentProps) {
  const dispatch: UseDispatch = useDispatch() as UseDispatch;
  const authService = useInject(userInformationServiceProvider, true);

  const lookupsService = useInject(lookupsProvider, true);

  const [ type, setType ] = useState(LookupsTypeEnum.CountriesAndLocales);

  const getItemsFn = useCallback((signal: AbortSignal) => {
    return new Promise(resolve => {
      setTimeout(() => resolve(lookupsService.getItems(type, 1, Math.floor(Math.random() * 100 % 20) && 2, signal)), 1000);
    });
  }, [ type ]);

  const valueResource = useResource(getItemsFn);

  useEffect(() => {
    console.log(valueResource.value);
  }, [ valueResource.value ]);

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


  return (
    <>
      <button onClick={ () => valueResource.refresh() }>Refresh</button>
      <button
        onClick={ () => setType(current => current === LookupsTypeEnum.CountriesAndLocales ? LookupsTypeEnum.Languages : LookupsTypeEnum.CountriesAndLocales) }>Change
        method
      </button>

      { children }
    </>
  );
}