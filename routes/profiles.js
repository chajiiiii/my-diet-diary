const express = require("express");
const router = express.Router();
const profileCtrl = require("../controllers/profiles");

// router.get("/", profileCtrl.create);

// router.get("/show", profileCtrl.show);

router.get("/index", profileCtrl.index);

module.exports = router;
