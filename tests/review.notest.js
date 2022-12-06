const request = require('supertest')
const { createApp } = require('../app');
//const { loginRequired } = require('../api/utils/auth');
const { appDataSource } = require('../api/models/data_source');
// jest.mock('../api/utils/auth', () => ({
//     loginRequired: jest.fn(),
// }));

describe('postreview', () => {

    beforeAll(async() => {
        app =createApp();
        await appDataSource.initialize();
        await appDataSource.query(`SET FOREIGN_KEY_CHECKS = 0`);
        await appDataSource.query(`TRUNCATE TABLE lectures`);
        await appDataSource.query(`TRUNCATE TABLE users`);
        await appDataSource.query(`TRUNCATE TABLE reviews`);
        await appDataSource.query(`SET FOREIGN_KEY_CHECKS = 1`);

        await appDataSource.query(
            `INSERT INTO users (name, email, kakao_id, gender_id)
            VALUES ("수정", "suj@gmail.com", 1111, 2),
            ("호준", "hoj@gmail.com", 2222, 1),
            ("수민", "sum@gmail.com", 3333, 1)
            `);

        await appDataSource.query(
            `
            INSERT INTO
            reviews (title, text, rating, user_id, lecture_id
            ) VALUES ("최악", "이것은 악이다",1 ,1, 1),
            ("인성교육좀", "요즘애들은..", 2, 2, 2),
            ("낮잠의 정석", "현대인은 잠이 부족합니다", 5, 3, 3)
            `);
        
        await appDataSource.query(
            `INSERT INTO lectures ( title, content, price, sub_category_id, user_id )
            VALUES ( "강의제목1", "강의내용1", "10000", 1, 3),
            ("강의제목2", "강의내용2", "20000", 2, 2),
            ("강의제목3", "강의내용3", "15000",4, 1)
            `);
    });

    afterAll(async()=>{
        await appDataSource.query(`SET FOREIGN_KEY_CHECKS = 0`);
        await appDataSource.query(`TRUNCATE TABLE lectures`);
        await appDataSource.query(`TRUNCATE TABLE users`);
        await appDataSource.query(`TRUNCATE TABLE reviews`);
        await appDataSource.query(`SET FOREIGN_KEY_CHECKS = 1`);
        await appDataSource.destroy();
    });

    test("SUCEESS: post review", async () => {
        await request(app)
        .post("/lectures").send({"lectureId":1, "rating":1, "reviewTitle":"최악", "reviewText":"이것은 악이다" })
        .expect(200)
    });
});