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

export default generateInterViewReportController;
