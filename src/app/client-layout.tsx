'use client';

import './styles/globals.scss';

import { Provider } from 'react-redux';

import { appStore } from './store';
import { PrimeReactProvider } from 'primereact/api';
import { ChildrenComponentProps } from '../shared/models/component-with-chilren.model';
import LoadThemeComponent from '../shared/сomponents/load-theme/load-theme.component';
import ProvideDependencies from '../shared/contexts/use-inject.context';
import {
  UserInformationService,
  userInformationServiceProvider
} from '../data-access/user-information/user-information.service';
import { LocalStorageService, localStorageServiceProvider } from '../data-access/local-storage/local-storage.service';
import { useMemo } from 'react';
import { DatabaseService } from '../data-access/database/database.service';
import { DatabaseName, Tables } from '../data-access/database/constants/database.constants';
import { BudgetPlanService, budgetPlanServiceProvider } from '../data-access/budget-plan/budget-plan.service';
import {
  DelayedExpensesService,
  delayedExpensesServiceProvider
} from '../data-access/delayes-expenses/delayed-expenses.service';
import {
  RegularExpensesAndIncomesService,
  regularExpensesAndIncomesServiceProvider
} from '../data-access/regular-expenses-and-incomes/regular-expenses-and-incomes.service';
import { InjectProvider } from '../shared/models/inject-provider.model';
import InitApplication from './init-application';
import Header from '../shared/сomponents/header/header';

export default function MainLayout({ children }: ChildrenComponentProps) {

  // Memoize service instances to avoid recreating them on every render
  const providers = useMemo(() => {
    try {
      const localStorageService = new LocalStorageService();
      const authService = new UserInformationService(localStorageService);
      const databaseService = new DatabaseService(DatabaseName, Object.values(Tables), 1);

      databaseService.connect();

      const delayedExpensesService = new DelayedExpensesService(databaseService);
      const regularExpensesAndIncomesService = new RegularExpensesAndIncomesService(databaseService);
      const budgetPlanService = new BudgetPlanService(databaseService, delayedExpensesService);

      return [
        {
          token: userInformationServiceProvider,
          value: authService
        },
        {
          token: localStorageServiceProvider,
          value: localStorageService
        },
        {
          token: delayedExpensesServiceProvider,
          value: delayedExpensesService
        },
        {
          token: regularExpensesAndIncomesServiceProvider,
          value: regularExpensesAndIncomesService
        },
        {
          token: budgetPlanServiceProvider,
          value: budgetPlanService
        }
      ] as InjectProvider[];
    } catch {
      // TODO add handling errors during database connection
      console.log('ERROR');

      return [];
    }

  }, []);

  return (
    <Provider store={ appStore }>
      <PrimeReactProvider>
        <ProvideDependencies providers={ providers }>
          <LoadThemeComponent>
            <InitApplication>
              <div className="flex flex-col w-screen h-screen">
                <Header/>
                <div className="flex-1">
                  { children }
                </div>
              </div>
            </InitApplication>
          </LoadThemeComponent>
        </ProvideDependencies>
      </PrimeReactProvider>
    </Provider>
  );
}