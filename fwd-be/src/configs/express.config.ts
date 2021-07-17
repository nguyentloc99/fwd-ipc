import * as cors from 'cors';
import * as morgan from 'morgan';
import * as helmet from 'helmet';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as expressValidator from 'express-validator';

import {Environment, Validators} from '../libs';

export default function (app: express.Express) {
  if (process.env.NODE_ENV !== Environment.production
    && process.env.NODE_ENV !== Environment.test) {
    app.use(morgan('dev'));
  }

  /**
   * @description Middleware here
   */
  app.use(helmet());  // protected http header
  app.use(cors()); // control cross resources
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(compression());
  app.use(expressValidator({
    customValidators: Validators.express.customExpressValidation()
  }));

  /**
   * Handle request errors
   * these middleware will be registered after all routes & other middleware
   */
  // setImmediate(() => {
  //   app.use(function (err: Error, req: express.Request, res: express.Response,
  //                     next: express.NextFunction) {
  //     res.bad(err);
  //   });
  //   app.use(function (req: express.Request, res: express.Response,
  //                     next: express.NextFunction) {
  //     res.status(404).bad();
  //   });
  // });
}
