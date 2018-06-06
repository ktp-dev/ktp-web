process.on('unhandledRejection', (error) => {
  console.log('unhandledRejection', error);
});

process.on('warning', (warning) => {
  console.log('warning', warning);
});

process.on('uncaughtException', (exception) => {
  console.log('uncaughtException', exception);
});

process.on('rejectionHandled', (rejection) => {
  console.log('rejectionHandled', rejection);
});

const config = require('./config/default.js');

const http = require('http');
const { mongoose } = require('./server/db/index.js');
const morgan = require('morgan');
const express = require('express');
const app = express();
const server = http.createServer(app);
const session = require('express-session');
const bodyParser = require('body-parser');
const MongoStore = require('connect-mongo')(session);
const csrf = require('csurf');
const csrfProtection = csrf(); // eslint-disable-line
const apiRouter = require('./server/routes/api.js');
const indexRouter = require('./server/routes/index.js');

// Force https
app.use((req, res, next) => {
  if (
    !req.secure &&
    req.get('x-forwarded-proto') !== 'https' &&
    app.get('env') !== 'development'
  ) {
    return res.redirect(config.host + req.url);
  }
  next();
});

// Logging
morgan.token('remote-addr', (req) => req.headers['x-forwarded-for'] || req.ip);
app.use(morgan('combined'));

// Request parsers
app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: '50mb',
  }),
);
app.use(
  bodyParser.json({
    limit: '50mb',
  }),
);

// Pretty API Responses
app.set('json spaces', 4);

// Disable x-powered-by
app.disable('x-powered-by');

// Initialize session
const sessionStore = new MongoStore({
  url: `mongodb://${config.mongo_hostname}/${config.sessions_db}`,
});

const sessionMiddleware = session({
  secret: config.secret,
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: config.token_expiration * 24 * 60 * 60 * 1000,
  },
});

app.use(sessionMiddleware);

// Set an xsrf-token for the session if it's enabled
app.use((req, res, next) => {
  if (req.csrfToken) {
    res.cookie('xsrf-token', req.csrfToken());
  }

  return next();
});

app.use('/', indexRouter);
app.use('/v1', apiRouter);

// Intiialize development webpack (hot reloading, etc);
if (app.get('env') !== 'production' && !config.api_work) {
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const historyApiFallback = require('connect-history-api-fallback');
  const webpackConfig = require('./webpack.dev.config');
  const webpackCompiler = webpack(webpackConfig);
  const webpackMiddlewareInstance = webpackDevMiddleware(webpackCompiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: {
      colors: true,
    },
  });

  app.use(webpackMiddlewareInstance);
  app.use(historyApiFallback());
  app.use(webpackMiddlewareInstance);

  app.use(
    webpackHotMiddleware(webpackCompiler, {
      log: console.log,
    }),
  );
} else {
  // Static files middleware
  app.use(express.static('build'));

  app.use((req, res) => {
    res.sendFile(`${__dirname}/build/index.html`);
  });
}

require('./server/interactors/setup.js');

// Now we start the server
if (config.start_server) {
  server.listen(config.server_port);
}

module.exports = {
  mongoose,
  express,
  app,
  server,
};
