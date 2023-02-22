const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const { accountController } = require('../../controllers');

router.post('/account', accountController.create());
router.post('/account/signin', accountController.signIn());
router.delete('/account/logout', auth(), accountController.logOut());
router.get('/account/last-accounts', auth(), accountController.lastAccounts());

module.exports = router;