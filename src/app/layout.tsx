'use client';

import './globals.scss';

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

export default function MainLayout({ children }: ChildrenComponentProps) {

  // Memoize service instances to avoid recreating them on every render
  const providers = useMemo(async () => {
    try {
      const localStorageService = new LocalStorageService();
      const userInformationService = new UserInformationService(localStorageService);
      const databaseService = await DatabaseService.initDB(DatabaseName, Object.values(Tables), 1);


      const delayedExpensesService = new DelayedExpensesService(databaseService);
      const regularExpensesAndIncomesService = new RegularExpensesAndIncomesService(databaseService);
      const budgetPlanService = new BudgetPlanService(databaseService, delayedExpensesService);

      return [
        {
          token: userInformationServiceProvider,
          value: userInformationService
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
      ];
    } catch {
      // TODO add handling errors during database connection
      console.log('ERROR');
    }

  }, []);

  return (
    <html lang="en">
      <body className="w-screen h-screen">
        <Provider store={ appStore }>
          <PrimeReactProvider>
            <ProvideDependencies providers={ providers }>
              <LoadThemeComponent>
                { children }
              </LoadThemeComponent>
            </ProvideDependencies>
          </PrimeReactProvider>
        </Provider>
      </body>
    </html>
  );
}