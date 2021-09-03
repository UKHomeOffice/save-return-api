'use strict';

const config = require('../../config');
const knexfile = require(`${config.migrationsRepo}`);
const knexfileConfig = knexfile[process.env.NODE_ENV ? 'production' : 'development'];
const tableName = config.tableName;
const knex = require('knex')(knexfileConfig);

const timeout = 1000;
const selectableProps = [
  'id',
  'session',
  'created_at',
  'updated_at'
];

const findByEmail = email => knex.select(selectableProps)
  .from(tableName)
  .where({ email })
  .timeout(timeout);

const findById = (id, email) => knex.select(selectableProps)
  .from(tableName)
  .where({ id, email })
  .timeout(timeout);

const create = props => {
  if (props.id) {
    return knex(tableName).where({
      id: props.id
    })
      // eslint-disable-next-line camelcase
      .update({session: props.session, updated_at: knex.fn.now()})
      .returning(selectableProps)
      .timeout(timeout);
  }

  return knex.insert(props)
    .returning(selectableProps)
    .into(tableName)
    .timeout(timeout);
};

const del = (id, email) => knex(tableName)
  .where({ id, email })
  .del();

module.exports = {
  findByEmail,
  findById,
  create,
  del
};
