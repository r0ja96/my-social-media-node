const express = require('express');
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "routes/" });
const auth = require('../../middleware/auth');

const { postController } = require('../../controllers');

router.post('/post', upload.single("files"), postController.addPost());

module.exports = router;