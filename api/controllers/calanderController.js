const { calanderService } =require('../services');
const { catchAsync, CustomError } = require('../utils/error');

const getLectureTimeByLectureId = catchAsync(async(req, res) => {
    const lectureId = req.params.lectureId;
    if(!lectureId) throw new CustomError('BAD REQUEST', 400)
    const lectureTimeOption = await calanderService.getLectureTimeByLectureId(lectureId);
    return res.status(200).json({ data: lectureTimeOption });
});

module.exports = { getLectureTimeByLectureId }