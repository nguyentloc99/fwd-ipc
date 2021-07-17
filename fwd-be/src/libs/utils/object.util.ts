/**
 * @module util
 * @author LocNT
 * @description object util
 */

import * as dot from 'dot-object';
import * as mongoose from 'mongoose';
import * as sobjectMapper from 'object-mapper';
import {Request, Response, NextFunction} from 'express';

export class ObjectUtil {
  /**
   * Merges an object with another objects
   * @param object The destination object
   * @param sources The source objects
   */
  public static merge(object: any, ...sources: any[]): any {
    sources.forEach((src) => {
      for (const key in src) {
        if (src[key] !== undefined) {
          if (this.isPureObject(src[key])) {
            ObjectUtil.merge(object[key], src[key]);
          } else {
            object[key] = src[key];
          }
        }
      }
    });
    return object;
  }

  public static isRegularObject(obj: any) {
    if (!obj) return false;
    return 'object' === typeof obj
      && !Array.isArray(obj)
      && !(obj instanceof Date)
      && !(obj instanceof mongoose.Types.ObjectId);
  }

  public static isPureObject(obj: any) {
    if (!obj) return false;
    return 'object' === typeof obj
      && !Array.isArray(obj)
      && !(obj instanceof Date);
  }

  /**
   * Check if the object is null or undefined or empty(only fields, excludes prototype)
   * @param obj - Object
   */
  public static isNullOrEmpty(obj: any): boolean {
    return !obj || !Object.keys(obj).length;
  }

  public static map(source: Object, map: any, notRemoveNull: boolean = false): any {
    if (source === null) return source;
    let des = sobjectMapper(source, map);
    if (!notRemoveNull) {
      for (let key in des) {
        if ('object' === typeof des[key] && this.isNullOrEmpty(des[key])) {
          Reflect.deleteProperty(des, key);
        }
      }
    }
    return des;
  }

  public static mapReverse(source: Object, map: any, notRemoveNull: boolean = false): any {
    let reverseMap: any = {};
    for (let key in map) {
      reverseMap[map[key]] = key;
    }
    return map(source, map, notRemoveNull);
  }

  public static normalizeFormData(req: Request, res: Response, next: NextFunction) {
    req.body = dot.object(req.body);
    next();
  }

  /**
   * @method enumValues
   * @param enumObj
   * @param typeValue type value is string, number, bool ..
   */
  public static enumValues(enumObj: any, typeValue: string) {
    const keys = Object.keys(enumObj).filter(k => typeof enumObj[k as any] === typeValue); // ["A", "B"]
    return keys.map(k => enumObj[k as any]);
  }
}
