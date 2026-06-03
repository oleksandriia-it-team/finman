import ukMessages from '../../../../messages/uk.json';
import enMessages from '../../../../messages/en.json';
import { SupportLanguages } from '@common/enums/support-languages.enum';

export type AppMessages = typeof ukMessages;

export const messagesByLocale: Record<SupportLanguages, AppMessages> = {
  [SupportLanguages.Ukrainian]: ukMessages,
  [SupportLanguages.English]: enMessages,
};

export const DefaultLocale: SupportLanguages = SupportLanguages.Ukrainian;
