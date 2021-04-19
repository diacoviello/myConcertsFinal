const router = require("express").Router();
const artistsController = require("../../controllers/artistsController");
const statesController = require("../../controllers/statesController");

router.route("/artists").get(artistsController.getArtistTotal);

router.route("/states").get(statesController.getStateTotal);

module.exports = router;
