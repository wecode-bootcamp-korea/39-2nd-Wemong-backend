const request = require("supertest");
const {createApp} = require('../app');
const {appDataSource} = require('../api/models/data_source');

describe("getLectureTimeByLectureId", () => {
    let app;

    beforeAll(async() => {
        app = createApp();
        await appDataSource.initialize();
    });

    afterAll(async() => {
        await appDataSource.query(`TRUNCATE TABLE lecture_time_options`);
        await appDataSource.destroy();
    });

    
})