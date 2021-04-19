const db = require("../models");

// Defining methods for the Controller
module.exports = {
  findAll: function (req, res) {
    console.log("req: ", db.PastEvent);
    db.PastEvent.find(req.query).sort({datetime: -1})
    // find(req.query).sort({datetime: -1})
      .then((dbModel) => res.json(dbModel))
      .then(console.log(req.body))
      .catch((err) => res.status(422).json(err));
  },
  findById: function (req, res) {
    db.PastEvent.findById(req.params.id)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  create: function (req, res) {
    db.PastEvent.create(req.body)
    .then(({_id}) => db.User.findOneAndUpdate({}, { $push: { PastEvent: _id } }, { new: true }))
      .then((dbModel) => res.json(dbModel))
      .then(console.log(req.body))
      .catch((err) => res.status(422).json(err));
  },
  update: function (req, res) {
    db.PastEvent.findOneAndUpdate({ _id: req.params.id }, req.body)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  remove: function (req, res) {
    db.PastEvent.findById({ _id: req.params.id })
      .then((dbModel) => dbModel.remove())
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
};