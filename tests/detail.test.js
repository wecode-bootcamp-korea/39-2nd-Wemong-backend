const request = require("supertest");
const {createApp} = require('../app');
const {appDataSource} = require("../api/models/data_source")

describe("getLectureByLectureId", () =>{
    let app;
})

beforeAll(async() => {
    app =createApp();
    await appDataSource.initialize();
});

afterAll(async() => {
    await appDataSource.query(`SET FOREIGN_KEY_CHECKS = 0`);
    await appDataSource.query(`TRUNCATE lectures`);
    await appDataSource.query(`SET FOREIGN_KEY_CHECKS = 1`);
    await appDataSource.destroy();
});

test("SUCEESS: get lectureId", async () => {
    await request(app)
    .get("/lecture/1")
    .expect(200)
    .expect({
        "data": [{
            "id": 1,
            "lectureTitle": "Velvet Vampire, The",
            "lectureText": "4",
            "price": "40000",
            "images": "aimage",
            "lecturerName": "yaho",
            "subCategory": "english"
        }] })
    });
