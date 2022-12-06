const express = require("express");

const calanderRouter = express.Router();

const {calanderController} = require('../controllers');

calanderRouter.get("/:lectureId", calanderController.getLectureTimeByLectureId);

module.exports = { calanderRouter };