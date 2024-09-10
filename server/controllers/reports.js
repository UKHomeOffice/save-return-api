'use strict';

const Reports = require('../models/reports');

const decodeEmail = email => email.includes('@') ? email : Buffer.from(email, 'hex').toString();

const getReports = (req, res, next) => {
  const email = decodeEmail(req.params.email);
  console.log("this is enail from browser"+ email)

  Reports.findByEmail(email)
    .then(user => {
      console.log("this is the user"+ JSON.stringify(user, null, 2))
      res.json(user)

    })
    .catch(next);
};

const getId = (req, res, next) => {
  const id = req.params.id;
  const email = decodeEmail(req.params.email);

  Reports.findById(id, email)
    .then(session =>  {
      console.log("this is the session: " + session)
      res.json(session)

    })
    .catch(next);
};

const create = (req, res, next) => {
  const session = req.body;

  Reports.create(session)
    .then(user => {
      res.json(user);
    })
    .catch(next);
};

const del = (req, res, next) => {
  const id = req.params.id;
  const email = decodeEmail(req.params.email);

  Reports.del(id, email)
    .then(res.sendStatus(200))
    .catch(next);
};

module.exports = {
  getReports,
  getId,
  create,
  del
};
