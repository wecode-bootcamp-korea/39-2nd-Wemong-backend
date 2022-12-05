const express = require('express');

const router = express.Router();

const { authRouter } = require('./authRouter');
const { lectureRouter } = require('./lectureRouter');

router.use('/auth', authRouter);
router.use('/lectures', lectureRouter);

module.exports = { router };
