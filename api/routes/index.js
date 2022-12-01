const express = require('express');
const router = express.Router();

const { authRouter } = require('./authRouter');
const { lectureRouter } = require('./lectureRouter');

router.use('/auth', authRouter);
router.use('/lecture', lectureRouter);

module.exports = { router };
