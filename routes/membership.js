const express = require("express");
const router = express.Router();

const membershipController = require('../controllers/membership')

router.post("/new-membership", membershipController.createMembership)
router.get("/", membershipController.getAllMemberships)
router.delete("/delete/:membershipId", membershipController.deleteMembership)

module.exports = router