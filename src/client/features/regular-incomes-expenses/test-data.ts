import { TransactionCardProps } from '@frontend/entities/budget-plan/transaction-card/props/transaction-card-props';

export const myMocks: TransactionCardProps[] = [
  {
    type: 'income',
    title: 'Зарплата',
    subtitle: 'Основний дохід за березень + бонус за закриття спринта',
    amount: '45000',
  },
  {
    type: 'expense',
    title: 'Оренда квартири',
    subtitle: 'Оплата за квітень, включаючи комунальні послуги',
    amount: '12000',
  },
  {
    type: 'income',
    title: 'Стипендія',
    subtitle: 'Академічна стипендія за успішне навчання',
    amount: '2000',
  },
  {
    type: 'expense',
    title: 'Продукти (Сільпо)',
    subtitle: 'Закупка на тиждень',
    amount: '2450',
  },
  {
    type: 'expense',
    title: 'Netflix Subscription',
    subtitle: 'Premium Plan (4K)',
    amount: '450',
  },
  {
    type: 'income',
    title: 'Фріланс (Upwork)',
    subtitle: 'Фікс багів у React проекті',
    amount: '8200',
  },
  {
    type: 'expense',
    title: 'Абонемент у зал',
    amount: '1200',
  },
  {
    type: 'expense',
    title: 'Квитки в кіно',
    subtitle: 'Перегляд "Дюни", 2 квитки + попкорн',
    amount: '680',
  },
  {
    type: 'income',
    title: 'Кешбек (Monobank)',
    amount: '154',
  },
  {
    type: 'expense',
    title: 'Курси English',
    subtitle: 'Оплата за інтенсивний курс (12 занять)',
    amount: '3500',
  },
];
