const { appDataSource } = require('./data_source');

const getUserByKakaoId = async (kakaoId) => {
    const user = await appDataSource.query(
        `
		SELECT 
            id
		FROM users
		WHERE kakao_id = ?
        `,
        [kakaoId]
    );
    return user[0];
};

const createUser = async (name, email, genderId, kakaoId) => {
    return await appDataSource.query(
        `INSERT INTO users(
            name,
            email,
            gender_id,
            kakao_id
        ) VALUES(?,?,?,?);
        `,
        [name, email, genderId, kakaoId]
    );
};

const getUserByUserId = async (userId) => {
    const user = await appDataSource.query(
        `
		SELECT 
            id
		FROM users
		WHERE id = ?
        `,
        [userId]
    );
    return user[0];
};
const getUserInformation = async (userId) => {
    const userData = await appDataSource.query(
        `SELECT
        u.name userName,
        u.email email,
        (SELECT
                JSON_ARRAYAGG(
                    JSON_OBJECT(
                        "lectureTitle",l.title,
                        "lectureTime",DATE_FORMAT(lto.lecture_time, '%y%m%d'),
                        "price", l.price,
                        "lectureId", l.id,
                        "lectureTimeOptionId", lto.id
                    )
                ) reservations
        FROM reservations r
        JOIN lecture_time_options lto ON r.lecture_time_option_id = lto.id
        JOIN lectures l ON l.id = lto.lecture_id
        WHERE r.user_id = ?
        GROUP BY r.user_id
        ) reservations
        FROM users u
        WHERE u.id = ?
        `,
        [userId, userId]
    );
    return userData[0];
};
module.exports = { getUserByKakaoId, createUser, getUserInformation, getUserByUserId };
