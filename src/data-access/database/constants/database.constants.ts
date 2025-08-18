export const DatabaseName = 'FINMAN';

export const Tables = {
  BudgetPlanTable: 'budgetPlans',
  RegularExpensesAndIncomesTable: 'regularExpensesAndIncomes',
  DelayedExpensesTable: 'delayedExpenses',
};

export const ErrorTexts = {
  UnknownError: 'Unknown Error.',
  RecordDoesNotExist: 'Record does not exist.',
  DataProvidedDoesntMeetRequirements: 'Unknown Error: Data provided to an operation does not meet requirements.',
  PrevBatchIsNotDone: 'Previous batch is not done.',
  AbortError: 'AbortError',
  IncorrectIdProvided: 'Incorrect id provided.',
  IncorrectTypeData: 'Incorrect type data provided.',
};

export const ErrorDataBaseConnection = 'Error during database connection';