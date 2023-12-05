const express = require("express");
const router = express.Router();
const ensuAuth = require("../middleware/authenticated")
const membershipController = require('../controllers/membership')

router.post("/new-membership",  [ensuAuth.ensureAuth], membershipController.createMembership)
router.get("/", membershipController.getAllMemberships)
router.get("/:membId", membershipController.getById)
router.delete("/delete/:membershipId",  [ensuAuth.ensureAuth],  membershipController.deleteMembership)

module.exports = router
