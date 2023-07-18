const express = require("express");
const router = express.Router();

const profileCtrl = require("../controllers/profiles");
const ensureLoggedIn = require("../config/ensureLoggedIn");

router.get("/:id/edit", ensureLoggedIn, profileCtrl.edit);

router.get("/index", ensureLoggedIn, profileCtrl.index);

router.put("/:id", ensureLoggedIn, profileCtrl.update);

module.exports = router;
