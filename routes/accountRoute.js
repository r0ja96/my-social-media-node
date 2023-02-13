const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const { accountController } = require('../controllers');

router.post('/account', accountController.create());
router.post('/account/signin', accountController.signIn());
router.post('/account/last-accounts', auth(), accountController.lastAccounts());

module.exports = router;