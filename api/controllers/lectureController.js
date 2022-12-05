const { lectureService } = require('../services');
const { catchAsync, CustomError } = require('../utils/error');

const getLectureByLectureId = catchAsync(async (req, res) => {
    const lectureId = req.params.lectureId;
    if (!lectureId) throw new CustomError('BAD REQUEST', 400);
    const detail = await lectureService.getLectureByLectureId(lectureId);
    return res.status(200).json({ data: detail });
});

const getLectures = catchAsync(async (req, res) => {
    const lectures = await lectureService.getLectures(req.query);

    return res.status(200).json({ lectures: lectures });
});

module.exports = { getLectures, getLectureByLectureId };
