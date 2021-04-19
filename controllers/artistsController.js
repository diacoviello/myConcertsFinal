const db = require("../models");

module.exports = {
  getArtistTotal: function (req, res) {
    console.log("req: ", db.PastEvent);
    db.PastEvent.aggregate([
      { $group: { _id: "$artist_name", count: { $sum: 1 } } },
    ])
      .then((dbResults) => res.json(dbResults))
      .then(console.log("New Data ", req.body))
      .catch((err) => res.status(422).json(err));
  },
};
