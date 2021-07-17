import * as express from 'express';
import * as signale from 'signale';
import * as glob from 'glob';
import * as path from 'path';
import * as chalk from 'chalk';

import APP_CONFIG from './app.config';
import {route} from '../libs/standard';
import {AppConst} from '../common/consts/app.const';

/**
 * @method registerRoutes
 * @description register router application
 * @param {e.Express} app
 */
export default function (app: express.Express) {
  const routes = glob.sync(path.normalize(`${APP_CONFIG.ROOT}/api/**/*.route.{ts,js}`));
  // basic router ******
  app.use('/apidocs', express.static(path.join(__dirname, '../public')));
  app.use('/test', function (req, res) {
    return res.sendFile(path.join(__dirname, '../test/index.html'));
  });
  app.use('/coverage', express.static(path.join(__dirname, '../../coverage')));
  console.log(`${APP_CONFIG.ENV.IMAGE_STORE.ROOT}/${APP_CONFIG.ENV.IMAGE_STORE.BUCKET}`);
  app.use(`/${APP_CONFIG.ENV.IMAGE_STORE.BUCKET}`,
    express.static(`${APP_CONFIG.ENV.IMAGE_STORE.ROOT}/${APP_CONFIG.ENV.IMAGE_STORE.BUCKET}`)
  );

  // api router ********
  routes.forEach((route) => {
    const routerChild = require(route).default;
    if (routerChild) signale.complete(chalk.default
      .yellow(`Router "/${AppConst.API_PREFIX}/${AppConst.API_VERSION}/${routerChild}" has been registered!`));
  });
  app.use(`/${AppConst.API_PREFIX}/${AppConst.API_VERSION}`, route);
}
