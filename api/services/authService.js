const jwt = require('jsonwebtoken');

const { KakaoAPI } = require('../utils/kakaoAPI');
const { userDao } = require('../models');
const { CustomError } = require('../utils/error');
const { Gender } = require('../utils/enum');

const kakaoLogin = async (authorizationCode) => {
    const kakaoAPI = new KakaoAPI(process.env.KAKAO_REST_CLIENT_ID);

    const kakaoAccessToken = await kakaoAPI
        .getAccessToken(authorizationCode, process.env.KAKAO_REDIRECT_URI)
        .catch(() => {
            throw new CustomError('KAKAO_SERVER_ERROR', 401);
        });
    if (!kakaoAccessToken) throw new CustomError('NO_TOKEN', 401);

    const kakaoInfo = await kakaoAPI.getKakaoData(kakaoAccessToken).catch(() => {
        throw new CustomError('KAKAO_TOKEN_ERROR', 401);
    });

    const { nickname: name } = kakaoInfo?.data?.properties || {};
    const { id: kakaoId } = kakaoInfo?.data || {};
    const { email, gender } = kakaoInfo?.data?.kakao_account || {};

    if (!name || !kakaoId || !email || !gender) throw new CustomError('TOKEN_SCOPE_ERROR', 409);

    const user = await getUserByKakaoId(kakaoId);
    if (!user) await userDao.createUser(name, email, Gender[gender], kakaoId);

    return await generateToken(await getUserByKakaoId(kakaoId));
};

const getUserByKakaoId = async (kakaoId) => {
    return await userDao.getUserByKakaoId(kakaoId);
};

const generateToken = async (user) => {
    const { id: userId } = user;
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '2d' });
};
module.exports = { kakaoLogin };
