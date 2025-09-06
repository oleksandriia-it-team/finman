export interface UserInformation {
  userName: string | null;
  language: string;
  preferableLocale: string;
  password?: string | undefined;
  inactivityMinutes?: number | undefined;
  lastActivityTime?: number | undefined;
}