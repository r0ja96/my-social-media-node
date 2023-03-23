const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const { imageController } = require('../../controllers');

router.get('/image/:folder/:image', imageController.getImage());

module.exports = router;