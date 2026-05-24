export const LoginStep = {
  Password: 'password',
  TwoFactor: 'two-factor',
} as const;

export type LoginStep = (typeof LoginStep)[keyof typeof LoginStep];
