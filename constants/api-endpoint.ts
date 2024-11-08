export const API_ENDPOINT = {
  BALANCE: 'balance',
  CATEGORIES: 'categories',
  HOUSEHOLD_HISTORIES: 'householdHistories',
  USER_EARNINGS: 'userEarnings',
  USERS: 'users',
} as const satisfies Record<string, string>;
