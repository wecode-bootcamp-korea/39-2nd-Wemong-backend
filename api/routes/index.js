const express = require('express');

const router = express.Router();

const { authRouter } = require('./authRouter');
const { lectureRouter } = require('./lectureRouter');
const { userRouter } = require('./userRouter');
const { reviewRouter } = require('./reviewRouter');

router.use('/auth', authRouter);
router.use('/lectures', lectureRouter);
router.use('/users', userRouter);
router.use('/reviews', reviewRouter);

module.exports = { router };
