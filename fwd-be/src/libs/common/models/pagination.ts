/**
 * @module common
 * @description common module pagination
 */

export interface Pagination<T> {
  data: T;
  page: number;
  pageSize: number;
  totalPage: number;
  totalItem: number;
  // cursor paging
  next?: string;
  hashNext?: boolean;
  previous?: string;
  hashPrevious?: boolean;
}

export interface PaginateParamsBase {
  pageSize?: number;
  sort?: string;
  order?: 1 | -1 | '1' | '-1';
  select?: string;
  populations?: string;
  where?: string;
  pattern?: string;
}

export interface PaginateParams extends PaginateParamsBase {
  page?: number;
}

export interface PaginateCursorParams extends PaginateParamsBase {
  next?: string;
  previous?: string;
}
