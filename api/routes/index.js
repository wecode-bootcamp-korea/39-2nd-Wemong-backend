const express = require('express');

const router = express.Router();

const { authRouter } = require('./authRouter');
const { lectureRouter } = require('./lectureRouter');
const { userRouter } = require('./userRouter');
const { reviewRouter } = require('./reviewRouter');
const { calanderRouter } = require('./calanderRouter');
const { checkoutRouter } = require('./checkoutRouter');

router.use('/checkout', checkoutRouter);
router.use('/auth', authRouter);
router.use('/lectures', lectureRouter);
router.use('/users', userRouter);
router.use('/reviews', reviewRouter);
router.use('/calander', calanderRouter);

module.exports = { router };
