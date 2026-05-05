import type { ReactNode } from 'react';
import { type TypeEntry } from '@common/enums/entry.enum';

export interface CardsFormTemplateActionsProps {
  onCancel?: () => void;
}

export interface CardsFormInputsTemplateProps {
  children?: ReactNode | Promise<ReactNode>;
}

export interface CardsFormFooterTemplateProps {
  selectedType: TypeEntry.Expense | TypeEntry.Income;
  setValue: (type: TypeEntry.Expense | TypeEntry.Income) => void;
}

export interface CardsFormTemplateProps {
  submit: () => void;
  children?: React.ReactNode;
}

export interface CardsFormHeaderTemplateProps {
  title: string;
  description: string;
  isEdit: boolean;
}
