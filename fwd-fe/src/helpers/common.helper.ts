import { AxiosError } from 'axios';
import CONFIG from 'config';
import { isNil, trim } from 'lodash';
import numeral from 'numeral';
import { COMMON } from '../constants/error.const';

type E = string | AxiosError;

export function getMessageFromError(error: E) {
  if (typeof error === 'string') {
    return error;
  }
  if (error.response) {
    return Array.isArray(error.response?.data?.message)
      ? error.response?.data?.message[0] || COMMON
      : error.response?.data?.message || COMMON;
  }
  return error.message || COMMON;
}

export function shallowTrim<T>(values: T): T {
  return Object.keys(values).reduce((acc, key) => {
    const currentValue = values[key as keyof T];
    if (typeof currentValue === 'string') {
      return { ...acc, [key]: trim(currentValue || '') };
    }
    return { ...acc, [key]: currentValue };
  }, {}) as T;
}
export function deepTrim<T extends Object>(values: T): T {
  if (!values) return values;
  return Object.keys(values).reduce((acc, key) => {
    const currentValue = values[key as keyof T];
    if (typeof currentValue === 'string') {
      return {
        ...acc,
        [key]: trim(currentValue || ''),
      };
    }
    if (typeof currentValue === 'object') {
      if (Array.isArray(currentValue)) {
        return {
          ...acc,
          [key]: currentValue
            ? (currentValue as any[]).map((item) => {
                if (typeof item === 'object') {
                  return deepTrim(item);
                }
                if (typeof item == 'string') {
                  return trim(item);
                }
                return item;
              })
            : currentValue,
        };
      }
      return { ...acc, [key]: deepTrim(currentValue) };
    }
    return { ...acc, [key]: currentValue };
  }, {}) as T;
}

export function decodeToken(token: string) {
  try {
    const payload = token.split('.')[1];
    const parsed = atob(payload);
    return JSON.parse(parsed);
  } catch (e) {
    return null;
  }
}

export function formatCurrency(s: number | string): string {
  if (isNil(s)) {
    return '';
  }
  return numeral(s).format('$0,0');
}

export function invariant(condition: boolean, format: string, ...args: any[]) {
  let warning: any = function emptyFunction() {
    // Empty function
  };
  if (process.env.NODE_ENV === 'development') {
    warning = function warningFunction() {
      if (format === undefined) {
        throw new Error(
          `'warning(condition, format, ...args)' requires a warning message argument`,
        );
      }

      if (format.length < 10 || /^[s\W]*$/.test(format)) {
        throw new Error(
          `The warning format should be able to uniquely identify this warning. Please, use a more descriptive format than: ${format}`,
        );
      }

      if (format.indexOf('Failed Composite propType: ') === 0) {
        return; // Ignore CompositeComponent proptype check.
      }

      if (!condition) {
        const argIndex: number = 0;
        const message: string = `Warning: ${format.replace(
          /%s/g,
          () => args[argIndex + 1],
        )}`;
        // eslint-disable-next-line no-console
        console.warn(message);
      }
    };
  }
  return warning();
}

export function pxToRem(px: number) {
  return `${px / 16}rem`;
}

export function generatePassword() {
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const number = '0123456789';
  const special = '#$@!%&*?';
  const all = uppercase + lowercase + number + special;

  function characterRandom(str: string): string {
    const num = Math.floor(Math.random() * 100);
    if (str[num]) {
      return str[num];
    }
    return characterRandom(str);
  }

  const password =
    characterRandom(uppercase) +
    characterRandom(lowercase) +
    characterRandom(number) +
    characterRandom(special) +
    Array(4)
      .fill(0)
      .map(() => characterRandom(all))
      .join('');

  return password;
}

export function serializeWhere(str: string) {
  return {
    $or: [
      {
        fullName: {
          $regex: str,
          $options: 'i',
        },
      },
      {
        email: {
          $regex: str,
          $options: 'i',
        },
      },
    ],
  };
}

export function serializeObject(obj: any, prefix: string): string {
  const str = [];
  let p;
  for (p in obj) {
    // eslint-disable-next-line no-prototype-builtins
    if (obj.hasOwnProperty(p)) {
      const k = prefix ? `${prefix}[${p}]` : p;
      const v = obj[p];
      str.push(
        v !== null && typeof v === 'object'
          ? serializeObject(v, k)
          : `${encodeURIComponent(k)}=${encodeURIComponent(v)}`,
      );
    }
  }
  return str.join('&');
}

export function getUploadUrl(photoId: string) {
  return `${CONFIG.BASE_URL}/upload/${photoId}`;
}
