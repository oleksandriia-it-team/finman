import { SupportLanguages } from '@common/enums/support-languages.enum';
import { DropdownOption } from '@frontend/shared/models/dropdown-option.model';

export const SupportLanguagesLocale: DropdownOption<SupportLanguages>[] = [
  {
    value: SupportLanguages.English,
    label: 'English',
  },
  {
    value: SupportLanguages.Ukrainian,
    label: 'Українська',
  },
];
