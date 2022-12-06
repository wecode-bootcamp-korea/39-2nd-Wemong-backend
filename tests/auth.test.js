const request = require('supertest');

const { KakaoAPI } = require('../api/utils/kakaoAPI');

const { createApp } = require('../app');
const { appDataSource } = require('../api/models/data_source');

jest.mock('../api/utils/kakaoAPI');
const getAccessToken = jest.fn();
const getKakaoData = jest.fn();
KakaoAPI.prototype.getAccessToken = getAccessToken;
KakaoAPI.prototype.getKakaoData = getKakaoData;

describe('logIn', () => {
    let app;

    beforeAll(async () => {
        app = createApp();
        await appDataSource.initialize();
    });

    afterAll(async () => {
        await appDataSource.query(`set FOREIGN_KEY_CHECKS = 0`);
        await appDataSource.query(`TRUNCATE TABLE users`);
        await appDataSource.query(`set FOREIGN_KEY_CHECKS = 1`);

        await appDataSource.destroy();
    });

    test('SUCCESS!!!!!!!!', async () => {
        getAccessToken.mockReturnValue(Promise.resolve('yolo'));

        getKakaoData.mockReturnValue(
            Promise.resolve({
                data: {
                    id: 1234,
                    properties: { nickname: 'yaho' },
                    kakao_account: {
                        email: 'wow@WOW.com',
                        gender: 'male',
                    },
                },
            })
        );
        await request(app).post('/auth/login').send({ authorization_code: 'code' }).expect(200);
    });

    test('ERROR: no authorization_code', async () => {
        await request(app).post('/auth/login').send({ yolo: 'code' }).expect(400), 'BAD_REQUEST';
    });
});
