const db = require("../models");

// Defining methods for the Controller
module.exports = {
  findAll: function (req, res) {
    db.PastEvent.find(req.query)
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
  getArtistTotal: function (req, res) {
      db.PastEvent.aggregate([
          { $group: { _id: "$artist_name", count: { $sum: 1 } } },
        ])
      .then(console.log(req.body))
      .catch((err) => res.status(422).json(err));
  },
};