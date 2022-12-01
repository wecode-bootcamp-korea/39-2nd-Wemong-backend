const { appDataSource } = require('./data_source');

const getReview = async(lectureId) => {
    const reviews = await appDataSource.query(
        `
        SELECT
        *
        FROM reviews
        WHERE lecture_id = ?
        `,[lectureId]
    );
    return reviews
};

const postReview =async(userId, lectureId, reviewTitle, reviewText, rating) =>{
    console.log(lectureId)
    await appDataSource.query(
        `
        INSERT INTO reviews
        (
            user_id,
            lecture_id,
            title,
            text,
            rating
        ) VALUES (?, ?, ?, ?, ?);
        `,
        [userId, lectureId, reviewTitle, reviewText, rating]
    );
};

module.exports ={ getReview, postReview };