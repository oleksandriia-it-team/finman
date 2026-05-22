export const ErrorLogStatus = {
  Active: 'Active',
  IsResolving: 'IsResolving',
  Resolved: 'Resolved',
  Ignored: 'Ignored',
} as const;

export type ErrorLogStatus = (typeof ErrorLogStatus)[keyof typeof ErrorLogStatus];
