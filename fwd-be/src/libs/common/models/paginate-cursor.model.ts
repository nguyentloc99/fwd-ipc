/**
 * @author LocNT
 * @interface PaginateCursorParamTemp
 * @deprecated replace paginateCursorParams Model
 * @description custom paginate param cursor library mongo-cursor-paginate
 * @link <https://github.com/mixmaxhq/mongo-cursor-pagination>
 */

export interface PaginateCursorParamTemp {
  /**
   * @field query
   * @description The find query.
   * @example {name: 'demo', $text: {$search: 'cookuit'}}
   */
  query?: any;
  /**
   * @field limit
   * @description The page size. Must be between 1 and `config.MAX_LIMIT`.
   * @example 10
   */
  limit?: number;
  /**
   * @field fields
   * @description Fields to query in the Mongo object format. The default is to query all fields.
   * @example e.g. {_id: 1, timestamp :1}
   */
  fields?: string;
  /**
   * @field paginatedField
   * @description The field name to query the range for
   */
  paginatedField?: string;
  /**
   * @field sortAscending
   * @description True to sort using paginatedField ascending (default is false - descending)
   */
  sortAscending?: boolean;
  /**
   * @field next
   * @description The value to start querying the page.
   */
  next?: string;
  /**
   * @field previous
   * @description The value to start querying previous page.
   */
  previous?: string;
}

export interface PaginationCursor<T> {
  results: T[];
  previous: string;
  hasPrevious: boolean;
  next: string;
  hasNext: boolean;
}
