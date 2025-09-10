export interface UserInformation {
  userName: string | null;
  language: string;
  preferableLocale: string;
  password?: string | undefined;
}