const axios = require('axios');

class KakaoAPI {
    constructor(clientId) {
        this.clientId = clientId;
    }
    getKakaoData = async (kakaoAccessToken) => {
        return await axios({
            method: 'POST',
            url: 'https://kapi.kakao.com/v2/user/me',
            headers: {
                Authorization: `Bearer ${kakaoAccessToken}`,
                'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
            },
        });
    };

    getAccessToken = async (authorizationCode, redirectUri) => {
        const response = await axios({
            method: 'POST',
            url: 'https://kauth.kakao.com/oauth/token',
            headers: {
                'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
            },
            data: {
                grant_type: 'authorization_code',
                client_id: this.clientId,
                redirect_uri: redirectUri,
                code: authorizationCode,
            },
        });

        return response.data.access_token;
    };
}

module.exports = { KakaoAPI };
