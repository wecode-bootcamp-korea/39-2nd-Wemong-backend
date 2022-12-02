const { lectureDao } = require('../models');

const getLectureTimeOptionsByLectureId = async (lectureId) => {
    return await lectureDao.getLectureTimeOptionsByLectureId(lectureId);
};

module.exports = { getLectureTimeOptionsByLectureId };
