'use strict';

const config = require('../config');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const json = require('morgan-json');
const tableName = config.tableName;
// SchemaConfig is pulled in from our schema which defines additional routes that we may wish to use
let schemaConfig;
if (config.additionalSchema) {
  schemaConfig = require(config.additionalSchema)[process.env.NODE_ENV || 'development'].config;
}

const genericModel = require('./models/generic');
const genericController = require('./controllers/generic');

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

let additionalControllers = [];
// If our schema defines any additional routes in its config, we need to register them
if (schemaConfig) {
  for (var x = 0; x <= schemaConfig.models.length - 1; x++)
  {
    // Regster each endpoint
    let model = genericModel.configure(schemaConfig.schemaName, schemaConfig.models[x]);
    genericController.configure(model, app);
  }    
}
app.listen(config.port);
