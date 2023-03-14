'use strict';

const configure = (model, app) => {
  this.model = model;
  // Register some generic routes
  app.post(`/${model.model.tableName}`, create);
  app.get(`/${model.model.tableName}/:fieldname/:value`, findByQuery);
  app.get(`/${model.model.tableName}/:id`, findById);
}

const findByQuery = (req,res,next) => {
  const fieldname = req.params.fieldname;
  const value = req.params.value;

  this.model.findByQuery(fieldname, value)
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      console.log(err);
      next();
    });
};

const findById = (req,res,next) => {
  const id = req.params.id;

  this.model.findById(id)
    .then(result => {
      res.json(result);
    })
    .catch(err => {
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
