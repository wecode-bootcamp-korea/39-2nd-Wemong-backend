const { lectureDao } = require("../models");

const getLectureByLectureId = async (lectureId) => {
    return await lectureDao.getLectureByLectureId(lectureId);
};

module.exports = { getLectureByLectureId };