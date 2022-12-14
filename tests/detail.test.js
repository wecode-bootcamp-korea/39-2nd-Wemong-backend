const request = require('supertest');
const { createApp } = require('../app');
const { appDataSource } = require('../api/models/data_source');

describe('getLectureByLectureId', () => {
    let app;

    beforeAll(async () => {
        app = createApp();
        await appDataSource.initialize();
        await appDataSource.query(`SET FOREIGN_KEY_CHECKS = 0`);
        await appDataSource.query(`TRUNCATE TABLE lectures`);
        await appDataSource.query(`TRUNCATE TABLE lecture_images`);
        await appDataSource.query(`TRUNCATE TABLE users`);
        await appDataSource.query(`SET FOREIGN_KEY_CHECKS = 1`);

        await appDataSource.query(
            `INSERT INTO users (name, email, kakao_id, gender_id)
        VALUES ("커피", "coffee@gmail.com", 11, 1),
        ("캔디", "candy@gmail.com", 22, 2),
        ("초코", "choko@gmail.com", 33, 1)
        `
        );

        await appDataSource.query(
            `INSERT INTO lectures ( title, content, price, sub_category_id, user_id )
        VALUES ( "강의제목1", "강의내용1", "10000", 1, 3),
        ("강의제목2", "강의내용2", "20000", 2, 2),
        ("강의제목3", "강의내용3", "15000",4, 1)
        `
        );

        await appDataSource.query(
            `INSERT INTO lecture_images( image_url, lecture_id)
        VALUES ("aimage", 1),
        ("bimage", 2),
        ("cimage", 3)
        `
        );
    });

    afterAll(async () => {
        await appDataSource.query(`SET FOREIGN_KEY_CHECKS = 0`);
        await appDataSource.query(`TRUNCATE TABLE lectures`);
        await appDataSource.query(`TRUNCATE TABLE lecture_images`);
        await appDataSource.query(`TRUNCATE TABLE users`);
        await appDataSource.query(`SET FOREIGN_KEY_CHECKS = 1`);
        await appDataSource.destroy();
    });

    test('SUCEESS: get lectureId', async () => {
        await request(app)
            .get('/lectures/1')
            .expect(200)
            .expect({
                data: [
                    {
                        id: 1,
                        lectureTitle: '강의제목1',
                        lectureText: '강의내용1',
                        price: '10000',
                        images: 'aimage',
                        lecturerName: '커피',
                        subCategory: 'koreanFood',
                        reviews: null,
                        rating: null
                    },
                ],
            });
    });

    test('SUCEESS: get lectureId', async () => {
        await request(app)
            .get('/lectures/2')
            .expect(200)
            .expect({
                data: [
                    {
                        id: 2,
                        lectureTitle: '강의제목2',
                        lectureText: '강의내용2',
                        price: '20000',
                        images: 'bimage',
                        lecturerName: '캔디',
                        subCategory: 'chineseFood',
                        reviews: null,
                        rating: null
                    },
                ],
            });
    });
});
