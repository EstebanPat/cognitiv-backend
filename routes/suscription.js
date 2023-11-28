const express = require("express");
const router = express.Router();
const multer = require('multer');
const ensuAuth = require("../middleware/authenticated")

const suscriptionController = require('../controllers/suscription')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/vouchers') 
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    }
  }); 
const upload = multer({ storage: storage });

router.post('/new-suscription', upload.single("voucher"), suscriptionController.createSuscription)
router.get('/',  suscriptionController.getAllSuscriptions)
router.get('/:subId',  suscriptionController.getById)
router.delete("/delete/:suscriptionId", [ensuAuth.ensureAuth], suscriptionController.deleteSuscription)

module.exports = router;