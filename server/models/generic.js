'use strict';

const config = require('../../config');
const self = this;

const timeout = 1000;

let knex = {};
let knexfile = {};
let knexfileConfig = {};

this.configure = (schemaName, model) => {
  // Cache our model which will be used as our DAL
  this.model = model;
  knexfile = require(schemaName);
  knexfileConfig = knexfile[process.env.NODE_ENV ? 'production' : 'development'];
  knex = require('knex')(knexfileConfig);
  return this;
}

this.findByQuery = (fieldname, value) => knex.select(self.model.selectableProps)
  .from(self.model.tableName)
  .where({ [fieldname]: value })
  .timeout(timeout);

this.findById = (id) => knex.select(self.model.selectableProps)
  .from(self.model.tableName)
  .where({ id })
  .timeout(timeout);

this.create = props => {
  if (props.id) {
    return knex(self.model.tableName).where({
      id: props.id
    })
      // eslint-disable-next-line camelcase
      .update({session: props.session, updated_at: knex.fn.now()})
      .returning(self.model.selectableProps)
      .timeout(timeout);
  }

  return knex.insert(props)
    .returning(self.model.selectableProps)
    .into(self.model.tableName)
    .timeout(timeout);
};

this.del = (id) => knex(self.model.tableName)
  .where({ id })
  .del();

module.exports = self;
