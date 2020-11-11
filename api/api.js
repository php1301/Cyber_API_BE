const bodyParser = require('body-parser');
const express = require('express');
const helmet = require('helmet');
const http = require('http');
// const mapRoutes = require('express-routes-mapper');
const cors = require('cors');


const config = require('../config/index');
const dbService = require('../services/db.service');

const env = process.env.NODE_ENV;


// init


const app = express();
const server = http.Server(app);
// const mappedOpenRoutes = mapRoutes(config.publicRoutes, 'api/controllers/');

const db = dbService(env).start();


// cors
app.use(cors());

// secure
app.use(helmet({
  dnsPrefetchControl: false,
  frameguard: false,
  ieNoOpen: false,
}));

// parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api', require('./routes/routes'));

server.listen(config.port, () => {
  if (env !== 'production' &&
      env !== 'development' &&
      env !== 'testing'
  ) {
    console.error(`NODE_ENV ${env} not valid`);
    process.exit(1);
  }
  return db;
});
