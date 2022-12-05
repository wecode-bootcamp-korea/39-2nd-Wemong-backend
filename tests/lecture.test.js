const request = require('supertest');

const { createApp } = require('../app');
const { appDataSource } = require('../api/models/data_source');

describe('get lectures', () => {
    let app;

    beforeAll(async () => {
        app = createApp();
        await appDataSource.initialize();

        await appDataSource.query(`set FOREIGN_KEY_CHECKS = 0`);
        await appDataSource.query(`TRUNCATE TABLE lectures`);
        await appDataSource.query(`TRUNCATE TABLE lecture_time_options`);
        await appDataSource.query(`TRUNCATE TABLE lecture_images`);
        await appDataSource.query(`TRUNCATE TABLE users`);
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
    });

    afterAll(async () => {
        await appDataSource.query(`set FOREIGN_KEY_CHECKS = 0`);
        await appDataSource.query(`TRUNCATE TABLE lectures`);
        await appDataSource.query(`TRUNCATE TABLE lecture_time_options`);
        await appDataSource.query(`TRUNCATE TABLE lecture_images`);
        await appDataSource.query(`TRUNCATE TABLE users`);
        await appDataSource.query(`set FOREIGN_KEY_CHECKS = 1`);
        await appDataSource.destroy();
    });

    test('SUCCESS: get lectures(no option)', async () => {
        await request(app)
            .get('/lectures')
            .expect(200, {
                lectures: [
                    {
                        lectureId: 3,
                        lectureTitle: '프로그래밍강의',
                        lecturerName: '김철수',
                        categoryId: 3,
                        subCategoryId: 9,
                        price: '50000',
                        images: ['프로그래밍강의url1'],
                    },
                    {
                        lectureId: 2,
                        lectureTitle: '잼없는강의',
                        lecturerName: '김철수',
                        categoryId: 1,
                        subCategoryId: 3,
                        price: '30000',
                        images: ['잼없는강의url1'],
                    },
                    {
                        lectureId: 1,
                        lectureTitle: '재밌는 강의',
                        lecturerName: '김강사',
                        categoryId: 1,
                        subCategoryId: 2,
                        price: '10000',
                        images: ['재밌는강의url1', '재밌는강의url2'],
                    },
                    {
                        lectureId: 4,
                        lectureTitle: '복자의 수학교실',
                        lecturerName: '박복자',
                        categoryId: 2,
                        subCategoryId: 6,
                        price: '1000',
                        images: ['복자url1'],
                    },
                ],
            });
    });

    test('SUCCESS: get lectures(limit:1)', async () => {
        await request(app)
            .get('/lectures')
            .query({
                limit: 1,
            })
            .expect(200, {
                lectures: [
                    {
                        lectureId: 3,
                        lectureTitle: '프로그래밍강의',
                        lecturerName: '김철수',
                        categoryId: 3,
                        subCategoryId: 9,
                        price: '50000',
                        images: ['프로그래밍강의url1'],
                    },
                ],
            });
    });

    test('SUCCESS: get lectures(limit:1, offset:1)', async () => {
        await request(app)
            .get('/lectures')
            .query({
                limit: 1,
                offset: 1,
            })
            .expect(200, {
                lectures: [
                    {
                        lectureId: 2,
                        lectureTitle: '잼없는강의',
                        lecturerName: '김철수',
                        categoryId: 1,
                        subCategoryId: 3,
                        price: '30000',
                        images: ['잼없는강의url1'],
                    },
                ],
            });
    });

    test('SUCCESS: get lectures(minPrice : 20000)', async () => {
        await request(app)
            .get('/lectures')
            .query({
                minPrice: 20000,
            })
            .expect(200, {
                lectures: [
                    {
                        lectureId: 3,
                        lectureTitle: '프로그래밍강의',
                        lecturerName: '김철수',
                        categoryId: 3,
                        subCategoryId: 9,
                        price: '50000',
                        images: ['프로그래밍강의url1'],
                    },
                    {
                        lectureId: 2,
                        lectureTitle: '잼없는강의',
                        lecturerName: '김철수',
                        categoryId: 1,
                        subCategoryId: 3,
                        price: '30000',
                        images: ['잼없는강의url1'],
                    },
                ],
            });
    });
    test('SUCCESS: get lectures(maxPrice : 20000)', async () => {
        await request(app)
            .get('/lectures')
            .query({
                maxPrice: 20000,
            })
            .expect(200, {
                lectures: [
                    {
                        lectureId: 1,
                        lectureTitle: '재밌는 강의',
                        lecturerName: '김강사',
                        categoryId: 1,
                        subCategoryId: 2,
                        price: '10000',
                        images: ['재밌는강의url1', '재밌는강의url2'],
                    },
                    {
                        lectureId: 4,
                        lectureTitle: '복자의 수학교실',
                        lecturerName: '박복자',
                        categoryId: 2,
                        subCategoryId: 6,
                        price: '1000',
                        images: ['복자url1'],
                    },
                ],
            });
    });
    test('SUCCESS: get lectures(minPrice: 20000 maxPrice : 40000)', async () => {
        await request(app)
            .get('/lectures')
            .query({
                minPrice: 20000,
                maxPrice: 40000,
            })
            .expect(200, {
                lectures: [
                    {
                        lectureId: 2,
                        lectureTitle: '잼없는강의',
                        lecturerName: '김철수',
                        categoryId: 1,
                        subCategoryId: 3,
                        price: '30000',
                        images: ['잼없는강의url1'],
                    },
                ],
            });
    });
    test('SUCCESS: get lectures(minPrice: 20000 maxPrice : 40000 subCategory : 3)', async () => {
        await request(app)
            .get('/lectures')
            .query({
                minPrice: 20000,
                maxPrice: 40000,
                subCategory: 3,
            })
            .expect(200, {
                lectures: [
                    {
                        lectureId: 2,
                        lectureTitle: '잼없는강의',
                        lecturerName: '김철수',
                        categoryId: 1,
                        subCategoryId: 3,
                        price: '30000',
                        images: ['잼없는강의url1'],
                    },
                ],
            });
    });
    test('SUCCESS: get lectures(minPrice: 20000 maxPrice : 40000 subCategory : 1)', async () => {
        await request(app)
            .get('/lectures')
            .query({
                minPrice: 20000,
                maxPrice: 40000,
                subCategory: 1,
            })
            .expect(200, {
                lectures: [],
            });
    });
    test('SUCCESS: get lectures(minPrice: 20000 maxPrice : 40000 category : 1)', async () => {
        await request(app)
            .get('/lectures')
            .query({
                minPrice: 20000,
                maxPrice: 40000,
                category: 1,
            })
            .expect(200, {
                lectures: [
                    {
                        lectureId: 2,
                        lectureTitle: '잼없는강의',
                        lecturerName: '김철수',
                        categoryId: 1,
                        subCategoryId: 3,
                        price: '30000',
                        images: ['잼없는강의url1'],
                    },
                ],
            });
    });

    test('SUCCESS: get lectures(category : 1)', async () => {
        await request(app)
            .get('/lectures')
            .query({
                category: 1,
            })
            .expect(200, {
                lectures: [
                    {
                        lectureId: 2,
                        lectureTitle: '잼없는강의',
                        lecturerName: '김철수',
                        categoryId: 1,
                        subCategoryId: 3,
                        price: '30000',
                        images: ['잼없는강의url1'],
                    },
                    {
                        lectureId: 1,
                        lectureTitle: '재밌는 강의',
                        lecturerName: '김강사',
                        categoryId: 1,
                        subCategoryId: 2,
                        price: '10000',
                        images: ['재밌는강의url1', '재밌는강의url2'],
                    },
                ],
            });
    });

    test('SUCCESS: get lectures(date : 221210)', async () => {
        await request(app)
            .get('/lectures')
            .query({
                date: 221210,
            })
            .expect(200, {
                lectures: [
                    {
                        lectureId: 1,
                        lectureTitle: '재밌는 강의',
                        lecturerName: '김강사',
                        categoryId: 1,
                        subCategoryId: 2,
                        price: '10000',
                        images: ['재밌는강의url1', '재밌는강의url2'],
                    },
                    {
                        lectureId: 4,
                        lectureTitle: '복자의 수학교실',
                        lecturerName: '박복자',
                        categoryId: 2,
                        subCategoryId: 6,
                        price: '1000',
                        images: ['복자url1'],
                    },
                ],
            });
    });

    test('SUCCESS: get lectures(minPrice:5000 date : 221210)', async () => {
        await request(app)
            .get('/lectures')
            .query({
                minPrice: 5000,
                date: 221210,
            })
            .expect(200, {
                lectures: [
                    {
                        lectureId: 1,
                        lectureTitle: '재밌는 강의',
                        lecturerName: '김강사',
                        categoryId: 1,
                        subCategoryId: 2,
                        price: '10000',
                        images: ['재밌는강의url1', '재밌는강의url2'],
                    },
                ],
            });
    });

    test('SUCCESS: get lectures(date : 221230)', async () => {
        await request(app)
            .get('/lectures')
            .query({
                date: 221230,
            })
            .expect(200, {
                lectures: [],
            });
    });

    test('SUCCESS: get lectures(minPrice:5000 categoryId: 1 date : 221210)', async () => {
        await request(app)
            .get('/lectures')
            .query({
                minPrice: 5000,
                categoryId: 1,
                date: 221210,
            })
            .expect(200, {
                lectures: [
                    {
                        lectureId: 1,
                        lectureTitle: '재밌는 강의',
                        lecturerName: '김강사',
                        categoryId: 1,
                        subCategoryId: 2,
                        price: '10000',
                        images: ['재밌는강의url1', '재밌는강의url2'],
                    },
                ],
            });
    });

    test('SUCCESS: get lectures(maxPrice:20000 date : 221211)', async () => {
        await request(app)
            .get('/lectures')
            .query({
                minPrice: 20000,
                date: 221211,
            })
            .expect(200, {
                lectures: [
                    {
                        lectureId: 3,
                        lectureTitle: '프로그래밍강의',
                        lecturerName: '김철수',
                        categoryId: 3,
                        subCategoryId: 9,
                        price: '50000',
                        images: ['프로그래밍강의url1'],
                    },
                    {
                        lectureId: 2,
                        lectureTitle: '잼없는강의',
                        lecturerName: '김철수',
                        categoryId: 1,
                        subCategoryId: 3,
                        price: '30000',
                        images: ['잼없는강의url1'],
                    },
                ],
            });
    });
});
