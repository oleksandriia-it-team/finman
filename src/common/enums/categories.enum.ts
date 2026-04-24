export const ExpenseCategories = {
  Groceries: 'groceries',
  Housing: 'housing',
  Utilities: 'utilities',
  Transport: 'transport',
  Entertainment: 'entertainment',
  Education: 'education',
  Shopping: 'shopping',
  Health: 'health',
  Misc: 'misc',
} as const;

export const IncomeCategories = {
  Salary: 'salary',
  Investments: 'investments',
  Freelance: 'freelance',
  Scholarship: 'scholarship',
  Misc: 'misc',
} as const;

export type ExpenseCategory = (typeof ExpenseCategories)[keyof typeof ExpenseCategories];

export type IncomeCategory = (typeof IncomeCategories)[keyof typeof IncomeCategories];

export const AllCategoryValues = [...Object.values(ExpenseCategories), ...Object.values(IncomeCategories)] as const;

export type AllCategories = ExpenseCategory | IncomeCategory;
