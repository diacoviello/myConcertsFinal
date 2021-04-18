const router = require("express").Router();
const statsController = require("../../controllers/statsController");

router.route("/")
    .get(statsController.getArtistTotal);

module.exports = router;
