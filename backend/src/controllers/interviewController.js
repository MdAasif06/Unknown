import { PDFParse } from "pdf-parse";
import generateInterviewReport from "../services/ai.service.js";
import interviewReportModel from "../models/interviewReportModel.js";

function buildFallbackPreparationPlan(days = 7, skillGaps = []) {
  const minDays = Math.max(7, Number(days) || 7);
  const primaryGap = skillGaps?.[0]?.skill || "core interview topics";
  const secondaryGap = skillGaps?.[1]?.skill || "communication and storytelling";

  return Array.from({ length: minDays }, (_, index) => {
    const day = index + 1;
    return {
      day,
      focus: `Day ${day}: ${day % 2 === 0 ? secondaryGap : primaryGap}`,
      tasks: [
        `Revise ${day % 2 === 0 ? secondaryGap : primaryGap} concepts for 60 minutes`,
        "Practice 5 technical and 3 behavioral questions",
        "Run one mock interview and note improvement areas",
      ],
    };
  });
}

async function generateInterViewReportController(req, res) {
  // console.log("🔥 FILE:", req.file);
  // console.log("🔥 BODY:", req.body);
  const resumeContent = await new PDFParse(
    Uint8Array.from(req.file.buffer),
  ).getText();
  const { selfDescription, jobDescription, preparationDays } = req.body;

  const interViewReportAI = await generateInterviewReport({
    resume: resumeContent.text,
    selfDescription,
    jobDescription,
    preparationDays,
  });

  const normalizedPreparationPlan =
    interViewReportAI?.preparationPlan?.length > 0
      ? interViewReportAI.preparationPlan
      : buildFallbackPreparationPlan(preparationDays, interViewReportAI?.skillGaps);
  // console.log("🔥 AI RESPONSE:", interViewReportAI);

  const interviewReport = await interviewReportModel.create({
    user: req.user.id,
    resume: resumeContent.text,
    selfDescription,
    jobDescription,
    ...interViewReportAI,
    preparationPlan: normalizedPreparationPlan,
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

  if (!Array.isArray(interviewReport.preparationPlan) || interviewReport.preparationPlan.length === 0) {
    interviewReport.preparationPlan = buildFallbackPreparationPlan(7, interviewReport.skillGaps);
    await interviewReport.save();
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
      "-resume -selfDescription,-jobDescription -_v -technicalQuestions -behavioralQuestions -skillGaps",
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
