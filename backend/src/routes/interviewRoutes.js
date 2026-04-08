import express from "express";
import authUser from "../middlewares/auth.middleware.js";
import generateInterViewReportController from "../controllers/interviewController.js";
import upload from "../middlewares/file.middleware.js";

const interviewRouter = express.Router();

/**
 * @route POST /api/interview
 * @description generate new interview report on the basis of user selfDescription,resume and jobDescription
 * @access private
 */
interviewRouter.post("/",authUser,upload.single("resume"),generateInterViewReportController)


export default interviewRouter;
