const express =require("express");

const lectureRouter = express.Router();

const {lectureController} = require("../controllers");

lectureRouter.get("/:lectureId", lectureController.getLectureByLectureId);

module.exports = { lectureRouter };