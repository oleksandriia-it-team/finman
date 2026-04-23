export const WorkMode = {
  Online: 'online',
  Offline: 'offline',
} as const;

export type WorkMode = (typeof WorkMode)[keyof typeof WorkMode];
