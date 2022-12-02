const express = require('express');

const { authRouter } = require('./authRouter');
const { lectureRouter } = require('./lectureRouter');

const router = express.Router();

router.use('/auth', authRouter);
router.use('/lectures', lectureRouter);

module.exports = { router };
