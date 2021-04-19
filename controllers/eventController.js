const passport = require("passport");
const db = require("../models");
const passportid = require("../passport/index")

// Defining methods for the eventController
module.exports = {
  findAll: function (req, res) {
    db.Event.aggregate([{ $sort: {datetime: 1, [req.query]: 1}}])
      .then((dbModel) => res.json(dbModel))
      .then(console.log(req.body))
      .catch((err) => res.status(422).json(err));
  },
  findById: function (req, res) {
    db.Event.findById(req.params.id)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  create: function (req, res) {
    db.Event.create(req.body)
    .then(({_id}) => db.User.findOneAndUpdate({}, { $push: { Event: _id } }, { new: true }))
      .then((dbModel) => res.json(dbModel))
      .then(console.log(req.body))
      .catch((err) => res.status(422).json(err));
  },
  update: function (req, res) {
    db.Event.findOneAndUpdate({passportid}, req.body)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  remove: function (req, res) {
    db.Event.findById({ _id: req.params.id })
      .then((dbModel) => dbModel.remove())
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
};
