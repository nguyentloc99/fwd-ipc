const express = require('express');
const helmet = require('helmet');

const app = express();
const compression = require('compression');
const appConfig = require('./config/env');
const routerApp = require('./config/router.config');

app.use(helmet());
app.use(compression());
app.use(routerApp);

// eslint-disable-next-line func-names
app.listen(appConfig.port, appConfig.host, function () {
  // eslint-disable-next-line no-console
  console.log(
    `App running port: ${appConfig.port} in ${process.env.NODE_ENV} environment.`,
  );
});
module.exports = app;
