const express = require('express');
const { userController } = require('../controllers');
const { loginRequired } = require('../utils/auth');

const userRouter = express.Router();

userRouter.get('', loginRequired, userController.getUserInformation);

module.exports = { userRouter };
