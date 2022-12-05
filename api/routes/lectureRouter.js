const express = require('express');

const { lectureController } = require('../controllers');

const lectureRouter = express.Router();

lectureRouter.get('/:lectureId', lectureController.getLectureByLectureId);
lectureRouter.get('', lectureController.getLectures);

module.exports = { lectureRouter };
