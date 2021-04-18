const db = require("../models");

module.exports = {  
 getArtistTotal: function (req, res) {
    db.PastEvent.get(req.query)
      .then((dbModel) => res.json(dbModel))
      .then(
        db.PastEvent.aggregate([
          { $group: { _id: "$artist_name", count: { $sum: 1 } } },
        ])
      )
      .then(console.log("New Data ", req.body))
      .catch((err) => res.status(422).json(err));
  }
}