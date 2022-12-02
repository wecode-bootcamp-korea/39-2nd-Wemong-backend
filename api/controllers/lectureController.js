const { lectureService } = require('../services');

const { catchAsync, CustomError } = require('../utils/error');

const getLectureTimeOptionsByLectureId = catchAsync(async (req, res) => {
    const { lectureId } = req.params;

    const lectureOptions = await lectureService.getLectureTimeOptionsByLectureId(lectureId);
    return res.status(200).json(lectureOptions);
});

module.exports = { getLectureTimeOptionsByLectureId };
