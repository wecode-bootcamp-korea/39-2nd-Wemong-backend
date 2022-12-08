const express = require('express');
const { checkoutController } = require('../controllers');
const { loginRequired } = require('../utils/auth');

const checkoutRouter = express.Router();

checkoutRouter.post('', loginRequired, checkoutController.checkOut);

module.exports = { checkoutRouter };
