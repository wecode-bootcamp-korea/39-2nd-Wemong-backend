const { calanderDao } = require('../models');

const getLectureTimeByLectureId = async(lectureId) => {
    return await calanderDao.getLectureTimeByLectureId(lectureId)
};

module.exports = { getLectureTimeByLectureId }