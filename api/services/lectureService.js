const { lectureDao } = require('../models');

const getLectureByLectureId = async (lectureId) => {
    return await lectureDao.getLectureByLectureId(lectureId);
};

const getLectures = async (params) => {
    return lectureDao.getLectures(params);
};

const getLectureTimeOptionsByLectureId = async (lectureId) => {
    return await lectureDao.getLectureTimeOptionsByLectureId(lectureId);
};
module.exports = { getLectures, getLectureByLectureId, getLectureTimeOptionsByLectureId };
