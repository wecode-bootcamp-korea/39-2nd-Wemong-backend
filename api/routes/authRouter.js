const express = require('express');
const { authController } = require('../controllers');

const authRouter = express.Router();

authRouter.post('/login', authController.logIn);

module.exports = { authRouter };
