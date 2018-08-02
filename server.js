const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/db.js');
const isDev = process.env.NODE_ENV !== 'production';


mongoose.connect(isDev ? config.dev : config.production, {
  useMongoClient: true,
});

mongoose.Promise = global.Promise;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// API routes
require('./src/routes')(app);

const PORT = 8081;

app.listen(PORT, '0.0.0.0', (err) => {
  if (err) {
    console.log(err);
  }

  console.info('>>> 🌎 Open http://0.0.0.0:8081/ in your browser.', PORT);
});

module.exports = app;
