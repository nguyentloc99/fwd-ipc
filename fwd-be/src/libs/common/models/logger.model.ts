/**
 * @module Logger library
 * @interface sub interface logger
 * config =>
 *  - emerg: 0, // <=> emergency
 *  - alert: 1,
 *  - crit: 2,  // <=> critical
 *  - error: 3,
 *  - warning: 4,
 *  - notice: 5,
 *  - info: 6,
 *  - debug: 7
 * */

export enum LogLevel {
  emergency = 0,
  alert = 1,
  critical = 2,
  error = 3,
  warning = 4,
  notice = 5,
  info = 6,
  debug = 7
}

export interface LogFull {
  env: string;
  facility: string;
  host: string;
  short_message: string
  level: number;
  path: string;
  status: number;
  raw_data: {
    body: any;
    query: any;
  };
  raw_headers: {
    ip: string;
    user_agent: string;
  };
  raw_response: any;
}

export interface LogShort {
  short_message: string
  level?: number;
  path: string;
  status?: number;
  raw_data: {
    body: any;
    query: any;
  };
  raw_headers: {
    ip: string;
    user_agent: string;
  };
  raw_response: any;
}
