import type { AuthTokenModel } from '@frontend/shared/models/auth-token.model';

export class AuthTokenService implements AuthTokenModel {
  setAccessToken(token: string): void {
    document.cookie = `token=${token}; path=/; max-age=86400`;
  }

  getAccessToken(): string | undefined {
    return document.cookie
      .split(';')
      .find((item) => item.trim().startsWith('token='))
      ?.split('=')[1];
  }

  clearAccessToken(): void {
    document.cookie = '';
  }
}

export const authTokenService = new AuthTokenService();
