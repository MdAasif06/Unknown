import express from "express";
import authUser from "../middlewares/auth.middleware.js";
import interviewController  from "../controllers/interviewController.js";
import upload from "../middlewares/file.middleware.js";

const interviewRouter = express.Router();

/**
 * @route POST /api/interview
 * @description generate new interview report on the basis of user selfDescription,resume and jobDescription
 * @access private
 */
interviewRouter.post(
  "/",
  authUser,
  upload.single("resume"),
  interviewController.generateInterViewReportController,
);
/**
 * @route GET /api/interview/report/:interviewId
 * @description generate new interview report by interviewId
 * @access private
 */
interviewRouter.get(
  "/report/:interviewId",
  authUser,
  interviewController.getInterviewRportByIdController,
);
/**
 * @route GET /api/interview
 * @description get all interview reports of logged in user
 * @access private
 */
interviewRouter.get("/", authUser, interviewController.getAllInterviewReportController);

export default interviewRouter;
