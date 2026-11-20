export const createKey = (base: string) => ({
  all: [base] as const,
  list: (params?: unknown) =>
    params ? ([base, "list", params] as const) : ([base, "list"] as const),
  detail: (id?: string) =>
    id ? ([base, "detail", id] as const) : ([base, "detail"] as const),
});

