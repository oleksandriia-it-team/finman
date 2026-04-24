export interface AuthTokenModel {
  setAccessToken(token: string): void;

  getAccessToken(): string | undefined;

  clearAccessToken(): void;
}
