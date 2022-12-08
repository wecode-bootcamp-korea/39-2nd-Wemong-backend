const { lectureService } = require('../services');
const { catchAsync, CustomError } = require('../utils/error');

const getLectureByLectureId = catchAsync ( async (req, res) => {
    const lectureId = req.params.lectureId;
    if (!lectureId) throw new CustomError('BAD REQUEST', 400);
    const detail = await lectureService.getLectureByLectureId(lectureId);
    return res.status(200).json({ data: detail });
});

const getLectures = catchAsync(async (req, res) => {
    const lectures = await lectureService.getLectures(req.query);

    return res.status(200).json({ lectures: lectures });
});

<<<<<<< HEAD
module.exports = { getLectureByLectureId, getLectures };
=======
const getLectureTimeOptionsByLectureId = catchAsync(async (req, res) => {
    const { lectureId } = req.params;

    const lectureOptions = await lectureService.getLectureTimeOptionsByLectureId(lectureId);
    return res.status(200).json(lectureOptions);
});

module.exports = { getLectures, getLectureByLectureId, getLectureTimeOptionsByLectureId };
>>>>>>> f56f560 (야옹)
