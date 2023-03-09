'use strict';

const config = require('../config');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const json = require('morgan-json');
const tableName = config.tableName;

const format = json({
  short: ':method :url :status',
  length: ':res[content-length]',
  'response-time': ':response-time ms',
  timestamp: ':date[iso]'
});
const app = express();
const { getReports, getId, create, del } = require(`./controllers/${tableName}`);

app.use(bodyParser.json({ limit: config.maxPayloadSize }));
app.use(morgan(format));

app.get(`/${tableName}/:email`, getReports);
app.get(`/${tableName}/:email/:id`, getId);
app.post(`/${tableName}`, create);
app.delete(`/${tableName}/:email/:id`, del);

app.listen(config.port);
