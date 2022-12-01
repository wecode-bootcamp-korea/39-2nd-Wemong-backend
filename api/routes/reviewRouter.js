const express = require('express');

const { reviewController } = require('../controllers');
const { loginRequired } = require('../utils/auth');

const reviewRouter = express.Router();

reviewRouter.get('', reviewController.getReview);
reviewRouter.post('',loginRequired, reviewController.postReview);

module.exports = { reviewRouter };