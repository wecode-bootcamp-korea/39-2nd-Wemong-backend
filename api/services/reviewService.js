const { reviewDao } = require('../models');

const getReview = async(lectureId) => {
    return await reviewDao.getReview(lectureId);
};

const postReview = async(userId, lectureId, reviewTitle, reviewText, rating) => {
    return await reviewDao.postReview(userId, lectureId, reviewTitle, reviewText, rating);
};

module.exports = { getReview, postReview };