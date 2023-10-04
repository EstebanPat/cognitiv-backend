const express = require("express");
const router = express.Router();
const multer = require('multer');

const suscriptionController = require('../controllers/suscription')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/vouchers') // Directorio donde se guardarán los archivos
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    }
  }); 
const upload = multer({ storage: storage });

router.post('/new-suscription', upload.any(), suscriptionController.createSuscription)
router.get('/',  suscriptionController.getAllSuscriptions)

module.exports = router;