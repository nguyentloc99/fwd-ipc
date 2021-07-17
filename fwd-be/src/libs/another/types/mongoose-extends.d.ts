/// <reference types="mongoose" />
import * as Bluebird from 'bluebird';
import * as mongoose from 'mongoose';
import {
  PaginateParams, Pagination as MyPagination,
  PaginationCursor, PaginateCursorParamTemp, PaginateCursorParams
} from '../../common/models';
import {Document, ModelProperties} from 'mongoose';

interface Pagination<T> extends MyPagination<T> {
}

/**
 * @interface QueryHelper
 */
interface QueryHelper<T> {
  /**
   * @method paginate
   * @description Extension method helps us paginate the documents in a query
   * @param params
   * @param callback
   */
  paginate(params?: PaginateParams, callback?: (err: any, data: Pagination<T>) => void): Bluebird<Pagination<T>>;

  paginateCursor(params?: PaginateCursorParams, callback?: (err: any, data: Pagination<T>) => void): Bluebird<Pagination<T>>;
}

interface MongooseDocumentHelper {
  validateSync(): mongoose.Error;
}

declare module 'mongoose' {

  interface Query<T> extends QueryHelper<T> {
  }

  interface DocumentQuery<T, DocType extends Document> extends QueryHelper<T> {
  }

  interface Model<T extends Document, QueryHelpers = {}> extends NodeJS.EventEmitter, ModelProperties {
    /**
     * @deprecated replace paginateCursor
     * @param params
     * @param callback
     */
    paginateCursorTemp(params?: PaginateCursorParamTemp,
      callback?: (err: any, data: PaginationCursor<T>) => void): Bluebird<PaginationCursor<T>>;
  }

  interface MongooseDocument extends MongooseDocumentHelper {
    validateSync(): mongoose.Error;
  }

  interface Document {
    save(options: {validateBeforeSave: boolean}, fn?: (err: any, product: this, numAffected: number) => void): Promise<this>;

    dateCreated: string;
    dateUpdated?: string;
  }

  type Promise<T> = Bluebird<T>;
}
