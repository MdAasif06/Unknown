import { PDFParse } from "pdf-parse";
import generateInterviewReport from "../services/ai.service.js";
import interviewReportModel from "../models/interviewReportModel.js";

async function generateInterViewReportController(req, res) {
  // console.log("🔥 FILE:", req.file);
  // console.log("🔥 BODY:", req.body);
  const resumeContent = await new PDFParse(
    Uint8Array.from(req.file.buffer),
  ).getText();
  const { selfDescription, jobDescription } = req.body;

  const interViewReportAI = await generateInterviewReport({
    resume: resumeContent.text,
    selfDescription,
    jobDescription,
  });
  // console.log("🔥 AI RESPONSE:", interViewReportAI);

  const interviewReport = await interviewReportModel.create({
    user: req.user.id,
    resume: resumeContent.text,
    selfDescription,
    jobDescription,
    ...interViewReportAI,
  });
  res.status(201).json({
    message: "interview report generated successfully",
    interviewReport,
  });
}

async function getInterviewRportByIdController(req, res) {
  const { interviewId } = req.params;

  const interviewReport = await interviewReportModel.findOne({
    _id: interviewId,
    user: req.user.id,
  });

  if (!interviewReport) {
    return res.status(404).json({
      message: "Interview report not found",
    });
  }
  res.status(200).json({
    message: "Interview report fetched successfully",
    interviewReport,
  });
}

async function getAllInterviewReportController(req, res) {
  const interviewReports = await interviewReportModel
    .find({ user: req.user.id })
    .sort({ createdAt: -1 })
    .select(
      "-resume -selfDescription,-jobDescription -_v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan",
    );
    res.status(200).json({
      message:"Interview reports fetched successfully",
      interviewReports
    })
}

export default {
  getInterviewRportByIdController,
  generateInterViewReportController,
  getAllInterviewReportController
};
