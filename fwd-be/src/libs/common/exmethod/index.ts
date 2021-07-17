/**
 * @method registerExtensionMethods
 * @description load extension method
 */

import * as chalk from 'chalk';
import * as signale from 'signale';

export function registerExtensionMethods(options: { pagination: boolean, response: boolean }) {
  if (options.pagination) {
    const extName = require('./pagination.ext').default;
    signale.complete(chalk.default.blue(`Extension methods of "${extName}" has been applied!`));
  }
  if (options.response) {
    const extName = require('./response.ext').default;
    signale.complete(chalk.default.blue(`Extension methods of "${extName}" has been applied!`));
  }
}
