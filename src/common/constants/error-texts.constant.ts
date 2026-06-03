export const enum ErrorTexts {
  UnknownError = 'errors.unknownError',
  RecordDoesNotExist = 'errors.recordDoesNotExist',
  DataProvidedDoesntMeetRequirements = 'errors.dataProvidedDoesntMeetRequirements',
  PrevBatchIsNotDone = 'errors.prevBatchIsNotDone',
  AbortError = 'errors.abortError',
  IncorrectIdProvided = 'errors.incorrectIdProvided',
  IncorrectTypeData = 'errors.incorrectTypeData',
  TwoFactorCodeIsRequired = 'errors.twoFactorCodeIsRequired',
  DatabaseConnection = 'errors.databaseConnection',
  UserNotFound = 'errors.userNotFound',
  TwoFactorNotInitialized = 'errors.twoFactorNotInitialized',
  InvalidCredentials = 'errors.invalidCredentials',
  PasswordUpdateFailed = 'errors.passwordUpdateFailed',
  InvalidCode = 'errors.invalidCode',
  RegularEntryTitleExists = 'errors.regularEntryTitleExists',
  UnexpectedRequestError = 'errors.unexpectedRequestError',
  Unauthorized = 'errors.unauthorized',
  ParamNotInteger = 'errors.paramNotInteger',
  AttachBothPlannedTypes = 'errors.attachBothPlannedTypes',
  MonthEntryNotFoundOrNotOwned = 'errors.monthEntryNotFoundOrNotOwned',
  MonthEntryDateMismatch = 'errors.monthEntryDateMismatch',
  MonthEntryCategoryMismatch = 'errors.monthEntryCategoryMismatch',
  RegEntryNotFoundOrNotOwned = 'errors.regEntryNotFoundOrNotOwned',
  RegEntryDateMismatch = 'errors.regEntryDateMismatch',
  RegEntryCategoryMismatch = 'errors.regEntryCategoryMismatch',
  ForeignOrMissingMonthEntries = 'errors.foreignOrMissingMonthEntries',
  PlannedRegularEntriesNotOwned = 'errors.plannedRegularEntriesNotOwned',
  InvalidJson = 'errors.invalidJson',
}

export type ErrorMessageParams = Record<string, string | number>;

export interface ErrorMessage {
  messageKey: string;
  messageParams?: ErrorMessageParams;
}

export const formatBudgetPlanNotFoundForMonth = (month: number, year: number): ErrorMessage => ({
  messageKey: 'errors.budgetPlanNotFoundForMonth',
  messageParams: { month, year },
});
