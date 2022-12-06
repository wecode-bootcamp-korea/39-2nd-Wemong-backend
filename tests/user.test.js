const request = require('supertest');

const { createApp } = require('../app');
const { loginRequired } = require('../api/utils/auth');
const { appDataSource } = require('../api/models/data_source');

jest.mock('../api/utils/auth', () => ({
    loginRequired: jest.fn(),
}));
describe('get data for reservation page', () => {
    let app;

    beforeAll(async () => {
        app = createApp();
        await appDataSource.initialize();

        await appDataSource.query(`set FOREIGN_KEY_CHECKS = 0`);
        await appDataSource.query(`TRUNCATE TABLE lectures`);
        await appDataSource.query(`TRUNCATE TABLE lecture_time_options`);
        await appDataSource.query(`TRUNCATE TABLE lecture_images`);
        await appDataSource.query(`TRUNCATE TABLE users`);
        await appDataSource.query(`TRUNCATE TABLE reservations`);
        await appDataSource.query(`set FOREIGN_KEY_CHECKS = 1`);

        await appDataSource.query(
            `INSERT INTO 
                users (name, email, kakao_id, gender_id)
            VALUES 
            ('김순자','soonja@gmail.com',111111,2),
            ('김철수','chul@gmail.com',222222,1),
            ('김강사','gangsa@gmail.com',333333,2),
            ('박복자','bokja@gmail.com',444444,2)
            `
        );
        await appDataSource.query(
            `INSERT INTO 
                lectures (title, content, price, sub_category_id,user_id)
            VALUES 
            ('재밌는 강의','만원 넘어요',10000,2,3),
            ('잼없는강의','요로로',30000,3,2),
            ('프로그래밍강의','코딩재미써',50000,9,2),
            ('복자의 수학교실','수학짱', 1000,6,4)
            `
        );
        await appDataSource.query(
            `INSERT INTO 
                lecture_images (image_url, lecture_id)
            VALUES 
            ('재밌는강의url1',1),
            ('재밌는강의url2',1),
            ('잼없는강의url1',2),
            ('프로그래밍강의url1',3),
            ('복자url1',4)
            `
        );
        await appDataSource.query(
            `INSERT INTO 
                lecture_time_options(lecture_id,lecture_time)
            VALUES 
            (1,221210),
            (1,221211),
            (1,221214),
            (1,221217),
            (2,221211),
            (2,221220),
            (3,221211),
            (3,221220),
            (3,221221),
            (4,221210)
            `
        );
        await appDataSource.query(
            `INSERT INTO 
                reservations(lecture_time_option_id,user_id,reservation_status_id)
            VALUES
            (4,1,1),
            (5,1,1),
            (1,2,1)
            `
        );
    });

    afterAll(async () => {
        await appDataSource.query(`set FOREIGN_KEY_CHECKS = 0`);
        await appDataSource.query(`TRUNCATE TABLE lectures`);
        await appDataSource.query(`TRUNCATE TABLE lecture_time_options`);
        await appDataSource.query(`TRUNCATE TABLE lecture_images`);
        await appDataSource.query(`TRUNCATE TABLE users`);
        await appDataSource.query(`TRUNCATE TABLE reservations`);
        await appDataSource.query(`set FOREIGN_KEY_CHECKS = 1`);
        await appDataSource.destroy();
    });

    test('SUCCESS: mypage for soonja', async () => {
        loginRequired.mockImplementation((req, res, next) => {
            req.user = 1;
            next();
        });
        await request(app)
            .get('/users')
            .expect(200, {
                userName: '김순자',
                email: 'soonja@gmail.com',
                reservations: [
                    {
                        price: 10000,
                        lectureId: 1,
                        lectureTime: '221217',
                        lectureTitle: '재밌는 강의',
                        lectureTimeOptionId: 4,
                    },
                    {
                        price: 30000,
                        lectureId: 2,
                        lectureTime: '221211',
                        lectureTitle: '잼없는강의',
                        lectureTimeOptionId: 5,
                    },
                ],
            });
    });

    test('SUCCESS: mypage for chulsoo', async () => {
        loginRequired.mockImplementation((req, res, next) => {
            req.user = 2;
            next();
        });
        await request(app)
            .get('/users')
            .expect(200, {
                userName: '김철수',
                email: 'chul@gmail.com',
                reservations: [
                    {
                        price: 10000,
                        lectureId: 1,
                        lectureTime: '221210',
                        lectureTitle: '재밌는 강의',
                        lectureTimeOptionId: 1,
                    },
                ],
            });
    });

    test('SUCCESS: mypage for bokja', async () => {
        loginRequired.mockImplementation((req, res, next) => {
            req.user = 4;
            next();
        });
        await request(app).get('/users').expect(200, {
            userName: '박복자',
            email: 'bokja@gmail.com',
            reservations: null,
        });
    });
});
