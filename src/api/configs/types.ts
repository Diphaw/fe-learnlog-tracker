/**
 * Shared fields present in every API response
 */
export type ApiBaseResponse = {
  success: boolean;
  message: string;
  statusCode: number;
};

/**
 * Pagination metadata returned alongside list responses
 */
export type PaginationMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
};

/**
 * Single-item API response
 * @template T - Shape of the returned data object
 */
export type ApiResult<T> = ApiBaseResponse & {
  data: T;
};

/**
 * List API response with pagination metadata
 * @template T - Shape of each item in the returned array
 */
export type ApiResultWithPagination<T> = ApiBaseResponse & {
  data: T[];
  meta: PaginationMeta;
};

/**
 * List API response with pagination metadata nested inside data
 * @template T - Shape of each item in the returned array
 */
export type ApiResultWithPaginationNested<T> = ApiBaseResponse & {
  data: {
    data: T[];
    meta: PaginationMeta;
  };
};

/**
 * API error response — base fields plus a map of field-level validation errors
 */
export type ApiError = ApiBaseResponse & {
  errors: Record<string, string[]>;
};

/**
 * Base request type with optional path parameters, query parameters, and body
 * @template TPath - URL path parameters type (e.g., { id: string })
 * @template TParams - Query string parameters type (e.g., { search: string })
 * @template TBody - Request body data type
 */
export type BaseRequest<
  TPath = Record<string, string>,
  TParams = Record<string, unknown>,
  TBody = Record<string, unknown>,
  THeader = Record<string, unknown>,
> = {
  path?: TPath;
  params?: TParams;
  body?: TBody;
  headers?: THeader;
};

/**
 * Request type with only query parameters
 */
export type ParamsOnlyRequest<
  TParams extends Record<string, unknown>,
  THeader = never,
> = BaseRequest<never, TParams, never, THeader>;

/**
 * Request type with only path parameters
 */
export type PathOnlyRequest<
  TPath extends Record<string, number | string>,
  THeader = never,
> = BaseRequest<TPath, never, never, THeader>;

/**
 * Request type with only body data
 */
export type BodyOnlyRequest<
  TBody extends Record<string, unknown> | FormData,
  THeader = never,
> = BaseRequest<never, never, TBody, THeader>;

/**
 * Request type with path parameters and body
 */
export type PathBodyRequest<
  TPath extends Record<string, number | string>,
  TBody extends Record<string, unknown> | FormData,
  THeader = never,
> = BaseRequest<TPath, never, TBody, THeader>;

/**
 * Request type with path parameters and query parameters
 */
export type PathParamsRequest<
  TPath extends Record<string, string>,
  TParams extends Record<string, unknown>,
  THeader = never,
> = BaseRequest<TPath, TParams, never, THeader>;

/**
 * Request type with query parameters and body
 */
export type ParamsBodyRequest<
  TParams extends Record<string, unknown>,
  TBody extends Record<string, unknown>,
  THeader = never,
> = BaseRequest<never, TParams, TBody, THeader>;

/**
 * Request type with path parameters, query parameters, and body
 */
export type FullRequest<
  TPath extends Record<string, string>,
  TQuery extends Record<string, unknown>,
  TBody extends Record<string, unknown>,
  THeader = never,
> = BaseRequest<TPath, TQuery, TBody, THeader>;

/**
 * Shared and Reusable Types
 */
export type BaseParams = {
  page?: number;
  limit?: number;
  search?: string;
  sortDirection?:
    | "ASC"
    | "DESC"
    | "ASC_NULLS_FIRST"
    | "ASC_NULLS_LAST"
    | "DESC_NULLS_FIRST"
    | "DESC_NULLS_LAST"
    | "asc"
    | "desc"
    | "asc_nulls_first"
    | "asc_nulls_last"
    | "desc_nulls_first"
    | "desc_nulls_last";
  sortBy?: string;
};

