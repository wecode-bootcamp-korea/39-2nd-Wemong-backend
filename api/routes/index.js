const express = require('express');

const router = express.Router();

const { authRouter } = require('./authRouter');
const { lectureRouter } = require('./lectureRouter');
const { userRouter } = require('./userRouter');

router.use('/auth', authRouter);
router.use('/lectures', lectureRouter);
router.use('/users', userRouter);

module.exports = { router };
