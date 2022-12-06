const { lectureDao } = require('../models');

const getLectureByLectureId = async (lectureId) => {
    return await lectureDao.getLectureByLectureId(lectureId);
};

const getLectures = async (params) => {
    return lectureDao.getLectures(params);
};

module.exports = { getLectureByLectureId, getLectures };