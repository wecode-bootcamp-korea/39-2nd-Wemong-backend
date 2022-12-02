const express = require('express');
const { lectureController } = require('../controllers');

const lectureRouter = express.Router();

lectureRouter.get('/:lectureId/reservations', lectureController.getLectureTimeOptionsByLectureId);

module.exports = { lectureRouter };
