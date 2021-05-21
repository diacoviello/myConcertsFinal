const router = require("express").Router();
const artistsController = require("../../controllers/artistsController");
const statesController = require("../../controllers/statesController");
const venuesController = require("../../controllers/venuesController");

router.route("/artists").get(artistsController.getArtistTotal);

router.route("/states").get(statesController.getStateTotal);

router.route("/venues").get(venuesController.getVenuesTotal);

module.exports = router;
