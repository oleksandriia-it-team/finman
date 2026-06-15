export const AppRoutes = {
  Profile: {
    Root: '/profile',
    Analytics: '/profile/analytics',
    Settings: '/profile/settings',
    TrackingOperations: {
      Root: '/profile/tracking-operations',
      Add: '/profile/tracking-operations/add',
    },
    Budget: {
      Root: '/profile/budget',
      Plans: '/profile/budget/plans',
      RegularOperations: '/profile/budget/regular-operations',
    },
  },
} as const;
