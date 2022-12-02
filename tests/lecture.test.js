const request = require('supertest');

const { createApp } = require('../app');
const { appDataSource } = require('../api/models/data_source');

describe('get data for reservation page', () => {
    let app;

    beforeAll(async () => {
        app = createApp();
        await appDataSource.initialize();
    });

    afterAll(async () => {
        await appDataSource.query(`DELETE FROM users;`);
        await appDataSource.destroy();
    });

    beforeEach(async () => {
        await appDataSource.query(`set FOREIGN_KEY_CHECKS = 0`);
        await appDataSource.query(`TRUNCATE TABLE lectures`);
        await appDataSource.query(`TRUNCATE TABLE lecture_time_options`);
        await appDataSource.query(`TRUNCATE TABLE lecture_images`);
        await appDataSource.query(`TRUNCATE TABLE users`);
        await appDataSource.query(`set FOREIGN_KEY_CHECKS = 1`);
    });

    test('SUCCESS: get lecture time options', async () => {
        await appDataSource.query(
            `INSERT INTO 
                users (name, email, kakao_id, gender_id)
            VALUES 
            ('김순자','soonja@gmail.com',111111,2),
            ('김철수','chul@gmail.com',222222,1),
            ('김강사','gangsa@gmail.com',333333,2)
            `
        );
        await appDataSource.query(
            `INSERT INTO 
                lectures (title, content, price, sub_category_id,user_id)
            VALUES 
            ('재밌는 강의','웃긴 내용',20000,2,3),
            ('이거','나오지 마라',30000,3,2)
            `
        );
        await appDataSource.query(
            `INSERT INTO 
                lecture_images (image_url, lecture_id)
            VALUES 
            ('나오는url1',1),
            ('나오는url2',1),
            ('안나오는url2',2)
            `
        );
        await appDataSource.query(
            `INSERT INTO 
                lecture_time_options(lecture_id,lecture_time)
            VALUES 
            (1,221210),
            (1,221211),
            (1,221214),
            (2,221220),
            (1,221217),
            (2,221211)
            `
        );
        await request(app)
            .get('/lectures/1/reservations')
            .expect(200)
            .expect({
                lectuerId: 1,
                lectureTitle: '재밌는 강의',
                lecturerName: '김강사',
                price: '20000.00',
                images: ['나오는url1', '나오는url2'],
                timeOptions: [
                    { isReserved: 0, lectureTime: '221210', lectureTimeId: 1 },
                    { isReserved: 0, lectureTime: '221211', lectureTimeId: 2 },
                    { isReserved: 0, lectureTime: '221214', lectureTimeId: 3 },
                    { isReserved: 0, lectureTime: '221217', lectureTimeId: 5 },
                ],
            });
    });
});
