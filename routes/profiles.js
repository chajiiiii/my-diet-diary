const express = require("express");
const router = express.Router();

const profileCtrl = require("../controllers/profiles");

router.get("/:id/edit", profileCtrl.edit);

router.get("/index", profileCtrl.index);

router.put("/:id", profileCtrl.update);

module.exports = router;
