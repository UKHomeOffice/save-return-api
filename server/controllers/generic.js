'use strict';
let model;

const configure = (model, app) => {
  this.model = model;
  // Register some generic routes
  app.post(`/${model.model.tableName}`, create);
  app.get(`/${model.model.tableName}/:fieldname/:value`, findByQuery);
  app.get(`/${model.model.tableName}/:id`, findById);
}

const findByQuery = (req,res,next) => {
  const fieldname = req.query.fieldname;
  const value = req.query.value;

  this.model.findByQuery(session.fieldname, session.value)
    .then(result => {
      res.json(result);
    })
    .catch(function (err) {
      console.log(err);
      next();
    });
};

const findById = (req,res,next) => {
  const id = req.query.id;

  this.model.findById(id)
    .then(result => {
      res.json(result);
    })
    .catch(function (err) {
      console.log(err);
      next();
    });
};

const create = (req,res,next) => {
  const session = req.body;

  this.model.create(session)
    .then(result => {
      res.json(result);
    })
    .catch(function (err) {
      console.log(err);
      next();
    });
};

module.exports = {
  configure,
  create,
  findByQuery,
  findById
};
