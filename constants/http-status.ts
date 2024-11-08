export const HTTP_STATUS_200 = {
  OK: 200,
} as const satisfies Record<string, number>;

export const HTTP_STATUS_500 = {
  INTERNAL_SERVER_ERROR: 500,
} as const satisfies Record<string, number>;
