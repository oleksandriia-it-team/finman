export const enum ErrorTexts {
  UnknownError = 'Невідома помилка.',
  RecordDoesNotExist = 'Запис не існує.',
  DataProvidedDoesntMeetRequirements = 'Невідома помилка: надані дані не відповідають вимогам операції.',
  PrevBatchIsNotDone = 'Попередню транзакцію ще не завершено.',
  AbortError = 'AbortError',
  IncorrectIdProvided = 'Надано некоректний ід.',
  IncorrectTypeData = 'Надано некоректний тип даних.',
  TwoFactorCodeIsRequired = "Двофакторна аутентифікація увімкнена, код обов'язковий",
  DatabaseConnection = 'Error during database connection',
  UserNotFound = 'Користувача не знайдено',
  UserNotFoundDot = 'Користувача не знайдено.',
  TwoFactorNotInitialized = 'Спочатку ініціалізуйте двофакторну аутентифікацію',
  InvalidCredentials = 'Недійсні облікові дані',
  PasswordUpdateFailed = 'Не вдалося оновити пароль',
  InvalidCode = 'Невірний код',
  RegularEntryTitleExists = 'Регулярна операція з даним заголовком вже існує. Оберіть інший',
  ProfileUpdateFailed = 'Не вдалося оновити профіль.',
  UnexpectedRequestError = 'Неочікувана помилка з обробкою запиту. Спробуйте пізніше',
  Unauthorized = 'Ви не авторизовані',
  ParamNotInteger = 'Один з параметрів не є цілим числом',
  AttachBothPlannedTypes = 'Не можна прикріпити одночасно і планову операцію місяця, і планову операцію регулярного бюджету',
  MonthEntryNotFoundOrNotOwned = 'Запис місячної операції з таким ID не існує або не належить користувачу',
  MonthEntryDateMismatch = "Дата операції не відповідає місяцю, до якого прив'язана планова операція місяця",
  MonthEntryCategoryMismatch = 'Категорія операції має співпадати з категорією прикріпленої планової операції місяця',
  RegEntryNotFoundOrNotOwned = 'Запис регулярної операції з таким ID не існує або не належить користувачу',
  RegEntryDateMismatch = "Дата операції не відповідає місяцю, до якого прив'язана планова операція регулярного бюджету",
  RegEntryCategoryMismatch = 'Категорія операції має співпадати з категорією прикріпленої планової операції регулярного бюджету',
  ForeignOrMissingMonthEntries = "Деякі записи місячних операцій вже прив'язані до іншого бюджетного плану або не існують з вказаним ID",
  PlannedRegularEntriesNotOwned = 'Деякі ID планових регулярних операцій не існують або не належать користувачу',
  StepperContextMissing = 'useStepper must be used within a <Stepper />',
  ChartContextMissing = 'useChart must be used within a <ChartContainer />',
  SidebarContextMissing = 'useSidebar must be used within a SidebarProvider.',
  ClientEnvInvalidPrefix = 'Client env ',
  ServerEnvInvalidPrefix = 'Server env ',
}

export const formatBudgetPlanNotFoundForMonth = (month: number, year: number): string =>
  `Budget plan not found with month ${month} and year ${year}`;

export const formatKeyMustBeStringOrNumber = (key: string): string => `${key} must be string or number`;

export const formatSearchValueTypeMismatch = (key: string): string =>
  `Search value must be the same type like ${key} field in json`;
