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

module.exports = { getUserByKakaoId, createUser };
