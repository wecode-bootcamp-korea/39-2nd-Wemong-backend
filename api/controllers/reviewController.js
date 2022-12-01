const { reviewService } = require('../services');
const { catchAsync, CustomError } = require('../utils/error');

const getReview = catchAsync ( async (req, res) => {
    const {reviewId} = req.query
    const reviews = await reviewService.getReview(reviewId);
    if(!reviewId) throw new CustomError ('BAD REQUEST', 400)
    return res.status(200).json({ data : reviews })
});


const postReview = catchAsync (async (req, res) => {
    const userId = req.user;
    const {lectureId, reviewTitle, reviewText, rating} = req.body;
    if(!userId || !lectureId || !reviewTitle || !reviewText || !rating) 
    throw new CustomError('BAD REQUEST', 400)
    await reviewService.postReview( userId, lectureId, reviewTitle, reviewText, rating);
    res.status(201).json({ message : 'SUCCESS' });
});



module.exports = { getReview, postReview };